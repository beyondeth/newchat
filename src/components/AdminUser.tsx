// components/admin/UserAuthManagement.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserSearchResult {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  isAdmin: boolean;
}

export default function AdminUser() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 사용자 검색 함수
  const handleSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/search?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 관리자 권한 토글 함수
  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/toggle-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      });

      if (response.ok) {
        // 검색 결과 업데이트
        setSearchResults((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user,
          ),
        );
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div className="space-y-4 p-3">
      <Button onClick={() => setShowSearch(!showSearch)} className="mb-4">
        관리자 권한 관리
      </Button>

      {showSearch && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="사용자 검색 (이름 또는 이메일)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              검색
            </Button>
          </div>

          {searchResults.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Admin Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => toggleAdminStatus(user.id, user.isAdmin)}
                        variant={user.isAdmin ? "destructive" : "default"}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
