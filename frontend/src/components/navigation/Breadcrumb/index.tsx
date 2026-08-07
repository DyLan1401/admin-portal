"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbItems = segments.map((segment, index) => {
        // /admin
        if (segment === "admin") {
            return "Admin";
        }

        // /admin/users
        if (segment === "users") {
            return "Users";
        }

        // /admin/users/:id
        if (
            segments[index - 1] === "users" &&
            !Number.isNaN(Number(segment))
        ) {
            return "User Detail";
        }

        return segment;
    });

    return (
        <nav
            className="flex items-center gap-2 text-sm text-gray-500"
            aria-label="breadcrumb"
        >
            {breadcrumbItems.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2"
                >
                    {index > 0 && <span>/</span>}

                    <span
                        aria-current={
                            index === breadcrumbItems.length - 1
                                ? "page"
                                : undefined
                        }
                    >
                        {item}
                    </span>
                </div>
            ))}
        </nav>
    );
}