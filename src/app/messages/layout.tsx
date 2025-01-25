import SessionProvider from "../(main)/SessionProvider";
import { validateRequest } from "@/auth";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await validateRequest();
  return (
    <SessionProvider value={{ user, session }}>{children}</SessionProvider>
  );
}
