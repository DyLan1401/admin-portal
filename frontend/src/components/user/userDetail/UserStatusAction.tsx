"use client";

import { useState } from "react";
import type { UserStatus } from "@/types/userType";
import ConfirmStatusDialog from "./ConfirmStatusDialog";
import { updateUserStatus } from "@/services/userSerivce";

interface UserStatusActionProps {
    userId: number;
    status: UserStatus;
    onUpdateSuccess: () => Promise<void>;
}

export default function UserStatusAction({
    userId,
    status,
    onUpdateSuccess,
}: UserStatusActionProps) {
    const [selectedStatus, setSelectedStatus] =
        useState<UserStatus>(status);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStatusChange = (nextStatus: UserStatus) => {
        setSelectedStatus(nextStatus);

        if (nextStatus !== status) {
            setIsDialogOpen(true);
        }
    };

    const handleCancel = () => {
        setSelectedStatus(status);
        setIsDialogOpen(false);
    };

    const handleConfirm = async () => {
        try {
            setUpdating(true);
            setError(null);
            await updateUserStatus(userId, selectedStatus);

            await onUpdateSuccess();

            setIsDialogOpen(false);
        } catch {
            setSelectedStatus(status);
            setError("Failed to update user status.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-base font-semibold text-gray-900">
                    User Status
                </h3>

                <div className="mt-4 flex items-center gap-3">
                    <select
                        value={selectedStatus}
                        disabled={updating}
                        onChange={(event) =>
                            handleStatusChange(
                                event.target.value as UserStatus
                            )
                        }
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="LOCKED">Locked</option>
                    </select>
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>

            <ConfirmStatusDialog
                open={isDialogOpen}
                currentStatus={status}
                newStatus={selectedStatus}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
}