"use client";
import {
    AlertCircle,
    ArrowRight,
    Eye,
    EyeOff,
    LoaderCircle,
    LockKeyhole,
    Mail,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getLoginErrorMessage(error: unknown): string {
    const status = (error as { response?: { status?: number } })?.response?.status;

    if (!status) {
        return "Không thể kết nối đến hệ thống. Vui lòng kiểm tra mạng và thử lại.";
    }

    switch (status) {
        case 400:
            return "Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.";
        case 401:
            return "Email hoặc mật khẩu không chính xác hoặc bạn chưa có xác thực tài khoản";
        case 403:
            return "Tài khoản của bạn không có quyền truy cập Admin Portal.";
        case 429:
            return "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau.";
        default:
            return "Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.";
    }
}

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const normalizedEmail = email.trim();
        if (!normalizedEmail) {
            setError("Email là bắt buộc.");
            return;
        }
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            setError("Định dạng email không hợp lệ.");
            return;
        }
        if (!password) {
            setError("Mật khẩu là bắt buộc.");
            return;
        }

        try {
            setLoading(true);
            const response = await login({ email: normalizedEmail, password });
            if (!response.success) {
                setError("Không thể đăng nhập. Vui lòng thử lại.");
                return;
            }
            router.replace("/admin");
        } catch (error: unknown) {
            setError(getLoginErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-center">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Admin Portal</h1>
                    <p className="mt-1.5 text-sm text-slate-500">Đăng nhập bằng tài khoản quản trị của bạn</p>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <Mail aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={loading}
                                autoComplete="email"
                                placeholder="admin@company.com"
                                aria-invalid={Boolean(error)}
                                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="password">
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={loading}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                aria-invalid={Boolean(error)}
                                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                disabled={loading}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
                            >
                                {showPassword ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? (
                            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
                        ) : (
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        )}
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}