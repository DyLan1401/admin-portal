import StatisticGrid from "./StatisticGrid";
import { statisticsMock } from "./statisticsMock";

export default function StatisticSection() {
    return (
        <StatisticGrid
            statistics={statisticsMock}
        />
    );
}