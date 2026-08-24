"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayoutComponent from "@/components/layout/AdminLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
function ProtectedAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <AdminLayoutComponent>
            {children}
        </AdminLayoutComponent>
    );
}

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <ProtectedAdminLayout>
                {children}
            </ProtectedAdminLayout>
        </AuthProvider>
    );
}