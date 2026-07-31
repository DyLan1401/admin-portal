import Image from "next/image";
import type { RecentUploadItem } from "./types";

interface RecentUploadRowProps {
    upload: RecentUploadItem;
}

export default function RecentUploadRow({
    upload,
}: RecentUploadRowProps) {
    return (
        <tr className="text-center border-b border-b-gray-400 hover:bg-gray-100 transition-colors">
            <td className="py-2">
                <div className="relative h-12 w-12 mx-auto overflow-hidden rounded-md ">
                    <Image
                        src={upload.thumbnail}
                        alt={upload.title}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                    />
                </div>
            </td>
            <td className="p-2">{upload.title}</td>
            <td className="p-2">{upload.uploadedAt}</td>
            <td className="p-2">{upload.uploadedBy}</td>

        </tr>
    );
}