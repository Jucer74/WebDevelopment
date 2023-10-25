import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

// Delete user
const useDeleteUser = () => {
  const token = useSelector((state: any) => state.auth.token);

  const deleteUser = async (id: Number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BMX_URL}User/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error delete user");
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
