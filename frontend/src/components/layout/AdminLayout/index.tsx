"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION } from "@/constants/navigation";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const currentPage = ADMIN_NAVIGATION.find(
        (item) => item.href === pathname
    );

    const pageTitle = currentPage?.label ?? "Admin";
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Sidebar bên trái */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <Sidebar collapsed={collapsed} />
            </aside>

            {/* 2. Phần nội dung bên phải */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    pageTitle={pageTitle}
                    // collapsed={collapsed}
                    onToggle={toggleSidebar}
                />
                <MainContent >
                    {children}
                </MainContent>
            </div>
        </div>
    );
}
