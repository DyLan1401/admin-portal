import { Menu } from "lucide-react";

interface HeaderLeftProps {
    pageTitle: string;
    // collapsed: boolean;
    onToggle: () => void;
}

export default function HeaderLeft({
    pageTitle,
    // collapsed,
    onToggle,
}: HeaderLeftProps) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onToggle}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
                <Menu size={20} />
            </button>

            <h1 className="text-xl font-semibold">
                {pageTitle}
            </h1>
        </div>
    );
}