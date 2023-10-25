"use client";
// CreateBike page
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useCreateNewBike from "@/redux/api/bikeservice/bikeservicecreate";

export default function CreateBike() {
  // atributes of bike:
  /* ID	Name	Brand	Model	Color	Frame	Fork	Bars	Stem	Grips	Seat	Seatpost	Cranks	Pedals	Sprocket	Front Wheel	Rear Wheel	Front Tire	Rear Tire	Front Hub	Rear Hub	Chain	Pegs */
  // Manage state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [frame, setFrame] = useState("");
  const [fork, setFork] = useState("");
  const [bars, setBars] = useState("");
  const [stem, setStem] = useState("");
  const [grips, setGrips] = useState("");
  const [seat, setSeat] = useState("");
  const [seatpost, setSeatpost] = useState("");
  const [cranks, setCranks] = useState("");
  const [pedals, setPedals] = useState("");
  const [sprocket, setSprocket] = useState("");
  const [frontwheel, setFrontwheel] = useState("");
  const [rearwheel, setRearwheel] = useState("");
  const [fronttire, setFronttire] = useState("");
  const [reartire, setReartire] = useState("");
  const [fronthub, setFronthub] = useState("");
  const [rearhub, setRearhub] = useState("");
  const [chain, setChain] = useState("");
  const [pegs, setPegs] = useState("");

  // Get router
  const router = useRouter();

  // Handle to bike page
  const handleBikePage = () => {
    router.push("/bike");
  };

  // Create bike
  const { createBike } = useCreateNewBike();

  // Handle submit to create bike
  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create bike
    await createBike(
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
      frontwheel,
      rearwheel,
      fronttire,
      reartire,
      fronthub,
      rearhub,
      chain,
      pegs
    );

    // Redirect
    router.push("/bike");
  };

  // Return
  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-start">
          <div className="max-w-md">
            <div className="max-w-md mx-auto m-4 p-6 bg-base-200 rounded shadow-xl">
              <h1 className="text-3xl mb-4">Create Bike</h1>
              <form onSubmit={handleSubmitCreate}>
                <div className="mb-4">
                  <label className="blocktext-sm font-bold mb-2" htmlFor="Name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="Name"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Brand"
                  >
                    Brand
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Brand"
                    type="text"
                    placeholder="Brand"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Model"
                  >
                    Model
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Model"
                    type="text"
                    placeholder="Model"
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Color"
                  >
                    Color
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Color"
                    type="text"
                    placeholder="Color"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Frame"
                  >
                    Frame
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Frame"
                    type="text"
                    placeholder="Frame"
                    onChange={(e) => setFrame(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Fork"
                  >
                    Fork
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Fork"
                    type="text"
                    placeholder="Fork"
                    onChange={(e) => setFork(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Bars"
                  >
                    Bars
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Bars"
                    type="text"
                    placeholder="Bars"
                    onChange={(e) => setBars(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Stem"
                  >
                    Stem
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Stem"
                    type="text"
                    placeholder="Stem"
                    onChange={(e) => setStem(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Grips"
                  >
                    Grips
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    id="Grips"
                    type="text"
                    placeholder="Grips"
                    onChange={(e) => setGrips(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Seat"
                  >
                    Seat
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Seat"
                    onChange={(e) => setSeat(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Seatpost"
                  >
                    Seatpost
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Seatpost"
                    onChange={(e) => setSeatpost(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Cranks"
                  >
                    Cranks
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Cranks"
                    onChange={(e) => setCranks(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Pedals"
                  >
                    Pedals
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Pedals"
                    onChange={(e) => setPedals(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Sprocket"
                  >
                    Sprocket
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Sprocket"
                    onChange={(e) => setSprocket(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Frontwheel"
                  >
                    Frontwheel
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Frontwheel"
                    onChange={(e) => setFrontwheel(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Rearwheel"
                  >
                    Rearwheel
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Rearwheel"
                    onChange={(e) => setRearwheel(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Fronttire"
                  >
                    Fronttire
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fronttire"
                    onChange={(e) => setFronttire(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Reartire"
                  >
                    Reartire
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Reartire"
                    onChange={(e) => setReartire(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Fronthub"
                  >
                    Fronthub
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fronthub"
                    onChange={(e) => setFronthub(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Rearhub"
                  >
                    Rearhub
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Rearhub"
                    onChange={(e) => setRearhub(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Chain"
                  >
                    Chain
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Chain"
                    onChange={(e) => setChain(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="Pegs"
                  >
                    Pegs
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Pegs"
                    onChange={(e) => setPegs(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="btn bg-blue-500 rounded m-1 p-1 w-20 text-white"
                    type="submit"
                  >
                    Create
                  </button>
                  <button
                    className="btn bg-green-950 rounded m-1 p-1 w-20 text-white"
                    onClick={handleBikePage}
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
