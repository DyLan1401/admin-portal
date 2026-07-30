"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATION } from "@/constants/navigation";


export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="py-4 flex flex-col h-full text-center overflow-auto">
            <div className="text-2xl font-bold text-blue-600 mb-8 px-2">Quản trị</div>
            <div className="border"></div>
            <nav className="space-y-1 ">
                {ADMIN_NAVIGATION.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >

                        <item.icon size={25} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
