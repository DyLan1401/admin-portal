import StatisticCard from "./StatisticCard";
import type { StatisticItem } from "./types";
interface StatisticGridProps {
    statistics: StatisticItem[];
}

export default function StatisticGrid({
    statistics,
}: StatisticGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {statistics.map((item) => (
                <StatisticCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                />
            ))}
        </div>
    );
}