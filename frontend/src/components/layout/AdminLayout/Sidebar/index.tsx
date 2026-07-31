import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    onCollapse: () => void;
    onCloseMobileMenu: () => void
}
export default function Sidebar({
    collapsed,
    mobileOpen,
    onCollapse,
    onCloseMobileMenu
}: SidebarProps) {



    return (
        <aside
            className={`flex h-screen flex-col
                border-r bg-white
                transition-all duration-300
                fixed inset-y-0 left-0 z-40 md:relative shadow-lg
                ${collapsed ? "w-25" : "w-64"}
                ${mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"}

`}
        >
            <SidebarHeader
                collapsed={collapsed}
                onCollapse={onCollapse}
            />
            <div className="flex-1 overflow-y-auto">
                <SidebarMenu
                    collapsed={collapsed}
                    onCloseMobileMenu={onCloseMobileMenu}
                />
            </div>
            <SidebarFooter
                collapsed={collapsed}
            />
        </aside>

    );

}