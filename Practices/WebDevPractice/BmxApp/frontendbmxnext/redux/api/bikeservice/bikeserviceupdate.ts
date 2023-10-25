import { useSelector } from "react-redux";
import axios from "axios";

// Update bike
// atributes of bike:
/* ID	Name	Brand	Model	Color	Frame	Fork	Bars	Stem	Grips	Seat	Seatpost	Cranks	Pedals	Sprocket	Front Wheel	Rear Wheel	Front Tire	Rear Tire	Front Hub	Rear Hub	Chain	Pegs */

const useUpdateBike = () => {
  const token = useSelector((state: any) => state.auth.token);

  const updateBike = async (
    id: Number,
    name: string,
    brand: string,
    model: string,
    color: string,
    frame: string,
    fork: string,
    bars: string,
    stem: string,
    grips: string,
    seat: string,
    seatpost: string,
    cranks: string,
    pedals: string,
    sprocket: string,
    frontWheel: string,
    rearWheel: string,
    frontTire: string,
    rearTire: string,
    frontHub: string,
    rearHub: string,
    chain: string,
    pegs: string
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BMX_URL}Bike/${id}`,
        {
          id,
          name,
          brand,
          model,
          color,
          frame,
          fork,
          bars,
          stem,
          grips,
          seat,
          seatpost,
          cranks,
          pedals,
          sprocket,
          frontWheel,
          rearWheel,
          frontTire,
          rearTire,
          frontHub,
          rearHub,
          chain,
          pegs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error update bike");
    }
  };

  return { updateBike };
};

export default useUpdateBike;
