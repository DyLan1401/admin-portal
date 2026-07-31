import type { LucideIcon } from "lucide-react";

export type SystemStatus =
    | "online"
    | "offline";

export interface SystemStatusCardProps {
    icon: LucideIcon;
    serviceName: string;
    status: SystemStatus;
}

export interface SystemStatusItem
    extends SystemStatusCardProps {
    id: string;
}