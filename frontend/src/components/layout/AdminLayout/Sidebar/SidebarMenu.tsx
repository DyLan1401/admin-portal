"use client";

import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION } from "@/constants/navigation";
import SidebarItem from "./SidebarItem";
interface SidebarMenuProps {
    collapsed: boolean;
    onCloseMobileMenu: () => void;

}

export default function SidebarMenu({ collapsed, onCloseMobileMenu }: SidebarMenuProps) {

    const pathname = usePathname();

    return (

        <nav className="flex flex-col gap-2 p-4">
            {ADMIN_NAVIGATION.map((item) => (
                <SidebarItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={pathname === item.href}
                    collapsed={collapsed}
                    onCloseMobileMenu={onCloseMobileMenu}
                />
            ))}

        </nav>
    );
}