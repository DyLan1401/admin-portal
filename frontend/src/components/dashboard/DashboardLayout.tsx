import DashboardSection from "./DashboardSection";
import StatisticSection from "./statistics/StatisticSection";

export default function DashboardLayout() {
    return (
        <div className="space-y-6">
            <DashboardSection title="Statistics">
                <StatisticSection />
            </DashboardSection>

            <DashboardSection title="Recent Uploads">
                Coming soon...
            </DashboardSection>

            <DashboardSection title="System Status">
                Coming soon...
            </DashboardSection>
        </div>
    );
}