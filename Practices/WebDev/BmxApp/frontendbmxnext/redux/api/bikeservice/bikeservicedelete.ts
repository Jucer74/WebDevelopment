import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

// Delete bike
const useDeleteBike = () => {
  const token = useSelector((state: any) => state.auth.token);

  const deleteBike = async (id: Number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BMX_URL}Bike/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error delete bike");
    }
  };

  return { deleteBike };
};

export default useDeleteBike;
