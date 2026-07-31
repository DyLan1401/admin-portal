import { LucideIcon } from "lucide-react";

export interface StatisticCardProps {
    icon: LucideIcon;
    title: string;
    value: number;
}

export interface StatisticItem {
    id: string;
    title: string;
    value: number;
    icon: LucideIcon;
}