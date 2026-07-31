interface SidebarFooterProps {
    collapsed: boolean;
}


export default function SidebarFooter({ collapsed }: SidebarFooterProps) {
    console.log(collapsed);
    return (
        <div className="border-t p-4">
            <p className="text-xs text-gray-400">
                Version 1.0.0
            </p>
        </div>

    );

}