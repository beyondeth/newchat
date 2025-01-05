import UserAvatar from "@/components/UserAvatar";
import { NotificationData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer.displayName}님이 팔로우했습니다`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.displayName}님이 포스트에 댓글을 남겼습니다`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `${notification.issuer.displayName}님이 포스트를 좋아합니다`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/posts/${notification.postId}`,
    },
    BLOG_LIKE: {
      message: `${notification.issuer.displayName}님이 블로그 포스트를 좋아합니다`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: `/feature/blogpost/blog/${notification.blogPostId}`,
    },
    BLOG_COMMENT: {
      message: `${notification.issuer.displayName}님이 블로그 포스트에 댓글을 남겼습니다`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: `/feature/blogpost/blog/${notification.blogPostId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div>
            <span className="font-bold">{notification.issuer.displayName}</span>{" "}
            <span>{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.post.content}
            </div>
          )}
          {notification.blogPost && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.blogPost.title}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
