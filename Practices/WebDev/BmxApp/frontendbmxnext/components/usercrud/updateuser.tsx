"use client";
// UpdateUser page
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useUpdateUser from "@/redux/api/userservice/userserviceupdate";

export default function UpdateUser() {
  // Manage state
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  // Update user
  const { updateUser } = useUpdateUser();

  // Handle submit
  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update user
    await updateUser(id, userName, email, password);

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

  // Set user name and email
  useEffect(() => {
    if (userRedux) {
      setUserName(userRedux.username || "");
      setEmail(userRedux.email || "");
    }
  }, [userRedux]);

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-start">
          <div className="max-w-md">
            <div className="max-w-md mx-auto m-4 p-6 bg-base-200 rounded shadow-xl">
              <h1 className="text-3xl mb-4">Update User</h1>
              <form onSubmit={handleSubmitUpdate}>
                <div className="mb-4">
                  <label
                    className="blocktext-sm font-bold mb-2"
                    htmlFor="UserName"
                  >
                    UserName
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="UserName"
                    type="text"
                    placeholder="UserName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Email"
                    type="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Password"
                    type="Password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update User
                  </button>
                  <button
                    className="bg-green-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleUserPage}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
