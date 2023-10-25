"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// DetailsUser page
export default function DetailsUser() {
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
      <div className="flex items-center justify-center min-h-screen py-2">
        <div className="w-full sm:max-w-2xl bg-base-200 shadow-md p-8 sm:p-12 rounded-md">
          <h1 className="text-3xl font-bold text-center mb-8">Details User</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-neutral">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">UserName</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Password</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr key={userRedux?.id} className="">
                  <td className="border px-4 py-2">{userRedux?.id}</td>
                  <td className="border px-4 py-2">{userRedux?.username}</td>
                  <td className="border px-4 py-2">{userRedux?.email}</td>
                  <td className="border px-4 py-2">{userRedux?.password}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleUserPage()}
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
