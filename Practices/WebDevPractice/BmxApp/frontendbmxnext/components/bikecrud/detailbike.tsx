"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// DetailBike page
export default function DetailBike() {
  // Manage state
  const [id, setId] = useState(0);

  // Get router
  const router = useRouter();

  // Get bike from store redux
  const bikesRedux = useSelector((state: any) => state.listbike.listBikes);

  // Get bike from query
  const bikeRedux = bikesRedux.find((bike: any) => bike.id === id);

  // Handle to bike page
  const handleBikePage = () => {
    router.push("/bike");
  };

  // Set bike id
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get("id");
    if (idUrl) {
      setId(Number(idUrl));
    }
  }, []);

  return (
    <>
      {/*
        // atributes of bike:
         ID	Name	Brand	Model	Color	Frame	Fork	Bars	Stem	Grips	Seat	Seatpost	Cranks	Pedals	Sprocket	Front Wheel	Rear Wheel	Front Tire	Rear Tire	Front Hub	Rear Hub	Chain	Pegs 
      */}
      <div className="flex items-center justify-center min-h-screen py-2">
        <div className="w-full sm:max-w-2xl bg-base-200 shadow-md p-8 sm:p-12 rounded-md">
          <h1 className="text-3xl font-bold text-center mb-8">Details Bike</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-neutral">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Brand</th>
                  <th className="px-4 py-2">Model</th>
                  <th className="px-4 py-2">Color</th>
                  <th className="px-4 py-2">Frame</th>
                  <th className="px-4 py-2">Fork</th>
                  <th className="px-4 py-2">Bars</th>
                  <th className="px-4 py-2">Stem</th>
                  <th className="px-4 py-2">Grips</th>
                  <th className="px-4 py-2">Seat</th>
                  <th className="px-4 py-2">Seatpost</th>
                  <th className="px-4 py-2">Cranks</th>
                  <th className="px-4 py-2">Pedals</th>
                  <th className="px-4 py-2">Sprocket</th>
                  <th className="px-4 py-2">Front Wheel</th>
                  <th className="px-4 py-2">Rear Wheel</th>
                  <th className="px-4 py-2">Front Tire</th>
                  <th className="px-4 py-2">Rear Tire</th>
                  <th className="px-4 py-2">Front Hub</th>
                  <th className="px-4 py-2">Rear Hub</th>
                  <th className="px-4 py-2">Chain</th>
                  <th className="px-4 py-2">Pegs</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr key={bikeRedux?.id} className="">
                  <td className="border px-4 py-2">{bikeRedux?.id}</td>
                  <td className="border px-4 py-2">{bikeRedux?.name}</td>
                  <td className="border px-4 py-2">{bikeRedux?.brand}</td>
                  <td className="border px-4 py-2">{bikeRedux?.model}</td>
                  <td className="border px-4 py-2">{bikeRedux?.color}</td>
                  <td className="border px-4 py-2">{bikeRedux?.frame}</td>
                  <td className="border px-4 py-2">{bikeRedux?.fork}</td>
                  <td className="border px-4 py-2">{bikeRedux?.bars}</td>
                  <td className="border px-4 py-2">{bikeRedux?.stem}</td>
                  <td className="border px-4 py-2">{bikeRedux?.grips}</td>
                  <td className="border px-4 py-2">{bikeRedux?.seat}</td>
                  <td className="border px-4 py-2">{bikeRedux?.seatPost}</td>
                  <td className="border px-4 py-2">{bikeRedux?.cranks}</td>
                  <td className="border px-4 py-2">{bikeRedux?.pedals}</td>
                  <td className="border px-4 py-2">{bikeRedux?.sprocket}</td>
                  <td className="border px-4 py-2">{bikeRedux?.frontWheel}</td>
                  <td className="border px-4 py-2">{bikeRedux?.rearWheel}</td>
                  <td className="border px-4 py-2">{bikeRedux?.frontTire}</td>
                  <td className="border px-4 py-2">{bikeRedux?.rearTire}</td>
                  <td className="border px-4 py-2">{bikeRedux?.frontHub}</td>
                  <td className="border px-4 py-2">{bikeRedux?.rearHub}</td>
                  <td className="border px-4 py-2">{bikeRedux?.chain}</td>
                  <td className="border px-4 py-2">{bikeRedux?.pegs}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleBikePage()}
                    >
                      Back
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
