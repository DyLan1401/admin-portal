import RecentUploadRow from "./RecentUploadRow";
import type { RecentUploadItem } from "./types";

interface RecentUploadTableProps {
    uploads: RecentUploadItem[];
}

export default function RecentUploadTable({
    uploads,
}: RecentUploadTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-b-gray-400 bg-gray-300">
                    <tr className="">
                        <th className="p-2">Thumbnail</th>
                        <th className="p-2">Title</th>
                        <th className="p-2">Upload Date</th>
                        <th className="p-2">Uploaded By</th>
                    </tr>
                </thead>
                <tbody  >
                    {uploads.map((upload) => (
                        <RecentUploadRow
                            key={upload.id}
                            upload={upload}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}