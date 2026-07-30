import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    active: boolean;
    collapsed: boolean;
    onCloseMobileMenu: () => void
}

export default function SidebarItem({
    label,
    href,
    icon: Icon,
    active,
    collapsed,
    onCloseMobileMenu
}: SidebarItemProps) {
    return (
        <Link
            href={href}
            onClick={onCloseMobileMenu}
            className={`
                flex items-center gap-3 rounded-lg px-3 py-2 transition-colors
                border-t border-gray-200 

                ${active
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
            `}
        >
            <Icon size={22} />

            <span
                className={`${collapsed ? "hidden" : "block"}`}
            >{label}</span>
        </Link>
    );
}