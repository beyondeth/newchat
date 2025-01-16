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
//           <DialogTitle>프로필 편집</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-1.5">
//           <Label>아바타</Label>
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
//                   <FormLabel>닉네임</FormLabel>
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
//                   <FormLabel>소개</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="나 자신에 대해 살짝 주절주절..."
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
//                 저장
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

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   function onImageSelected(image: File | undefined) {
//     if (!image) return;

//     Resizer.imageFileResizer(
//       image,
//       1080,
//       1080,
//       "WEBP",
//       80,
//       0,
//       (uri) => setImageToCrop(uri as File),
//       "file",
//     );
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
//           src={src}
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
//           onCropped={onImageCropped}
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

// // chatgpt 아래 코드 실패 1

// // import avatarPlaceholder from "@/assets/avatar-placeholder.png";
// // import CropImageDialog from "@/components/CropImageDialog";
// // import LoadingButton from "@/components/LoadingButton";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { UserData } from "@/lib/types";
// // import {
// //   updateUserProfileSchema,
// //   UpdateUserProfileValues,
// // } from "@/lib/validation";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Camera } from "lucide-react";
// // import Image, { StaticImageData } from "next/image";
// // import { useRef, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import Resizer from "react-image-file-resizer";
// // import { useUpdateProfileMutation } from "./mutations";

// // interface EditProfileDialogProps {
// //   user: UserData;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// // }

// // export default function EditProfileDialog({
// //   user,
// //   open,
// //   onOpenChange,
// // }: EditProfileDialogProps) {
// //   const form = useForm<UpdateUserProfileValues>({
// //     resolver: zodResolver(updateUserProfileSchema),
// //     defaultValues: {
// //       displayName: user.displayName,
// //       bio: user.bio || "",
// //     },
// //   });

// //   const mutation = useUpdateProfileMutation();
// //   const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

// //   async function onSubmit(values: UpdateUserProfileValues) {
// //     const newAvatarFile = croppedAvatar
// //       ? new File([croppedAvatar], `avatar_${user.id}.webp`)
// //       : undefined;

// //     mutation.mutate(
// //       {
// //         values,
// //         avatar: newAvatarFile,
// //       },
// //       {
// //         onSuccess: () => {
// //           setCroppedAvatar(null);
// //           onOpenChange(false);
// //         },
// //       },
// //     );
// //   }

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Edit profile</DialogTitle>
// //         </DialogHeader>
// //         <div className="space-y-1.5">
// //           <Label>Avatar</Label>
// //           <AvatarInput
// //             src={
// //               croppedAvatar
// //                 ? URL.createObjectURL(croppedAvatar)
// //                 : user.avatarUrl || avatarPlaceholder
// //             }
// //             onImageCropped={setCroppedAvatar}
// //           />
// //         </div>
// //         <Form {...form}>
// //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
// //             <FormField
// //               control={form.control}
// //               name="displayName"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Display name</FormLabel>
// //                   <FormControl>
// //                     <Input placeholder="Your display name" {...field} />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="bio"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Bio</FormLabel>
// //                   <FormControl>
// //                     <Textarea
// //                       placeholder="Tell us a little bit about yourself"
// //                       className="resize-none"
// //                       {...field}
// //                     />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <DialogFooter>
// //               <LoadingButton type="submit" loading={mutation.isPending}>
// //                 Save
// //               </LoadingButton>
// //             </DialogFooter>
// //           </form>
// //         </Form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// // interface AvatarInputProps {
// //   src: string | StaticImageData;
// //   onImageCropped: (blob: Blob | null) => void;
// // }

// // function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
// //   const [imageToCrop, setImageToCrop] = useState<File>();
// //   const [previewUrl, setPreviewUrl] = useState<string>(
// //     typeof src === "string" ? src : src.src,
// //   );
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   function onImageSelected(image: File | undefined) {
// //     if (!image) return;

// //     // Release the previous URL object if it exists
// //     if (previewUrl.startsWith("blob:")) {
// //       URL.revokeObjectURL(previewUrl);
// //     }

// //     Resizer.imageFileResizer(
// //       image,
// //       1024,
// //       1024,
// //       "WEBP",
// //       100,
// //       0,
// //       (uri) => {
// //         setImageToCrop(uri as File);
// //         setPreviewUrl(URL.createObjectURL(uri as File));
// //       },
// //       "file",
// //     );
// //   }

// //   function handleCropCompletion(croppedBlob: Blob | null) {
// //     // Release the previous preview URL to avoid memory leaks
// //     if (previewUrl.startsWith("blob:")) {
// //       URL.revokeObjectURL(previewUrl);
// //     }

// //     if (croppedBlob) {
// //       const newUrl = URL.createObjectURL(croppedBlob);
// //       setPreviewUrl(newUrl);
// //       onImageCropped(croppedBlob);
// //     } else {
// //       setPreviewUrl(typeof src === "string" ? src : src.src);
// //       onImageCropped(null);
// //     }
// //   }

// //   return (
// //     <>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => onImageSelected(e.target.files?.[0])}
// //         ref={fileInputRef}
// //         className="sr-only hidden"
// //       />
// //       <button
// //         type="button"
// //         onClick={() => fileInputRef.current?.click()}
// //         className="group relative block"
// //       >
// //         <Image
// //           src={previewUrl}
// //           alt="Avatar preview"
// //           width={150}
// //           height={150}
// //           className="size-32 flex-none rounded-full object-cover"
// //         />
// //         <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
// //           <Camera size={24} />
// //         </span>
// //       </button>
// //       {imageToCrop && (
// //         <CropImageDialog
// //           src={URL.createObjectURL(imageToCrop)}
// //           cropAspectRatio={1}
// //           onCropped={handleCropCompletion}
// //           onClose={() => {
// //             setImageToCrop(undefined);
// //             if (fileInputRef.current) {
// //               fileInputRef.current.value = "";
// //             }
// //           }}
// //         />
// //       )}
// //     </>
// //   );
// // }

// // chatgpt
// // 주요 변경 사항
// // Resizer 제거: react-image-file-resizer를 제거하고, 업로드한 이미지를 바로 미리 보기 URL로 사용하도록 변경했습니다.
// // previewUrl 업데이트: 선택한 파일의 URL.createObjectURL을 previewUrl로 설정하여 미리 보기 이미지를 즉시 업데이트하도록 했습니다.
// // 이 코드가 모바일에서도 제대로 작동하는지 확인해보세요.

// // import avatarPlaceholder from "@/assets/avatar-placeholder.png";
// // import CropImageDialog from "@/components/CropImageDialog";
// // import LoadingButton from "@/components/LoadingButton";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { UserData } from "@/lib/types";
// // import {
// //   updateUserProfileSchema,
// //   UpdateUserProfileValues,
// // } from "@/lib/validation";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Camera } from "lucide-react";
// // import Image, { StaticImageData } from "next/image";
// // import { useRef, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useUpdateProfileMutation } from "./mutations";

// // interface EditProfileDialogProps {
// //   user: UserData;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// // }

// // export default function EditProfileDialog({
// //   user,
// //   open,
// //   onOpenChange,
// // }: EditProfileDialogProps) {
// //   const form = useForm<UpdateUserProfileValues>({
// //     resolver: zodResolver(updateUserProfileSchema),
// //     defaultValues: {
// //       displayName: user.displayName,
// //       bio: user.bio || "",
// //     },
// //   });

// //   const mutation = useUpdateProfileMutation();
// //   const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

// //   async function onSubmit(values: UpdateUserProfileValues) {
// //     const newAvatarFile = croppedAvatar
// //       ? new File([croppedAvatar], `avatar_${user.id}.webp`)
// //       : undefined;

// //     mutation.mutate(
// //       {
// //         values,
// //         avatar: newAvatarFile,
// //       },
// //       {
// //         onSuccess: () => {
// //           setCroppedAvatar(null);
// //           onOpenChange(false);
// //         },
// //       },
// //     );
// //   }

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Edit profile</DialogTitle>
// //         </DialogHeader>
// //         <div className="space-y-1.5">
// //           <Label>Avatar</Label>
// //           <AvatarInput
// //             src={
// //               croppedAvatar
// //                 ? URL.createObjectURL(croppedAvatar)
// //                 : user.avatarUrl || avatarPlaceholder
// //             }
// //             onImageCropped={setCroppedAvatar}
// //           />
// //         </div>
// //         <Form {...form}>
// //           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
// //             <FormField
// //               control={form.control}
// //               name="displayName"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Display name</FormLabel>
// //                   <FormControl>
// //                     <Input placeholder="Your display name" {...field} />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <FormField
// //               control={form.control}
// //               name="bio"
// //               render={({ field }) => (
// //                 <FormItem>
// //                   <FormLabel>Bio</FormLabel>
// //                   <FormControl>
// //                     <Textarea
// //                       placeholder="Tell us a little bit about yourself"
// //                       className="resize-none"
// //                       {...field}
// //                     />
// //                   </FormControl>
// //                   <FormMessage />
// //                 </FormItem>
// //               )}
// //             />
// //             <DialogFooter>
// //               <LoadingButton type="submit" loading={mutation.isPending}>
// //                 Save
// //               </LoadingButton>
// //             </DialogFooter>
// //           </form>
// //         </Form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// // interface AvatarInputProps {
// //   src: string | StaticImageData;
// //   onImageCropped: (blob: Blob | null) => void;
// // }

// // function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
// //   const [previewUrl, setPreviewUrl] = useState<string>(
// //     typeof src === "string" ? src : src.src,
// //   );
// //   const [imageToCrop, setImageToCrop] = useState<File | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   function onImageSelected(image: File | undefined) {
// //     if (!image) return;

// //     // Release the previous URL object if it exists
// //     if (previewUrl.startsWith("blob:")) {
// //       URL.revokeObjectURL(previewUrl);
// //     }

// //     setImageToCrop(image);
// //   }

// //   function handleCroppedImage(blob: Blob | null) {
// //     if (blob) {
// //       const newPreviewUrl = URL.createObjectURL(blob);
// //       setPreviewUrl(newPreviewUrl);
// //       onImageCropped(blob);
// //     }
// //     setImageToCrop(null); // Close the cropping dialog
// //   }

// //   return (
// //     <>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={(e) => onImageSelected(e.target.files?.[0])}
// //         ref={fileInputRef}
// //         className="sr-only hidden"
// //       />
// //       <button
// //         type="button"
// //         onClick={() => fileInputRef.current?.click()}
// //         className="group relative block"
// //       >
// //         <Image
// //           src={previewUrl}
// //           alt="Avatar preview"
// //           width={150}
// //           height={150}
// //           className="size-32 flex-none rounded-full object-cover"
// //         />
// //         <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
// //           <Camera size={24} />
// //         </span>
// //       </button>
// //       {imageToCrop && (
// //         <CropImageDialog
// //           src={URL.createObjectURL(imageToCrop)}
// //           cropAspectRatio={1}
// //           onCropped={handleCroppedImage}
// //           onClose={() => setImageToCrop(null)}
// //         />
// //       )}
// //     </>
// //   );
// //

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { UserData } from "@/lib/types";
// import { updateUserProfileSchema } from "@/lib/validation";
// import { useState } from "react";

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
//   const [displayName, setDisplayName] = useState(user.displayName);
//   const [bio, setBio] = useState(user.bio ?? "");
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [error, setError] = useState("");

//   // 회원탈퇴 관련 상태
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmText, setConfirmText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);

//   const isSocialUser = user.googleId || user.kakaoId;

//   const handleUpdateProfile = async () => {
//     try {
//       setIsUpdating(true);
//       setError("");

//       updateUserProfileSchema.parse({ displayName, bio });

//       const response = await fetch("/api/users/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ displayName, bio }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error);
//       }

//       onOpenChange(false);
//       window.location.reload();
//     } catch (e) {
//       if (e instanceof Error) {
//         setError(e.message);
//       } else {
//         setError("프로필 업데이트 중 오류가 발생했습니다.");
//       }
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (confirmText !== "회원탈퇴") {
//       setError("'회원탈퇴'를 정확히 입력해주세요.");
//       return;
//     }

//     if (!isSocialUser && !password) {
//       setError("비밀번호를 입력해주세요.");
//       return;
//     }

//     setIsDeleting(true);
//     setError("");

//     try {
//       const response = await fetch("/api/users/deleteaccount", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "회원 탈퇴 처리 중 오류가 발생했습니다.");
//       }

//       window.location.href = "/";
//     } catch (error) {
//       setError(
//         error instanceof Error
//           ? error.message
//           : "알 수 없는 오류가 발생했습니다.",
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         {!showDeleteConfirm ? (
//           // 프로필 수정 UI
//           <>
//             <DialogHeader>
//               <DialogTitle>프로필 수정</DialogTitle>
//               <DialogDescription>
//                 프로필 정보를 수정할 수 있습니다.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="displayName">이름</Label>
//                 <Input
//                   id="displayName"
//                   value={displayName}
//                   onChange={(e) => setDisplayName(e.target.value)}
//                   placeholder="이름을 입력하세요"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="bio">소개</Label>
//                 <Textarea
//                   id="bio"
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   placeholder="자기소개를 입력하세요"
//                 />
//               </div>
//             </div>
//             {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
//             <div className="flex justify-between">
//               <Button
//                 variant="destructive"
//                 onClick={() => setShowDeleteConfirm(true)}
//                 type="button"
//               >
//                 회원 탈퇴
//               </Button>
//               <Button onClick={handleUpdateProfile} disabled={isUpdating}>
//                 {isUpdating ? "저장 중..." : "저장하기"}
//               </Button>
//             </div>
//           </>
//         ) : (
//           // 회원 탈퇴 확인 UI
//           <>
//             <DialogHeader>
//               <DialogTitle className="text-red-600">회원 탈퇴</DialogTitle>
//               <DialogDescription className="space-y-4">
//                 <div className="text-sm space-y-2">
//                   <p>회원 탈퇴 시 다음 사항이 적용됩니다:</p>
//                   <ul className="list-disc pl-4 space-y-1">
//                     <li>작성한 모든 게시물과 댓글이 삭제됩니다.</li>
//                     <li>좋아요, 북마크 등 모든 활동 기록이 삭제됩니다.</li>
//                     {isSocialUser && <li>소셜 계정 연동이 해제됩니다.</li>}
//                     <li>삭제된 데이터는 복구할 수 없습니다.</li>
//                   </ul>
//                 </div>
//                 <div className="space-y-2">
//                   <Label>확인을 위해 회원탈퇴 를 입력해주세요</Label>
//                   <Input
//                     value={confirmText}
//                     onChange={(e) => setConfirmText(e.target.value)}
//                     placeholder="회원탈퇴"
//                   />
//                 </div>
//                 {!isSocialUser && (
//                   <div className="space-y-2">
//                     <Label>비밀번호를 입력해주세요</Label>
//                     <Input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="현재 비밀번호"
//                     />
//                   </div>
//                 )}
//                 {error && <p className="text-sm text-red-600">{error}</p>}
//                 <div className="flex gap-3">
//                   <Button
//                     variant="destructive"
//                     onClick={handleDeleteAccount}
//                     disabled={isDeleting || confirmText !== "회원탈퇴"}
//                     className="flex-1"
//                   >
//                     {isDeleting ? "처리중..." : "탈퇴하기"}
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setShowDeleteConfirm(false);
//                       setPassword("");
//                       setConfirmText("");
//                       setError("");
//                     }}
//                     disabled={isDeleting}
//                     className="flex-1"
//                   >
//                     취소
//                   </Button>
//                 </div>
//               </DialogDescription>
//             </DialogHeader>
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import CropImageDialog from "@/components/CropImageDialog";
import LoadingButton from "@/components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useUpdateProfileMutation } from "./mutations";
import { Button } from "@/components/ui/button";

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
  const [error, setError] = useState("");

  // 회원탈퇴 관련 상태
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isSocialUser = user.googleId || user.kakaoId;

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
          window.location.reload();
        },
        onError: (error) => {
          setError(error.message || "프로필 업데이트 중 오류가 발생했습니다.");
        },
      },
    );
  }

  const handleDeleteAccount = async () => {
    if (confirmText !== "회원탈퇴") {
      setError("'회원탈퇴'를 정확히 입력해주세요.");
      return;
    }

    if (!isSocialUser && !password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/users/deleteaccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "회원 탈퇴 처리 중 오류가 발생했습니다.");
      }

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {!showDeleteConfirm ? (
          <>
            <DialogHeader>
              <DialogTitle>프로필 수정</DialogTitle>
              <DialogDescription>
                프로필 정보를 수정할 수 있습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1.5">
              <Label>프로필 사진</Label>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="이름을 입력하세요" {...field} />
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
                          placeholder="자기소개를 입력하세요"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
                <DialogFooter>
                  <div className="flex w-full justify-between">
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                      type="button"
                    >
                      회원 탈퇴
                    </Button>
                    <LoadingButton type="submit" loading={mutation.isPending}>
                      저장하기
                    </LoadingButton>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </>
        ) : (
          // 회원 탈퇴 확인 UI
          <>
            <DialogHeader>
              <DialogTitle className="text-red-600">회원 탈퇴</DialogTitle>
              <DialogDescription className="space-y-4">
                <div className="text-sm space-y-2">
                  <p>회원 탈퇴 시 다음 사항이 적용됩니다:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>작성한 모든 게시물과 댓글이 삭제됩니다.</li>
                    <li>좋아요, 북마크 등 모든 활동 기록이 삭제됩니다.</li>
                    {isSocialUser && <li>소셜 계정 연동이 해제됩니다.</li>}
                    <li>삭제된 데이터는 복구할 수 없습니다.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <Label>확인을 위해 회원탈퇴 를 입력해주세요</Label>
                  <Input
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="회원탈퇴"
                  />
                </div>
                {!isSocialUser && (
                  <div className="space-y-2">
                    <Label>비밀번호를 입력해주세요</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="현재 비밀번호"
                    />
                  </div>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || confirmText !== "회원탈퇴"}
                    className="flex-1"
                  >
                    {isDeleting ? "처리중..." : "탈퇴하기"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setPassword("");
                      setConfirmText("");
                      setError("");
                    }}
                    disabled={isDeleting}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof src === "string" ? src : src.src,
  );
  const [imageToCrop, setImageToCrop] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageToCrop(image);
  }

  function handleCroppedImage(blob: Blob | null) {
    if (blob) {
      const newPreviewUrl = URL.createObjectURL(blob);
      setPreviewUrl(newPreviewUrl);
      onImageCropped(blob);
    }
    setImageToCrop(null);
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
          src={previewUrl}
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
          onCropped={handleCroppedImage}
          onClose={() => setImageToCrop(null)}
        />
      )}
    </>
  );
}
