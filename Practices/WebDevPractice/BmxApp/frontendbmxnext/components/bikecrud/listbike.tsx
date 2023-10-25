"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setListBikes } from "@/redux/features/listbike";
import useGetAllBikes from "@/redux/api/bikeservice/bikeservicelist";
import ErrorAuthorization from "../errors/errorauthorization";

export default function ListBike() {
  // Manage state error authorization
  const [errorId, setIdError] = useState("");
  const [error, setError] = useState("");

  // Get error authorization from store redux
  const errorRedux = useSelector((state: any) => state.authorization);

  // Get bikes from store redux
  const bikesRedux = useSelector((state: any) => state.listbike.listBikes);

  // Get router
  const router = useRouter();

  // Get dispatch
  const dispatch = useDispatch();

  // Get all bikes
  const getAllBikes = useGetAllBikes();

  // Set bikes from getAllBikes
  useEffect(() => {
    dispatch(setListBikes(getAllBikes));
  }, [dispatch, getAllBikes]);

  // Set error authorization
  useEffect(() => {
    if (errorRedux && errorRedux.errorId && errorRedux.error) {
      setIdError(errorRedux.errorId);
      setError(errorRedux.error);
    }
  }, [errorRedux]);

  // Handle error authorization
  if (errorRedux && errorRedux.errorId && errorRedux.error) {
    return (
      <div>
        <ErrorAuthorization id={errorId} error={error} />
      </div>
    );
  }

  // Handle Create
  const handleCreate = () => {
    // Redirect to create bike
    router.push("/bike/create");
  };

  // Handle handleUpdate
  const handleUpdate = (bike: any) => {
    // Redirect to update bike
    router.push(`/bike/update?id=${bike.id}`);
  };

  // Handle Details
  const handleDetails = (bike: any) => {
    // Redirect to update bike
    router.push(`/bike/detail?id=${bike.id}`);
  };

  // Handle Delete
  const handleDelete = (bike: any) => {
    // Redirect to delete bike
    router.push(`/bike/delete?id=${bike.id}`);
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-center m-2 p-1">List Bikes</h1>
      <div className="card shadow-lg compact side bg-base-100">
        <div className="card-body overflow-x-auto">
          <button
            className="btn bg-green-950 rounded m-1 p-1 w-20"
            onClick={() => handleCreate()}
          >
            Create
          </button>
          <table className="table">
            <thead>
              <tr className="bg-neutral">
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Color</th>
                <th>Frame</th>
                <th>Fork</th>
                <th>Bars</th>
                <th>Stem</th>
                <th>Grips</th>
                <th>Seat</th>
                <th>Seatpost</th>
                <th>Cranks</th>
                <th>Pedals</th>
                <th>Sprocket</th>
                <th>Front Wheel</th>
                <th>Rear Wheel</th>
                <th>Front Tire</th>
                <th>Rear Tire</th>
                <th>Front Hub</th>
                <th>Rear Hub</th>
                <th>Chain</th>
                <th>Pegs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bikesRedux?.map((bike: any) => (
                <tr key={bike.id}>
                  <td>{bike.id}</td>
                  <td>{bike.name}</td>
                  <td>{bike.brand}</td>
                  <td>{bike.model}</td>
                  <td>{bike.color}</td>
                  <td>{bike.frame}</td>
                  <td>{bike.fork}</td>
                  <td>{bike.bars}</td>
                  <td>{bike.stem}</td>
                  <td>{bike.grips}</td>
                  <td>{bike.seat}</td>
                  <td>{bike.seatPost}</td>
                  <td>{bike.cranks}</td>
                  <td>{bike.pedals}</td>
                  <td>{bike.sprocket}</td>
                  <td>{bike.frontWheel}</td>
                  <td>{bike.rearWheel}</td>
                  <td>{bike.frontTire}</td>
                  <td>{bike.rearTire}</td>
                  <td>{bike.frontHub}</td>
                  <td>{bike.rearHub}</td>
                  <td>{bike.chain}</td>
                  <td>{bike.pegs}</td>
                  <td>
                    <button
                      className="btn btn-primary rounded m-1 p-1 w-20"
                      onClick={() => handleUpdate(bike)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary rounded m-1 p-1 w-20"
                      onClick={() => handleDetails(bike)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-accent rounded m-1 p-1 w-20"
                      onClick={() => handleDelete(bike)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
