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
  password: requiredString.regex(
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,30}$/,
    "비밀번호는 최소 8자 이상 최대30자 이하이며, 최소 1개의 대문자 및 특수문자를 포함해야 합니다",
  ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  // username: requiredString,
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "5개까지만 업로드 가능합니다"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "최대 입력 가능한 글자수는 1000개 입니다"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
