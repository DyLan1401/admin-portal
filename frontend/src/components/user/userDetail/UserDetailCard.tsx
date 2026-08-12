"use client";

import Image from "next/image";
import { useState } from "react";

import type { User, UserStatus } from "@/types/userType";
import { updateUserStatus } from "@/services/userSerivce";
import ConfirmStatusDialog from "./ConfirmStatusDialog";

interface UserDetailCardProps {
    user: User;
    onUpdateSuccess: () => Promise<void>;
}

export default function UserDetailCard({
    user,
    onUpdateSuccess,
}: UserDetailCardProps) {

    const [selectedStatus, setSelectedStatus] = useState<UserStatus>(user.status);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleStatusChange = (
        nextStatus: UserStatus
    ) => {
        setSelectedStatus(nextStatus);
        setError(null);
        setSuccess(null);

        if (nextStatus !== user.status) {
            setIsDialogOpen(true);
        }
    };

    const handleCancel = () => {
        setSelectedStatus(user.status);
        setIsDialogOpen(false);
        setError(null);
        setSuccess(null);
    };

    const handleConfirm = async () => {
        try {
            setUpdating(true);
            setError(null);
            setSuccess(null);

            await updateUserStatus(
                user.id,
                selectedStatus
            );

            await onUpdateSuccess();

            setIsDialogOpen(false);
            setSuccess(
                "User status updated successfully."
            );
        } catch {
            setSelectedStatus(user.status);

            setError(
                "Failed to update user status."
            );
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">
            {/*  */}
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
                        {user.full_name
                            .charAt(0)
                            .toUpperCase()}
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

            {/* User Information */}
            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2">
                {/* Role */}
                <div>
                    <p className="text-sm text-gray-500">
                        Role
                    </p>
                    <p className="font-medium">
                        {user.role}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <p className="text-sm text-gray-500">
                        Status
                    </p>

                    <select
                        value={selectedStatus}
                        disabled={updating}
                        onChange={(event) =>
                            handleStatusChange(
                                event.target
                                    .value as UserStatus
                            )
                        }
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                        <option value="LOCKED">
                            Locked
                        </option>
                    </select>

                    {success && (
                        <p className="mt-1 text-sm text-green-600">
                            {success}
                        </p>
                    )}
                    {error && (
                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <p className="text-sm text-gray-500">
                        Phone
                    </p>

                    <p className="font-medium">
                        {user.phone || "N/A"}
                    </p>
                </div>

                {/* Created At */}
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

                {/* Updated At */}
                <div>
                    <p className="text-sm text-gray-500">
                        Updated At
                    </p>

                    <p className="font-medium">
                        {user.updated_at
                            ? new Date(
                                user.updated_at
                            ).toLocaleDateString(
                                "vi-VN"
                            )
                            : "N/A"}
                    </p>
                </div>
            </div>

            {/* Confirm Dialog */}
            <ConfirmStatusDialog
                open={isDialogOpen}
                currentStatus={user.status}
                newStatus={selectedStatus}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
}