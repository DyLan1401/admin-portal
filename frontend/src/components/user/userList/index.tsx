"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/user.service";
import UserToolbar from "./userToolbar";
import type { User, Pagination, UserStatus } from "@/types/user.type";
import UserTable from "./userTable";
import UserPagination from "./userPagination";

export default function UserList() {

    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 20,
        total: 0,
        total_pages: 0,
    });

    const [search, setSearch] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [status, setStatus] = useState<UserStatus | "">("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await getUsers(
                    pagination.page,
                    pagination.limit,
                    searchKeyword,
                    status || undefined
                );

                setUsers(result.data);
                setPagination(result.pagination);
            } catch {
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [
        pagination.page,
        pagination.limit,
        searchKeyword,
        status,
    ]);


    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <UserToolbar
                search={search}
                status={status}
                onSearchChange={setSearch}
                onSearch={() => setSearchKeyword(search)}
                onStatusChange={setStatus}
                onReset={() => {
                    setSearch("");
                    setSearchKeyword("");
                    setStatus("");

                    setPagination((prev) => ({
                        ...prev,
                        page: 1,
                    }));
                }}
            />


            {users.length === 0 ? (
                <div>
                    No users found.
                </div>
            ) : (
                <UserTable users={users} />
            )}


            <UserPagination
                pagination={pagination}
                onPageChange={(page) => {
                    setPagination((prev) => ({
                        ...prev,
                        page,
                    }));
                }}
                onLimitChange={(limit) => {
                    setPagination((prev) => ({
                        ...prev,
                        page: 1,
                        limit,
                    }));
                }}
            />
        </div>
    );
}