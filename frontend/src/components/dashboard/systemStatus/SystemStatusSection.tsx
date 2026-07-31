import SystemStatusGrid from "./SystemStatusGrid";
import { systemStatusMock } from "./SystemStatus.mock";

export default function SystemStatusSection() {
    return (
        <SystemStatusGrid
            systemStatus={systemStatusMock}
        />
    );
}