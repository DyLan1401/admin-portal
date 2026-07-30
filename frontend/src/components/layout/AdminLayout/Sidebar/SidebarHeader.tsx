export default function SidebarHeader() {
    return (
        <div className="flex items-center gap-3 border-b p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                Logo
            </div>
            <div>
                <h2 className="font-semibold">Admin Portal</h2>
                <p className="text-xs text-gray-500">
                    Management System
                </p>
            </div>
        </div>
    );
}