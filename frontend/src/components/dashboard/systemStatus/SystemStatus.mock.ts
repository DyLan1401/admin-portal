import { Database, Cloud, Server } from "lucide-react";
import type { SystemStatusItem } from "./types";

export const systemStatusMock: SystemStatusItem[] = [
    {
        id: "database",
        serviceName: "Database",
        status: "online",
        icon: Database,
    },
    {
        id: "cloudinary",
        serviceName: "Cloudinary",
        status: "online",
        icon: Cloud,
    },
    {
        id: "api-server",
        serviceName: "API Server",
        status: "offline",
        icon: Server,
    },
]