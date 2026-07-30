import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
    collapsed: boolean;
}
export default function Sidebar({
    collapsed,
}: SidebarProps) {

    return (

        <div
            className="flex h-screen w-64 flex-col border-r bg-white"
        >
            <SidebarHeader />
            <div className="flex-1 overflow-y-auto">
                <SidebarMenu />
            </div>
            <SidebarFooter />
        </div>

    );

}