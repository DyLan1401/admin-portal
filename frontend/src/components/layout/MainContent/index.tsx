interface MainContentProps {
    children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
    return <main className="flex-1 overflow-y-auto p-2">{children}</main>;
}