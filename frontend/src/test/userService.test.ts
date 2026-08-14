import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "@/lib/axios";
import { getUserById, getUsers, updateUserStatus } from "../services/userSerivce";

vi.mock("@/lib/axios", () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

const mockedApi = vi.mocked(api);

describe("user service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  // Kiểm tra service lấy danh sách user với pagination, search và status filter
  it("requests a filtered page of users", async () => {

    const payload = { data: [], pagination: { page: 1, limit: 20, total: 0, total_pages: 0 } };
    vi.mocked(mockedApi.get).mockResolvedValueOnce({ data: payload });

    await expect(getUsers(1, 20, "lan", "ACTIVE")).resolves.toEqual(payload);
    expect(mockedApi.get).toHaveBeenCalledWith("/api/admin/users", {
      params: { page: 1, limit: 20, search: "lan", status: "ACTIVE" },
    });
  });

  // Kiểm tra service lấy thông tin chi tiết user theo ID
  it("requests a user detail by id", async () => {

    const payload = { success: true, message: "OK", data: { id: 12 } };
    vi.mocked(mockedApi.get).mockResolvedValueOnce({ data: payload });

    await expect(getUserById(12)).resolves.toEqual(payload);
    expect(mockedApi.get).toHaveBeenCalledWith("/api/admin/users/12");
  });

  // Kiểm tra service cập nhật status của user bằng PATCH request
  it("patches only the selected status", async () => {
    const payload = { success: true, message: "Updated", data: { id: 12 } };
    vi.mocked(mockedApi.patch).mockResolvedValueOnce({ data: payload });

    await expect(updateUserStatus(12, "LOCKED")).resolves.toEqual(payload);
    expect(mockedApi.patch).toHaveBeenCalledWith("/api/admin/users/12/status", { status: "LOCKED" });
  });
});
