import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setErrorId, setError } from "@/redux/features/errorauthorization";
import axios from "axios";

// Get all bikes
const useGetAllBikes = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BMX_URL}Bike`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // set bikes
        setBikes(response.data);
        // set error to default
        dispatch(setErrorId(0));
        dispatch(setError(""));
        
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          dispatch(setErrorId(err.response.status));
          dispatch(setError("Unauthorized access."));
        } else {
          // Other errors
          console.error("Error to get bikes:", err.message);
        }
      }
    };

    fetchData();
  }, [dispatch, token]);

  return bikes;
};

export default useGetAllBikes;
