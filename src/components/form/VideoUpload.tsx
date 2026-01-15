import { RotateCcw, Trash2, Video as VideoIcon, X } from "lucide-react";
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

interface VideoUploadProps extends FormControlProps {
  maxSize?: number; // in bytes
  maxFiles?: number; // max number of files
  initialPreviewUrl?: string;
  accept?: string;
  preview?: boolean;
}

export function VideoUpload({
  maxSize = 200 * 1024 * 1024, // 200MB default
  maxFiles = 1,
  initialPreviewUrl,
  accept = "video/*",
  preview = true,
  ...props
}: VideoUploadProps) {
  const field = useFieldContext<File | File[] | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [previewUrl, setPreviewUrl] = useState<string>(initialPreviewUrl || "");

  const dropzone = useDropzone<string, string>({
    onDropFile: async (file) => {
      // Create preview URL
      const url = URL.createObjectURL(file);

      if (maxFiles === 1) {
        setPreviewUrl(url);
        field.handleChange(file);
      } else {
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
        setPreviewUrl("");
        field.handleChange(undefined);
      } else {
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

  return (
    <FormBase {...props}>
      <Dropzone {...dropzone}>
        <div className="space-y-4">
          {dropzone.fileStatuses.length > 0 ? (
            <DropzoneFileList>
              {dropzone.fileStatuses.map((fileStatus) => (
                <DropzoneFileListItem key={fileStatus.id} file={fileStatus}>
                  <div className="flex items-center gap-3">
                    {preview && fileStatus.result && (
                      <div className="size-16 flex items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                        <VideoIcon className="size-8 text-gray-400" />
                      </div>
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
                <VideoIcon className="size-8 text-gray-400" />
                <DropzoneTrigger className="text-amber-600 hover:text-amber-700">
                  Click to upload video
                </DropzoneTrigger>
                <span className="text-sm text-gray-500"> or drag and drop</span>
                <DropzoneDescription className="text-xs text-gray-400 mt-2">
                  Max file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                </DropzoneDescription>
              </div>
            </DropZoneArea>
          )}

          <DropzoneMessage />
        </div>
      </Dropzone>
    </FormBase>
  );
}
