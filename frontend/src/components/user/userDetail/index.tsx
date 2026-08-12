"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getUserById } from "@/services/userSerivce";
import type { User } from "@/types/userType";
import UserDetailCard from "./UserDetailCard";
import UserStatusAction from "./UserStatusAction";
export default function UserDetail() {
    const params = useParams();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateSuccess = async () => {
        const userId = Number(params.id);

        const result = await getUserById(userId);

        setUser(result.data);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const userId = Number(params.id);

                if (!Number.isInteger(userId) || userId <= 0) {
                    setError("Invalid user id.");
                    return;
                }

                const result = await getUserById(userId);

                setUser(result.data);
            } catch {
                setError("User not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [params.id]);


    if (loading) {
        return <div>Loading user...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div >
            <div >
                <UserDetailCard user={user} />

            </div>
            <div className="mt-4">
                <UserStatusAction
                    userId={user.id}
                    status={user.status}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => router.push("/admin/users")}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:duration-300"
                >
                    ← Back to Users
                </button>
            </div>
        </div>
    );
}