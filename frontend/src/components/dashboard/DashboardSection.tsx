interface DashboardSectionProps {
    title: string;
    children: React.ReactNode;
}


export default function DashboardSection({
    title,
    children,
}: DashboardSectionProps) {
    return (
        <section className="rounded-lg bg-white shadow-sm p-6">
            <header>
                <h2>{title}</h2>
            </header>

            <div className="mt-6">
                {children}
            </div>
        </section>
    )
}
