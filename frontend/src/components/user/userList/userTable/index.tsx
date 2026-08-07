import type { User } from "@/types/user.type";
import UserRow from "../userRow";

interface UserTableProps {
    users: User[];
}

export default function UserTable({ users }: UserTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
                <thead className="text-center border-b border-b-gray-400 bg-gray-300 text-xs uppercase text-gray-500">
                    <tr>
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Avatar</th>
                        <th className="px-4 py-3 font-medium">Full Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Created At</th>
                        <th className="px-4 py-3 text-right font-medium">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}