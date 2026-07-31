import DashboardSection from "./DashboardSection";
import StatisticSection from "./statistics/StatisticSection";
import SystemStatusSection from "./systemStatus/SystemStatusSection";
import RecentUploadSection from "./recentUploads/RecentUploadSection";
export default function DashboardLayout() {
    return (
        <div className="space-y-6">
            <DashboardSection title="Statistics">
                <StatisticSection />
            </DashboardSection>

            <DashboardSection title="Recent Uploads">
                <RecentUploadSection />
            </DashboardSection>

            <DashboardSection title="System Status">
                <SystemStatusSection />
            </DashboardSection>
        </div>
    );
}