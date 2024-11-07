// import "cropperjs/dist/cropper.css";
// import { useRef } from "react";
// import { Cropper, ReactCropperElement } from "react-cropper";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";

// interface CropImageDialogProps {
//   src: string;
//   cropAspectRatio: number;
//   onCropped: (blob: Blob | null) => void;
//   onClose: () => void;
// }

// export default function CropImageDialog({
//   src,
//   cropAspectRatio,
//   onCropped,
//   onClose,
// }: CropImageDialogProps) {
//   const cropperRef = useRef<ReactCropperElement>(null);

//   function crop() {
//     const cropper = cropperRef.current?.cropper;
//     if (!cropper) return;
//     cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
//     onClose();
//   }

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Crop image</DialogTitle>
//         </DialogHeader>
//         <Cropper
//           src={src}
//           aspectRatio={cropAspectRatio}
//           guides={false}
//           zoomable={false}
//           ref={cropperRef}
//           className="mx-auto size-fit"
//         />
//         <DialogFooter>
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={crop}>Crop</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCropped,
  onClose,
}: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg mx-auto h-[90vh] flex flex-col sm:h-auto">
        <DialogHeader className="px-4 py-2">
          <DialogTitle>이미지 자르기</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <Cropper
            src={src}
            aspectRatio={cropAspectRatio}
            guides={false}
            zoomable={false}
            ref={cropperRef}
            className="h-full max-h-[60vh] w-full"
          />
        </div>

        <DialogFooter className="px-4 py-3 mt-auto border-t">
          <div className="flex w-full gap-2">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button onClick={crop} className="flex-1">
              자르기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
