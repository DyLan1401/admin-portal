import { Image, Users, FolderTree } from "lucide-react";
import { StatisticItem } from "./types";

export const statisticsMock: StatisticItem[] =
    [
        {
            id: "images",
            title: "Total Images",
            value: 128,
            icon: Image,
        },
        {
            id: "users",
            title: "Total Users",
            value: 24,
            icon: Users,
        },
        {
            id: "categories",
            title: "Total Categories",
            value: 12,
            icon: FolderTree,
        }
    ]
