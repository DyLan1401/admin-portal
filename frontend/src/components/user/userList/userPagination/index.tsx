import type { Pagination } from "@/types/userType";

interface UserPaginationProps {
    pagination: Pagination;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export default function UserPagination({
    pagination,
    onPageChange,
    onLimitChange,
}: UserPaginationProps) {
    return (
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Total */}
            <p className="text-sm text-gray-500">
                Total users:{" "}
                <span className="font-medium text-gray-900">
                    {pagination.total}
                </span>
            </p>

            <div className="flex items-center gap-2">
                {/* Limit */}
                <select
                    value={pagination.limit}
                    onChange={(e) =>
                        onLimitChange(
                            Number(e.target.value)
                        )
                    }
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                </select>

                {/* Previous */}
                <button
                    type="button"
                    disabled={pagination.page <= 1}
                    onClick={() =>
                        onPageChange(
                            pagination.page - 1
                        )
                    }
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                {/* Current page */}
                <span className="px-2 text-sm text-gray-600">
                    {pagination.page} /{" "}
                    {pagination.total_pages}
                </span>

                {/* Next */}
                <button
                    type="button"
                    disabled={
                        pagination.page >=
                        pagination.total_pages
                    }
                    onClick={() =>
                        onPageChange(
                            pagination.page + 1
                        )
                    }
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}