import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between">
        <ul className="flex gap-6">
          <li>
            <Link href="/feature/blogpost">Home</Link>
          </li>
          <li>
            <Link href="/feature/blogpost/blog">Posts</Link>
          </li>
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
