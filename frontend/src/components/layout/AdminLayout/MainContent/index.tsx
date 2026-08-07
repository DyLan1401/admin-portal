import Breadcrumb from "@/components/navigation/Breadcrumb";

interface MainContentProps {

    children: React.ReactNode;

    pageTitle: string;

}
export default function MainContent({
    children,
    pageTitle,
}: MainContentProps) {
    return (
        <main
            className="flex-1 overflow-y-auto p-6">
            <section className="mb-6">
                <Breadcrumb />
                <h1 className="mt-2  text-3xl font-bold">
                    {pageTitle}
                </h1>
                <hr className="my-6 border-gray-200" />
            </section>

            <section>
                {children}
            </section>
        </main>
    );

}
