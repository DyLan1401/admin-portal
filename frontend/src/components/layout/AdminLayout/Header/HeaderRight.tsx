"use client";

import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

export default function HeaderRight() {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
                <div className='text-md text-black'>{user.fullname}</div>
                <p className="text-sm text-gray-600">
                    {user.email}
                </p>

                <p className="text-xs text-gray-500">
                    {user.role}
                </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {user.email.charAt(0).toUpperCase()}
            </div>

            <button
                type="button"
                onClick={logout}
                aria-label="Đăng xuất"
                title="Đăng xuất"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
            >
                <LogOut aria-hidden="true" className="h-4 w-4" />
            </button>
        </div >
    );
}
