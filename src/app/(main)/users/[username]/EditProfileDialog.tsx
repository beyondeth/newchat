import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import CropImageDialog from "@/components/CropImageDialog";
import LoadingButton from "@/components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserData } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { useUpdateProfileMutation } from "./mutations";

interface EditProfileDialogProps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });

  const mutation = useUpdateProfileMutation();

  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  async function onSubmit(values: UpdateUserProfileValues) {
    const newAvatarFile = croppedAvatar
      ? new File([croppedAvatar], `avatar_${user.id}.webp`)
      : undefined;

    mutation.mutate(
      {
        values,
        avatar: newAvatarFile,
      },
      {
        onSuccess: () => {
          setCroppedAvatar(null);
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label>아바타</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.avatarUrl || avatarPlaceholder
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>소개</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="나 자신에 대해 살짝 주절주절..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton type="submit" loading={mutation.isPending}>
                저장
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1080,
      1080,
      "WEBP",
      80,
      0,
      (uri) => setImageToCrop(uri as File),
      "file",
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
      >
        <Image
          src={src}
          alt="Avatar preview"
          width={150}
          height={150}
          className="size-32 flex-none rounded-full object-cover"
        />
        <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
          <Camera size={24} />
        </span>
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRatio={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
}

// chatgpt 아래 코드 실패 1

// import avatarPlaceholder from "@/assets/avatar-placeholder.png";
// import CropImageDialog from "@/components/CropImageDialog";
// import LoadingButton from "@/components/LoadingButton";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { UserData } from "@/lib/types";
// import {
//   updateUserProfileSchema,
//   UpdateUserProfileValues,
// } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Camera } from "lucide-react";
// import Image, { StaticImageData } from "next/image";
// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import Resizer from "react-image-file-resizer";
// import { useUpdateProfileMutation } from "./mutations";

// interface EditProfileDialogProps {
//   user: UserData;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function EditProfileDialog({
//   user,
//   open,
//   onOpenChange,
// }: EditProfileDialogProps) {
//   const form = useForm<UpdateUserProfileValues>({
//     resolver: zodResolver(updateUserProfileSchema),
//     defaultValues: {
//       displayName: user.displayName,
//       bio: user.bio || "",
//     },
//   });

//   const mutation = useUpdateProfileMutation();
//   const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

//   async function onSubmit(values: UpdateUserProfileValues) {
//     const newAvatarFile = croppedAvatar
//       ? new File([croppedAvatar], `avatar_${user.id}.webp`)
//       : undefined;

//     mutation.mutate(
//       {
//         values,
//         avatar: newAvatarFile,
//       },
//       {
//         onSuccess: () => {
//           setCroppedAvatar(null);
//           onOpenChange(false);
//         },
//       },
//     );
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-1.5">
//           <Label>Avatar</Label>
//           <AvatarInput
//             src={
//               croppedAvatar
//                 ? URL.createObjectURL(croppedAvatar)
//                 : user.avatarUrl || avatarPlaceholder
//             }
//             onImageCropped={setCroppedAvatar}
//           />
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
//             <FormField
//               control={form.control}
//               name="displayName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Display name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Your display name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="bio"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bio</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Tell us a little bit about yourself"
//                       className="resize-none"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <LoadingButton type="submit" loading={mutation.isPending}>
//                 Save
//               </LoadingButton>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// interface AvatarInputProps {
//   src: string | StaticImageData;
//   onImageCropped: (blob: Blob | null) => void;
// }

// function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
//   const [imageToCrop, setImageToCrop] = useState<File>();
//   const [previewUrl, setPreviewUrl] = useState<string>(
//     typeof src === "string" ? src : src.src,
//   );
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function onImageSelected(image: File | undefined) {
//     if (!image) return;

//     // Release the previous URL object if it exists
//     if (previewUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(previewUrl);
//     }

//     Resizer.imageFileResizer(
//       image,
//       1024,
//       1024,
//       "WEBP",
//       100,
//       0,
//       (uri) => {
//         setImageToCrop(uri as File);
//         setPreviewUrl(URL.createObjectURL(uri as File));
//       },
//       "file",
//     );
//   }

//   function handleCropCompletion(croppedBlob: Blob | null) {
//     // Release the previous preview URL to avoid memory leaks
//     if (previewUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(previewUrl);
//     }

//     if (croppedBlob) {
//       const newUrl = URL.createObjectURL(croppedBlob);
//       setPreviewUrl(newUrl);
//       onImageCropped(croppedBlob);
//     } else {
//       setPreviewUrl(typeof src === "string" ? src : src.src);
//       onImageCropped(null);
//     }
//   }

//   return (
//     <>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => onImageSelected(e.target.files?.[0])}
//         ref={fileInputRef}
//         className="sr-only hidden"
//       />
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         className="group relative block"
//       >
//         <Image
//           src={previewUrl}
//           alt="Avatar preview"
//           width={150}
//           height={150}
//           className="size-32 flex-none rounded-full object-cover"
//         />
//         <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
//           <Camera size={24} />
//         </span>
//       </button>
//       {imageToCrop && (
//         <CropImageDialog
//           src={URL.createObjectURL(imageToCrop)}
//           cropAspectRatio={1}
//           onCropped={handleCropCompletion}
//           onClose={() => {
//             setImageToCrop(undefined);
//             if (fileInputRef.current) {
//               fileInputRef.current.value = "";
//             }
//           }}
//         />
//       )}
//     </>
//   );
// }

// chatgpt
// 주요 변경 사항
// Resizer 제거: react-image-file-resizer를 제거하고, 업로드한 이미지를 바로 미리 보기 URL로 사용하도록 변경했습니다.
// previewUrl 업데이트: 선택한 파일의 URL.createObjectURL을 previewUrl로 설정하여 미리 보기 이미지를 즉시 업데이트하도록 했습니다.
// 이 코드가 모바일에서도 제대로 작동하는지 확인해보세요.

// import avatarPlaceholder from "@/assets/avatar-placeholder.png";
// import CropImageDialog from "@/components/CropImageDialog";
// import LoadingButton from "@/components/LoadingButton";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { UserData } from "@/lib/types";
// import {
//   updateUserProfileSchema,
//   UpdateUserProfileValues,
// } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Camera } from "lucide-react";
// import Image, { StaticImageData } from "next/image";
// import { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useUpdateProfileMutation } from "./mutations";

// interface EditProfileDialogProps {
//   user: UserData;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function EditProfileDialog({
//   user,
//   open,
//   onOpenChange,
// }: EditProfileDialogProps) {
//   const form = useForm<UpdateUserProfileValues>({
//     resolver: zodResolver(updateUserProfileSchema),
//     defaultValues: {
//       displayName: user.displayName,
//       bio: user.bio || "",
//     },
//   });

//   const mutation = useUpdateProfileMutation();
//   const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

//   async function onSubmit(values: UpdateUserProfileValues) {
//     const newAvatarFile = croppedAvatar
//       ? new File([croppedAvatar], `avatar_${user.id}.webp`)
//       : undefined;

//     mutation.mutate(
//       {
//         values,
//         avatar: newAvatarFile,
//       },
//       {
//         onSuccess: () => {
//           setCroppedAvatar(null);
//           onOpenChange(false);
//         },
//       },
//     );
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit profile</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-1.5">
//           <Label>Avatar</Label>
//           <AvatarInput
//             src={
//               croppedAvatar
//                 ? URL.createObjectURL(croppedAvatar)
//                 : user.avatarUrl || avatarPlaceholder
//             }
//             onImageCropped={setCroppedAvatar}
//           />
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
//             <FormField
//               control={form.control}
//               name="displayName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Display name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Your display name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="bio"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bio</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Tell us a little bit about yourself"
//                       className="resize-none"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <LoadingButton type="submit" loading={mutation.isPending}>
//                 Save
//               </LoadingButton>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// interface AvatarInputProps {
//   src: string | StaticImageData;
//   onImageCropped: (blob: Blob | null) => void;
// }

// function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
//   const [previewUrl, setPreviewUrl] = useState<string>(
//     typeof src === "string" ? src : src.src,
//   );
//   const [imageToCrop, setImageToCrop] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function onImageSelected(image: File | undefined) {
//     if (!image) return;

//     // Release the previous URL object if it exists
//     if (previewUrl.startsWith("blob:")) {
//       URL.revokeObjectURL(previewUrl);
//     }

//     setImageToCrop(image);
//   }

//   function handleCroppedImage(blob: Blob | null) {
//     if (blob) {
//       const newPreviewUrl = URL.createObjectURL(blob);
//       setPreviewUrl(newPreviewUrl);
//       onImageCropped(blob);
//     }
//     setImageToCrop(null); // Close the cropping dialog
//   }

//   return (
//     <>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => onImageSelected(e.target.files?.[0])}
//         ref={fileInputRef}
//         className="sr-only hidden"
//       />
//       <button
//         type="button"
//         onClick={() => fileInputRef.current?.click()}
//         className="group relative block"
//       >
//         <Image
//           src={previewUrl}
//           alt="Avatar preview"
//           width={150}
//           height={150}
//           className="size-32 flex-none rounded-full object-cover"
//         />
//         <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
//           <Camera size={24} />
//         </span>
//       </button>
//       {imageToCrop && (
//         <CropImageDialog
//           src={URL.createObjectURL(imageToCrop)}
//           cropAspectRatio={1}
//           onCropped={handleCroppedImage}
//           onClose={() => setImageToCrop(null)}
//         />
//       )}
//     </>
//   );
// }
