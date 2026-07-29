import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Sidebar bên trái */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <Sidebar />
            </aside>

            {/* 2. Phần nội dung bên phải */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <MainContent >
                    {children}
                </MainContent>
            </div>
        </div>
    );
}
