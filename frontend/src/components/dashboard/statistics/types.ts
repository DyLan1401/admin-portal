import type { LucideIcon } from "lucide-react";

export interface StatisticCardProps {
    icon: LucideIcon;
    title: string;
    value: number;
}

export interface StatisticItem extends StatisticCardProps {
    id: string;

}