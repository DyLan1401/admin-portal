export default function HeaderRight() {
    return (
        <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
                <p className="text-sm font-medium text-gray-900">
                    Admin
                </p>
                <p className="text-xs text-gray-500">
                    Administrator
                </p>
            </div>
            <div
                className=" flex h-10 w-10 item justify-center rounded-full bg-blue-600 text-white font-semibold
                "
            >

            </div>
        </div>
    );
}