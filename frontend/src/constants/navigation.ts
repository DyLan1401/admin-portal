import { LayoutDashboard, Images, Users, FolderTree, BookDown, Settings2 } from 'lucide-react';


export const ADMIN_NAVIGATION = [
    {
        icon: LayoutDashboard,
        label: "Dashboard", path: "/admin"
    },
    {
        icon: Images,
        label: "Hình ảnh", path: "/admin/images"
    },
    {
        icon: FolderTree,
        label: "Danh mục", path: "/admin/categories"
    },
    {
        icon: Users,
        label: "Người dùng", path: "/admin/users"
    },
    {
        icon: BookDown,
        label: "Báo cáo", path: "/admin/reports"
    },
    {
        icon: Settings2,
        label: "Cài đặt", path: "/admin/settings"
    },
];