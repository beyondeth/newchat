import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString
    .min(5, "이메일은 최소 5자 이상이어야 합니다")
    .max(20, "이메일은 최대 20자까지 가능합니다")
    .email("올바른 이메일 형식이 아닙니다")
    .refine((email) => {
      const localPart = email.split("@")[0];
      return localPart.length >= 5 && localPart.length <= 20;
    }, "이메일 아이디는 5자에서 20자 사이여야 합니다"),
  username: requiredString.regex(
    /^[a-zA-Z0-9가-힣_-]{2,10}$/,
    "최소 2글자에서 10글자까지 허용, 문자,숫자,특수기호(- , _) 가능",
  ),
  password: requiredString
    .regex(/^.{8,30}$/, "비밀번호는 최소 8자 이상 최대 30자 이하여야 합니다.")
    .regex(/.*[A-Z].*/, "비밀번호는 최소 1개의 대문자를 포함해야 합니다.")
    .regex(/.*[@#$&*].*/, "비밀번호는 특수문자(@,#,$,&,*)를 포함해야 합니다."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  // username: requiredString,
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

// BookInfo 스키마 정의
const bookInfoSchema = z
  .object({
    title: z.string(),
    author: z.string(),
    image: z.string().url(),
    publisher: z.string(),
    pubdate: z.string(),
    isbn: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
  })
  .optional();

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .max(3000, "본 문 내용은 최대 3000자까지 입력가능합니다."),
  mediaIds: z.array(z.string()).max(5, "5개까지만 업로드 가능합니다"),
  booktitle: z
    .string()
    .max(15, "책 제목은 15자 이내로 입력해주세요.")
    .optional(),
  bookauthor: z
    .string()
    .max(15, "저자 이름은 15자 이내로 입력해주세요.")
    .optional(),
  youtubeLinks: z.array(z.string()).optional().default([]),
  bookInfo: bookInfoSchema, // bookInfo 필드 추가
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "최대 입력 가능한 글자수는 1000개 입니다"),
  avatarUrl: z.string().nullable().optional(), // 추가된 부분
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
  //test
});

// 유저 계정 삭제
export const deleteAccountSchema = z.object({
  password: requiredString
    .regex(/^.{8,30}$/, "비밀번호는 최소 8자 이상 최대 30자 이하여야 합니다.")
    .regex(/.*[A-Z].*/, "비밀번호는 최소 1개의 대문자를 포함해야 합니다.")
    .regex(/.*[@#$&*].*/, "비밀번호는 특수문자(@,#,$,&,*)를 포함해야 합니다."),
});

export type DeleteAccountValues = z.infer<typeof deleteAccountSchema>;

// chat

export const createChatRoomSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["DIRECT", "GROUP"]),
  participantIds: z.array(z.string()).min(1, "최소 1명의 참여자가 필요합니다"),
});

export const sendMessageSchema = z.object({
  content: requiredString.max(1000, "메시지는 최대 1000자까지 가능합니다"),
  type: z.enum(["TEXT", "IMAGE", "FILE", "SYSTEM"]).default("TEXT"),
  chatRoomId: requiredString,
});

export type CreateChatRoomValues = z.infer<typeof createChatRoomSchema>;
export type SendMessageValues = z.infer<typeof sendMessageSchema>;
