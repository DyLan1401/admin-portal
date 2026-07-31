import StatisticGrid from "./StatisticGrid";
import { statisticsMock } from "./statistics.mock";

export default function StatisticSection() {
    return (
        <StatisticGrid
            statistics={statisticsMock}
        />
    );
}