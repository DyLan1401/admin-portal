interface BreadcrumbProps {
    pageTitle: string;
}
export default function Breadcrumb({
    pageTitle,
}: BreadcrumbProps) {
    return (
        <nav
            className="flex items-center gap-2 text-sm text-gray-500"
            aria-label="breadcrumb">
            <span>Admin</span>
            <span>/</span>
            <span
                aria-current="page">
                {pageTitle}
            </span>
        </nav>
    )
}