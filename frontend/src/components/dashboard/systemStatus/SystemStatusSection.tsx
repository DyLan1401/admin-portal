import SystemStatusGrid from "./SystemStatusGrid";
import { systemStatusMock } from "./SystemStatusMock";

export default function SystemStatusSection() {
    return (
        <SystemStatusGrid
            systemStatus={systemStatusMock}
        />
    );
}