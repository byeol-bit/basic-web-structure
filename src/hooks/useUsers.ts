import { useQuery } from "@tanstack/react-query";

import UserService from "@/services/UserService";

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: UserService.getUsers,

    retry: false,
  });
}

export default useUsers;