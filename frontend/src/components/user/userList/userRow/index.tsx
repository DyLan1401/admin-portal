"use client";

import Image from "next/image";
import type { User } from "@/types/userType";
import { useRouter } from "next/navigation";

interface UserRowProps {
    user: User;
}

export default function UserRow({ user }: UserRowProps) {
    const router = useRouter();

    return (
        <tr className="text-center transition-colors hover:bg-gray-50">
            <td className="px-4 py-3 font-medium text-gray-900">
                {user.id}
            </td>
            {/* Avatar */}
            <td className="px-4 py-3">
                {user.avatar ? (
                    <Image
                        src={user.avatar}
                        alt={user.full_name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-500">
                        {user.full_name.charAt(0).toUpperCase()}
                    </div>
                )}
            </td>


            <td className="px-4 py-3 font-medium text-gray-900">
                {user.full_name}
            </td>

            <td className="px-4 py-3 text-gray-500">
                {user.email}
            </td>

            <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                    {user.role}
                </span>
            </td>

            <td className="px-4 py-3">
                {user.status === "ACTIVE" && (
                    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                        Active
                    </span>
                )}

                {user.status === "INACTIVE" && (
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                        Inactive
                    </span>
                )}

                {user.status === "LOCKED" && (
                    <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                        Locked
                    </span>
                )}
            </td>

            <td className="px-4 py-3 text-gray-500">
                {new Date(user.created_at).toLocaleDateString("vi-VN")}
            </td>

            <td className="px-4 py-3 text-right">
                <button
                    type="button"
                    onClick={() =>
                        router.push(`/admin/users/${user.id}`)
                    }
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                    View
                </button>
            </td>
        </tr>
    );
}