import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

interface HeaderProps {
    pageTitle: string;
    collapsed: boolean;
    onToggle: () => void;
}

export default function Header({
    pageTitle,
    // collapsed,
    onToggle,
}: HeaderProps) {
    return (
        <header
            className=" flex items-center justify-between border-b bg-white px-6 py-4 "
        >
            <HeaderLeft
                pageTitle={pageTitle}
                // collapsed={collapsed}
                onToggle={onToggle}
            />

            <HeaderRight />
        </header>
    );
}