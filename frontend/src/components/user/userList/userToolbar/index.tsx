import type { UserStatus } from "@/types/userType";

interface UserToolbarProps {
    search: string;
    status: UserStatus | "";
    onSearchChange: (value: string) => void;
    onSearch: () => void;
    onStatusChange: (status: UserStatus | "") => void;
    onReset: () => void;
}

export default function UserToolbar({
    search,
    status,
    onSearchChange,
    onSearch,
    onStatusChange,
    onReset,
}: UserToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex">
                <input
                    type="text"
                    value={search}
                    placeholder="Search by name or email..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-64 rounded-l-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                />

                <button
                    type="button"
                    onClick={onSearch}
                    className="rounded-r-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Search
                </button>
            </div>

            {/* Status Filter */}
            <select
                value={status}
                onChange={(e) =>
                    onStatusChange(
                        e.target.value as UserStatus | ""
                    )
                }
                className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="LOCKED">Locked</option>
            </select>

            {/* Reset */}
            <button
                type="button"
                onClick={onReset}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Reset
            </button>
        </div>
    );
}