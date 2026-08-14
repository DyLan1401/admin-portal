/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import UserDetailCard from "../components/user/userDetail/UserDetailCard";
import { updateUserStatus } from "@/services/userSerivce";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock("@/services/userSerivce", () => ({
  updateUserStatus: vi.fn(),
}));

const user = {
  id: 12,
  avatar: "",
  full_name: "Lan Nguyen",
  email: "lan@example.com",
  phone: null,
  role: "USER" as const,
  status: "ACTIVE" as const,
  created_at: "2026-01-01T00:00:00.000Z",
};

afterEach(cleanup);

describe("UserDetailCard", () => {

  // Kiểm tra khi hủy thay đổi:
  // - Status được trả về giá trị ban đầu
  // - Modal xác nhận được đóng
  it("restores the original status when the change is cancelled", () => {
    render(<UserDetailCard user={user} onUpdateSuccess={vi.fn()} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "LOCKED" } });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe("ACTIVE");
    expect(screen.queryByText("Confirm Status Change")).toBeNull();
  });

  // Kiểm tra luồng cập nhật status thành công:
  // - Gọi API với đúng user ID và status
  // - Refresh lại dữ liệu user
  // - Hiển thị thông báo thành công
  it("updates the status and refreshes the user after confirmation", async () => {
    vi.mocked(updateUserStatus).mockResolvedValueOnce({ success: true, message: "Updated", data: user });
    const onUpdateSuccess = vi.fn().mockResolvedValue(undefined);
    render(<UserDetailCard user={user} onUpdateSuccess={onUpdateSuccess} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "LOCKED" } });
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

    await waitFor(() => expect(updateUserStatus).toHaveBeenCalledWith(12, "LOCKED"));
    await waitFor(() => expect(onUpdateSuccess).toHaveBeenCalledOnce());
    expect(screen.getByText("User status updated successfully.")).toBeTruthy();
  });
});
