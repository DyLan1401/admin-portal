"use client";

import type { UserStatus } from "@/types/userType";

interface ConfirmStatusDialogProps {
    open: boolean;
    currentStatus: UserStatus;
    newStatus: UserStatus;
    updating: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmStatusDialog({
    open,
    currentStatus,
    newStatus,
    updating,
    onCancel,
    onConfirm,
}: ConfirmStatusDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-semibold text-gray-900">
                    Confirm Status Change
                </h2>

                <p className="mt-3 text-sm text-gray-600">
                    Are you sure you want to change this
                    user status from{" "}
                    <span className="font-medium">
                        {currentStatus}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                        {newStatus}
                    </span>
                    ?
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={updating}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={updating}
                        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        {updating ? "Updating..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}