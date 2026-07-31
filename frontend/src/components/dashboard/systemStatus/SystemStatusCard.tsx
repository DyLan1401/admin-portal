import type { SystemStatusCardProps } from "./types";

export default function SystemStatusCard
    ({ icon: Icon, serviceName, status }: SystemStatusCardProps) {
    return (
        <article className="rounded-lg border p-5 hover:bg-gray-100 transition-colors ">
            <header className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-500">{serviceName}</span>
            </header>

            <p className="mt-4 text-lg font-bold  tracking-tight">
                <span
                    className={
                        status === "online"
                            ? "text-green-700"
                            : "text-red-700"
                    }>
                    {status}</span>
            </p>
        </article>
    )
}