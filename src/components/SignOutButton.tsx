import { useMutation, useQueryClient } from "react-query";

import { useAppContext } from "../context/AppContext";
import * as UserApi from "../api/UserApi";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(UserApi.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-700 flex items-center px-3 font-semibold bg-white hover:bg-gray-100 cursor-pointer"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;