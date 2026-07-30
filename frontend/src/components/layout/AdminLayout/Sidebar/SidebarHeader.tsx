import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarHeaderProps {
    collapsed: boolean;
    onCollapse: () => void;
}

export default function SidebarHeader({
    collapsed,
    onCollapse,
}: SidebarHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b px-4 py-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                    AMS
                </div>

                {!collapsed && (
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Admin Portal
                        </h2>

                        <p className="text-xs text-gray-500">
                            Management System
                        </p>
                    </div>
                )}
            </div>

            {/* Desktop Collapse Button */}
            <button
                type="button"
                onClick={onCollapse}
                className="hidden rounded-lg p-2 transition-colors hover:bg-gray-100 md:flex"
                aria-label={
                    collapsed
                        ? "Expand Sidebar"
                        : "Collapse Sidebar"
                }
            >
                {collapsed ? (
                    <PanelLeftOpen size={20} />
                ) : (
                    <PanelLeftClose size={20} />
                )}
            </button>
        </header>
    );
}