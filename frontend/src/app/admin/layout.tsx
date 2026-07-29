export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <h1>Admin Portal</h1>
            <main>{children}</main>
        </>
    );
}