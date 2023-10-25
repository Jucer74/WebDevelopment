"use client";
// CreateUser page
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useCreateNewUser from "@/redux/api/userservice/userservicecreate";

export default function CreateUser() {
  // Manage state
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get router
  const router = useRouter();

  // Handle to user page
  const handleUserPage = () => {
    router.push("/user");
  };

  // Create user
  const { createUser } = useCreateNewUser();

  // Handle submit to create user
  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create user
    await createUser(username, email, password);

    // Redirect
    router.push("/user");
  };

  // Return
  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-start">
          <div className="max-w-md">
            <div className="max-w-md mx-auto m-4 p-6 bg-base-200 rounded shadow-xl">
              <h1 className="text-3xl mb-4">Create User</h1>
              <form onSubmit={handleSubmitCreate}>
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
                    Create User
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
