import { LayoutDashboard, Images, Users, FolderTree, BookDown, Settings2 } from 'lucide-react';


export const ADMIN_NAVIGATION = [
    {
        icon: LayoutDashboard,
        label: "Dashboard", href: "/admin"
    },
    {
        icon: Images,
        label: "Hình ảnh", href: "/admin/images"
    },
    {
        icon: FolderTree,
        label: "Danh mục", href: "/admin/categories"
    },
    {
        icon: Users,
        label: "Người dùng", href: "/admin/users"
    },
    {
        icon: BookDown,
        label: "Báo cáo", href: "/admin/reports"
    },
    {
        icon: Settings2,
        label: "Cài đặt", href: "/admin/settings"
    },
];