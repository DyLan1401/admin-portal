import SystemStatusCard from "./SystemStatusCard";
import type { SystemStatusItem } from "./types";
interface StatisticGridProps {
    systemStatus: SystemStatusItem[];
}

export default function SystemStatusGrid({
    systemStatus,
}: StatisticGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {systemStatus.map((item) => (
                <SystemStatusCard
                    key={item.id}
                    icon={item.icon}
                    serviceName={item.serviceName}
                    status={item.status}
                />
            ))}
        </div>
    );
}