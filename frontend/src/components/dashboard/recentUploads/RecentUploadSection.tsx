import RecentUploadTable from "./RecentUploadTable";
import { recentUploadsMock } from "./recentUploadMock";

export default function RecentUploadSection() {
    return (
        <RecentUploadTable
            uploads={recentUploadsMock}
        />
    );
}