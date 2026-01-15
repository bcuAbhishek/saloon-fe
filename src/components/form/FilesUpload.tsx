import { FileText, RotateCcw, Trash2, X } from "lucide-react";
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

interface FilesUploadProps extends FormControlProps {
  maxSize?: number; // in bytes
  maxFiles?: number; // max number of files
  initialPreviewUrl?: string; // Not typically used for generic files but kept for consistency
  accept?: string;
}

export function FilesUpload({
  maxSize = 200 * 1024 * 1024, // 200MB default
  maxFiles = 1,
  initialPreviewUrl,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar",
  ...props
}: FilesUploadProps) {
  const field = useFieldContext<File | File[] | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Helper to parse accept string into Dropzone accept object
  const parseAccept = (acceptString?: string) => {
    if (!acceptString) return undefined;
    // Should not contain image/* or video/* shortcuts here typically but handle if passed

    const mimeMap: Record<string, string[]> = {
      ".pdf": ["application/pdf"],
      ".doc": ["application/msword"],
      ".docx": [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      ".xls": ["application/vnd.ms-excel"],
      ".xlsx": [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      ".ppt": ["application/vnd.ms-powerpoint"],
      ".pptx": [
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ],
      ".txt": ["text/plain"],
      ".csv": ["text/csv"],
      ".zip": ["application/zip", "application/x-zip-compressed"],
      ".rar": ["application/x-rar-compressed"],
    };

    const parts = acceptString.split(",").map((s) => s.trim());
    const acceptObj: Record<string, string[]> = {};

    parts.forEach((part) => {
      if (part.startsWith(".")) {
        const mimes = mimeMap[part];
        if (mimes) {
          mimes.forEach((mime) => {
            if (!acceptObj[mime]) acceptObj[mime] = [];
            if (!acceptObj[mime].includes(part)) acceptObj[mime].push(part);
          });
        } else {
          // Fallback for unknown extensions
          const fallbackMime = "application/octet-stream";
          if (!acceptObj[fallbackMime]) acceptObj[fallbackMime] = [];
          acceptObj[fallbackMime].push(part);
        }
      } else {
        // MIME type directly
        acceptObj[part] = [];
      }
    });

    return acceptObj;
  };

  const dropzone = useDropzone<string, string>({
    onDropFile: async (file) => {
      // For generic files, preview URL might just be a dummy or download link but we treat it simple here
      const url = URL.createObjectURL(file);

      if (maxFiles === 1) {
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
      accept: parseAccept(accept),
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
                    <div className="size-16 flex items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-50">
                      <FileText className="size-8 text-gray-400" />
                    </div>
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
                <FileText className="size-8 text-gray-400" />
                <DropzoneTrigger className="text-amber-600 hover:text-amber-700">
                  Click to upload file
                </DropzoneTrigger>
                <span className="text-sm text-gray-500"> or drag and drop</span>
              </div>
            </DropZoneArea>
          )}

          <DropzoneMessage />
        </div>
      </Dropzone>
    </FormBase>
  );
}
