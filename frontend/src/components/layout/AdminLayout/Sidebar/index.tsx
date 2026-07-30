import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";


export default function Sidebar() {

    return (

        <aside
            className="flex h-screen w-64 flex-col border-r bg-white"
        >

            <SidebarHeader />

            <div className="flex-1 overflow-y-auto">

                <SidebarMenu />

            </div>

            <SidebarFooter />

        </aside>

    );

}