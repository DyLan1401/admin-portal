"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION } from "@/constants/navigation";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import Overlay from "./Sidebar/Overlay";
interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();


    const currentPage = ADMIN_NAVIGATION.find(
        (item) => item.href === pathname
    );

    const pageTitle = currentPage?.label ?? "Admin";

    const handleCollapse = () => {
        setCollapsed((prev) => !prev);
    };

    const handleOpenMobileMenu = () => {
        setMobileOpen(true);
    };

    const handleCloseMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Sidebar bên trái */}
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onCollapse={handleCollapse}
                onCloseMobileMenu={handleCloseMobileMenu}
            />

            <Overlay
                open={mobileOpen}
                onClose={handleCloseMobileMenu}

            />
            {/* 2. Phần nội dung bên phải */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    pageTitle={pageTitle}
                    onOpenMenu={handleOpenMobileMenu}
                />
                <MainContent
                    pageTitle={pageTitle}
                >
                    {children}
                </MainContent>
            </div>
        </div>
    );
}
