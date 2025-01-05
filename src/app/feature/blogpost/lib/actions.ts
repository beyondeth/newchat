"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export async function createBlogAction(data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  tags?: string[];
}) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "Authentication required" };
  }

  const formattedSlug = data.slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let post;

  try {
    post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: formattedSlug,
        content: data.content,
        excerpt: data.excerpt,
        tags: data.tags || [],
        userId: user.id,
        published: false,
        viewCount: 0,
      },
    });

    if (!post) {
      return { error: "Failed to create the blog post" };
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "A post with this slug already exists" };
    }

    return { error: error.message || "Failed to create the blog post" };
  }

  revalidatePath("/feature/blogpost/blog");
  revalidatePath(`/feature/blogpost/blog/${post.slug}`);
  redirect(`/feature/blogpost/blog/${post.slug}`);
}

export async function updateBlogAction(
  slug: string,
  data: {
    title?: string;
    content?: string;
    excerpt?: string;
    tags?: string[];
    published?: boolean;
  },
) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "Authentication required" };
  }

  try {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
      select: { userId: true },
    });

    if (!existingPost) {
      return { error: "Blog post not found" };
    }

    if (existingPost.userId !== user.id && !user.isAdmin) {
      return { error: "You do not have permission to edit this post" };
    }

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.tags && { tags: data.tags }),
        ...(data.published !== undefined && { published: data.published }),
      },
    });

    if (!post) {
      return { error: "Failed to update the blog post" };
    }

    revalidatePath("/feature/blogpost/blog");
    revalidatePath(`/feature/blogpost/blog/${slug}`);

    return { success: true, post };
  } catch (error: any) {
    return { error: error.message || "Failed to update the blog post" };
  }
}

export async function deleteBlogAction(slug: string) {
  const { user } = await validateRequest();

  if (!user) {
    return { error: "Authentication required" };
  }

  try {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
      select: { userId: true },
    });

    if (!existingPost) {
      return { error: "Blog post not found" };
    }

    if (existingPost.userId !== user.id && !user.isAdmin) {
      return { error: "You do not have permission to delete this post" };
    }

    await prisma.blogPost.delete({
      where: { slug },
    });

    revalidatePath("/feature/blogpost/blog");
    redirect("/feature/blogpost/blog");
  } catch (error: any) {
    return { error: error.message || "Failed to delete the blog post" };
  }
}
