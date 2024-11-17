import { UploadRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>();

export const UploadButton = generateUploadButton<UploadRouter>();
export const UploadDropzone = generateUploadDropzone<UploadRouter>();
