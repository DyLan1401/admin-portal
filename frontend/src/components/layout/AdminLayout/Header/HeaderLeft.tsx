import { Menu } from "lucide-react";

interface HeaderLeftProps {
    pageTitle: string;
    onOpenMenu: () => void;
}

export default function HeaderLeft({
    pageTitle,
    onOpenMenu,
}: HeaderLeftProps) {
    return (
        <div className="flex items-center gap-4 ">
            <button
                type="button"
                onClick={onOpenMenu}
                className=" md:hidden mr-3 rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
                <Menu size={20} />
            </button>

            <h1 className="text-xl font-semibold">
                {pageTitle}
            </h1>
        </div>
    );
}