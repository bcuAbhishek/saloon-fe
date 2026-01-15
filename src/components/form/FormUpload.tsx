import { RotateCcw, Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  DropZoneArea,
  Dropzone,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  DropzoneTrigger,
  InfiniteProgress,
  useDropzone,
} from "@/components/ui/dropzone";
import { cn } from "@/lib/utils";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";

interface FormUploadProps extends FormControlProps {
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number; // max number of files (1 for single, >1 for multiple)
  preview?: boolean;
  variant?: "normal" | "avatar" | "multi";
  initialPreviewUrl?: string;
}

export function FormUpload({
  accept = "image/*",
  maxSize = 10 * 1024 * 1024, // 10MB default for images
  maxFiles = 1,
  preview = true,
  variant = "normal",
  initialPreviewUrl,
  ...props
}: FormUploadProps) {
  const field = useFieldContext<File | File[] | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [previewUrl, setPreviewUrl] = useState<string>(initialPreviewUrl || "");

  const dropzone = useDropzone<string, string>({
    onDropFile: async (file) => {
      // Create preview URL
      const url = URL.createObjectURL(file);

      if (maxFiles === 1) {
        // Single file mode
        setPreviewUrl(url);
        field.handleChange(file);
      } else {
        // Multiple files mode
        const currentFiles = Array.isArray(field.state.value)
          ? field.state.value
          : [];
        field.handleChange([...currentFiles, file]);
      }

      return {
        status: "success",
        result: url,
      };
    },
    onRemoveFile: async (fileId) => {
      if (maxFiles === 1) {
        // Single file mode
        setPreviewUrl("");
        field.handleChange(undefined);
      } else {
        // Multiple files mode
        const currentFiles = Array.isArray(field.state.value)
          ? field.state.value
          : [];
        const fileIndex = dropzone.fileStatuses.findIndex(
          (status) => status.id === fileId
        );
        if (fileIndex !== -1) {
          const updatedFiles = currentFiles.filter(
            (_, index) => index !== fileIndex
          );
          field.handleChange(
            updatedFiles.length > 0 ? updatedFiles : undefined
          );
        }
      }
    },
    validation: {
      accept: accept ? { [accept]: [] } : undefined,
      maxSize,
      maxFiles,
    },
  });

  const renderAvatarVariant = () => (
    <Dropzone {...dropzone}>
      <div className="flex flex-col items-center space-y-4">
        <DropZoneArea className="border-none bg-transparent p-0">
          <div className="relative">
            <div
              className={cn(
                "size-32 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-primary",
                isInvalid ? "border-red-500" : "border-gray-200",
                !previewUrl && "bg-gray-50"
              )}
            >
              {preview && previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Avatar preview"
                  width={128}
                  height={128}
                  className="size-full object-cover"
                />
              ) : (
                <Upload className="size-8 text-gray-400" />
              )}
            </div>
            {dropzone.fileStatuses.length > 0 && (
              <DropzoneRemoveFile
                variant="destructive"
                className="absolute -top-1 -right-1 size-7 rounded-full shadow-md"
              >
                <X className="size-3.5" />
              </DropzoneRemoveFile>
            )}
          </div>
        </DropZoneArea>

        <DropzoneTrigger className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-50">
          {previewUrl ? "Change Avatar" : "Upload Avatar"}
        </DropzoneTrigger>

        <DropzoneMessage />
      </div>
    </Dropzone>
  );

  const renderMultiVariant = () => (
    <Dropzone {...dropzone}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <DropzoneDescription>
            {maxFiles > 1 && `Select up to ${maxFiles} files`}
          </DropzoneDescription>
          <DropzoneMessage />
        </div>

        {dropzone.fileStatuses.length === 0 && (
          <DropZoneArea
            className={cn(
              "min-h-[120px] cursor-pointer",
              isInvalid && "border-red-500"
            )}
          >
            <DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm w-full">
              <Upload className="size-8 text-gray-400" />
              <div>
                <p className="font-semibold">Upload images</p>
                <p className="text-sm text-muted-foreground">
                  Click here or drag and drop to upload
                </p>
                <DropzoneDescription className="text-xs text-gray-400 mt-2">
                  Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                </DropzoneDescription>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        )}

        {dropzone.fileStatuses.length > 0 && (
          <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
            {dropzone.fileStatuses.map((fileStatus) => (
              <DropzoneFileListItem
                className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                key={fileStatus.id}
                file={fileStatus}
              >
                {fileStatus.status === "pending" && (
                  <div className="aspect-video animate-pulse bg-black/20" />
                )}
                {fileStatus.status === "success" && preview && (
                  <Image
                    src={fileStatus.result}
                    alt={`uploaded-${fileStatus.fileName}`}
                    width={300}
                    height={200}
                    className="aspect-video object-cover"
                  />
                )}
                <div className="flex items-center justify-between p-2 pl-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{fileStatus.fileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {(fileStatus.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <DropzoneRemoveFile
                    variant="ghost"
                    className="shrink-0 hover:outline"
                  >
                    <Trash2 className="size-4" />
                  </DropzoneRemoveFile>
                </div>
              </DropzoneFileListItem>
            ))}
          </DropzoneFileList>
        )}
      </div>
    </Dropzone>
  );

  const renderNormalVariant = () => (
    <Dropzone {...dropzone}>
      <div className="space-y-4">
        {dropzone.fileStatuses.length > 0 ? (
          <DropzoneFileList>
            {dropzone.fileStatuses.map((fileStatus) => (
              <DropzoneFileListItem key={fileStatus.id} file={fileStatus}>
                <div className="flex items-center gap-3">
                  {preview && fileStatus.result && (
                    <Image
                      src={fileStatus.result}
                      alt="Preview"
                      width={64}
                      height={64}
                      className="size-16 object-cover rounded-lg border-2 border-gray-200"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileStatus.fileName}
                    </p>
                    <InfiniteProgress
                      status={fileStatus.status}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    {fileStatus.status === "error" && (
                      <DropzoneRetryFile variant="outline" size="icon">
                        <RotateCcw className="size-4" />
                      </DropzoneRetryFile>
                    )}
                    <DropzoneRemoveFile variant="destructive" size="icon">
                      <X className="size-4" />
                    </DropzoneRemoveFile>
                  </div>
                </div>
                <DropzoneFileMessage />
              </DropzoneFileListItem>
            ))}
          </DropzoneFileList>
        ) : (
          <DropZoneArea
            className={cn(
              "min-h-[120px] cursor-pointer",
              isInvalid && "border-red-500"
            )}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <Upload className="size-8 text-gray-400" />
              <DropzoneTrigger className="text-amber-600 hover:text-amber-700">
                Click to upload
              </DropzoneTrigger>
              <span className="text-sm text-gray-500"> or drag and drop</span>
            </div>
          </DropZoneArea>
        )}

        <DropzoneMessage />
      </div>
    </Dropzone>
  );

  const renderVariant = () => {
    switch (variant) {
      case "avatar":
        return renderAvatarVariant();
      case "multi":
        return renderMultiVariant();
      default:
        return renderNormalVariant();
    }
  };

  return <FormBase {...props}>{renderVariant()}</FormBase>;
}
