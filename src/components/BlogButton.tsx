import Link from "next/link";
import Image from "next/image";

const BlogButton = () => {
  return (
    <Link href="/feature/blogpost/blog">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/blogimage.png"
          alt="Blog"
          width={24}
          height={24}
          className="mr-2"
        />
        {/* <span className="font-semibold">Blog</span> */}
      </div>
    </Link>
  );
};

export default BlogButton;
