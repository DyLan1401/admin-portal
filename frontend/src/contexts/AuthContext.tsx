"use client";
import { logout as logoutService } from "@/services/auth.service";
import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { getCurrentUser } from "@/services/auth.service";
import type { AuthUser } from "@/types/authType";
import { useRouter } from "next/navigation";

interface AuthContextValue {
    user: AuthUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        try {
            const response = await getCurrentUser();

            setUser(response.data);
        } catch {
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            await logoutService();
        } finally {
            setUser(null);
            router.replace("/login");
        }
    };

    useEffect(() => {
        const loadCurrentUser = async () => {
            await refreshUser();
            setLoading(false);
        };

        loadCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

