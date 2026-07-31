import type { StatisticCardProps } from "./types";

export default function StatisticCard
    ({ icon: Icon, title, value }: StatisticCardProps) {
    return (
        <article className="rounded-lg border p-5 hover:bg-gray-100 transition-colors ">
            <header className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-500">{title}</span>
            </header>

            <p className="mt-4 text-3xl font-bold  tracking-tight">
                {value}
            </p>
        </article>
    )
}