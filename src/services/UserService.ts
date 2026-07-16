import apiClient from "@/api/apiClient";
import type { UserDto } from "@/types/UserDto";

async function getUsers(): Promise<UserDto[]> {
  const response = await apiClient.get<UserDto[]>(
    "/users",
  );

  return response.data;
}

const UserService = {
  getUsers,
};

export default UserService;