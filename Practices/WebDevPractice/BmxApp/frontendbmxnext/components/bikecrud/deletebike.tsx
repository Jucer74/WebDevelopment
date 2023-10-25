"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDeleteBike from "@/redux/api/bikeservice/bikeservicedelete";

// DeleteBike page
export default function DeleteBike() {
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

  // Delete bike
  const { deleteBike } = useDeleteBike();

  // Handle submit
  const handleSubmitDelete = async () => {
    // Delete bike
    await deleteBike(id);

    // Redirect
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
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex items-center justify-center">
          <div className="card shadow-xl p-8 bg-base-200">
            <h2 className="card-title text-2xl mb-4">
              Are you sure you want to delete the bike?
            </h2>
            <p className="text-2xl text-center text-red-500">
              This action cannot be undone.
            </p>
            <div className="justify-center card-actions mt-6">
              <button
                className="btn bg-red-500 rounded m-1 p-1 w-20 text-white"
                onClick={() => handleSubmitDelete()}
              >
                Delete
              </button>
              <button
                className="btn bg-green-950 rounded m-1 p-1 w-20 text-white"
                onClick={() => handleBikePage()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
