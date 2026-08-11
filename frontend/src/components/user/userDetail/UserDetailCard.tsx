import Image from "next/image";
import type { User } from "@/types/userType";

interface UserDetailCardProps {
    user: User;
}

export default function UserDetailCard({
    user,
}: UserDetailCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-4 border-b pb-6">
                {user.avatar ? (
                    <Image
                        src={user.avatar}
                        alt={user.full_name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-medium text-gray-500">
                        {user.full_name.charAt(0).toUpperCase()}
                    </div>
                )}

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {user.full_name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
                <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{user.role}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{user.status}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">
                        {user.phone || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Created At
                    </p>
                    <p className="font-medium">
                        {new Date(
                            user.created_at
                        ).toLocaleDateString("vi-VN")}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        Updated At
                    </p>
                    <p className="font-medium">
                        {user.updated_at
                            ? new Date(
                                user.updated_at
                            ).toLocaleDateString("vi-VN")
                            : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}