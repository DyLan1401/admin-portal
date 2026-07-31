import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

interface HeaderProps {
    pageTitle: string;
    onOpenMenu: () => void;
}

export default function Header({
    pageTitle,
    onOpenMenu,
}: HeaderProps) {
    return (
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
            <HeaderLeft
                pageTitle={pageTitle}
                onOpenMenu={onOpenMenu}
            />

            <HeaderRight />
        </header>
    );
}