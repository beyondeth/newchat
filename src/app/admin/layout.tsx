import { validateRequest } from "@/auth";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user?.isAdmin) {
    redirect("/");
  }
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <div className="hidden md:block h-[100vh] w-[300px]">
          <AdminSidebar />
        </div>
        <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
      </div>
    </>
  );
}
