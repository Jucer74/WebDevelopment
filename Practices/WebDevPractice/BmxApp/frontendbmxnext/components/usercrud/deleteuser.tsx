"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useDeleteUser from "@/redux/api/userservice/userservicedelete";

// DeleteUser page
export default function DeleteUser() {
  // Manage state
  const [id, setId] = useState(0);

  // Get router
  const router = useRouter();

  // Get user from store redux
  const usersRedux = useSelector((state: any) => state.listuser.listUsers);

  // Get user from query
  const userRedux = usersRedux.find((user: any) => user.id === id);

  // Handle to user page
  const handleUserPage = () => {
    router.push("/user");
  };

  // Delete user
  const { deleteUser } = useDeleteUser();

  // Handle submit
  const handleSubmitDelete = async () => {
    // Delete user
    await deleteUser(id);

    // Redirect
    router.push("/user");
  };

  // Set user id
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
              Are you sure you want to delete the user?
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
                onClick={() => handleUserPage()}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
