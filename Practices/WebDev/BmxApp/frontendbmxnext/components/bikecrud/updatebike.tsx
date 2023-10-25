"use client";
// UpdateBike page
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useUpdateBike from "@/redux/api/bikeservice/bikeserviceupdate";

export default function UpdateBike() {
  // Manage state
  // atributes of bike:
  /* ID	Name	Brand	Model	Color	Frame	Fork	Bars	Stem	Grips	Seat	Seatpost	Cranks	Pedals	Sprocket	Front Wheel	Rear Wheel	Front Tire	Rear Tire	Front Hub	Rear Hub	Chain	Pegs */
  // Manage state
  const [id, setId] = useState(0);
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

  // Get bike from store redux
  const bikesRedux = useSelector((state: any) => state.listbike.listBikes);

  // Get bike from query
  const bikeRedux = bikesRedux.find((bike: any) => bike.id === id);

  // Handle to bike page
  const handleBikePage = () => {
    router.push("/bike");
  };

  // Update bike
  const { updateBike } = useUpdateBike();

  // Handle submit
  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update bike
    await updateBike(
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

  // Set bike id
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idUrl = urlParams.get("id");
    if (idUrl) {
      setId(Number(idUrl));
    }
  }, []);

  // Set attributes of bike
  useEffect(() => {
    if (bikeRedux) {
      setName(bikeRedux.name || "");
      setBrand(bikeRedux.brand || "");
      setModel(bikeRedux.model || "");
      setColor(bikeRedux.color || "");
      setFrame(bikeRedux.frame || "");
      setFork(bikeRedux.fork || "");
      setBars(bikeRedux.bars || "");
      setStem(bikeRedux.stem || "");
      setGrips(bikeRedux.grips || "");
      setSeat(bikeRedux.seat || "");
      setSeatpost(bikeRedux.seatPost || "");
      setCranks(bikeRedux.cranks || "");
      setPedals(bikeRedux.pedals || "");
      setSprocket(bikeRedux.sprocket || "");
      setFrontwheel(bikeRedux.frontWheel || "");
      setRearwheel(bikeRedux.rearWheel || "");
      setFronttire(bikeRedux.frontTire || "");
      setReartire(bikeRedux.rearTire || "");
      setFronthub(bikeRedux.frontHub || "");
      setRearhub(bikeRedux.rearHub || "");
      setChain(bikeRedux.chain || "");
      setPegs(bikeRedux.pegs || "");
    }
  }, [bikeRedux]);

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex items-center justify-center">
          <div className="card shadow-xl p-8 bg-base-200">
            <h2 className="card-title text-2xl mb-4">Update Bike</h2>
            <form onSubmit={(e) => handleSubmitUpdate(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand</span>
                </label>
                <input
                  type="text"
                  placeholder="Brand"
                  className="input input-bordered"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Model</span>
                </label>
                <input
                  type="text"
                  placeholder="Model"
                  className="input input-bordered"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Color</span>
                </label>
                <input
                  type="text"
                  placeholder="Color"
                  className="input input-bordered"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Frame</span>
                </label>
                <input
                  type="text"
                  placeholder="Frame"
                  className="input input-bordered"
                  value={frame}
                  onChange={(e) => setFrame(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fork</span>
                </label>
                <input
                  type="text"
                  placeholder="Fork"
                  className="input
                  input-bordered"
                  value={fork}
                  onChange={(e) => setFork(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bars</span>
                </label>
                <input
                  type="text"
                  placeholder="Bars"
                  className="input input-bordered"
                  value={bars}
                  onChange={(e) => setBars(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stem</span>
                </label>
                <input
                  type="text"
                  placeholder="Stem"
                  className="input input-bordered"
                  value={stem}
                  onChange={(e) => setStem(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Grips</span>
                </label>
                <input
                  type="text"
                  placeholder="Grips"
                  className="input input-bordered"
                  value={grips}
                  onChange={(e) => setGrips(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Seat</span>
                </label>
                <input
                  type="text"
                  placeholder="Seat"
                  className="input input-bordered"
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Seatpost</span>
                </label>
                <input
                  type="text"
                  placeholder="Seatpost"
                  className="input input-bordered"
                  value={seatpost}
                  onChange={(e) => setSeatpost(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cranks</span>
                </label>
                <input
                  type="text"
                  placeholder="Cranks"
                  className="input input-bordered"
                  value={cranks}
                  onChange={(e) => setCranks(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pedals</span>
                </label>
                <input
                  type="text"
                  placeholder="Pedals"
                  className="input input-bordered"
                  value={pedals}
                  onChange={(e) => setPedals(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sprocket</span>
                </label>
                <input
                  type="text"
                  placeholder="Sprocket"
                  className="input input-bordered"
                  value={sprocket}
                  onChange={(e) => setSprocket(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Front Wheel</span>
                </label>
                <input
                  type="text"
                  placeholder="Front Wheel"
                  className="input input-bordered"
                  value={frontwheel}
                  onChange={(e) => setFrontwheel(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rear Wheel</span>
                </label>
                <input
                  type="text"
                  placeholder="Rear Wheel"
                  className="input input-bordered"
                  value={rearwheel}
                  onChange={(e) => setRearwheel(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Front Tire</span>
                </label>
                <input
                  type="text"
                  placeholder="Front Tire"
                  className="input input-bordered"
                  value={fronttire}
                  onChange={(e) => setFronttire(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rear Tire</span>
                </label>
                <input
                  type="text"
                  placeholder="Rear Tire"
                  className="input input-bordered"
                  value={reartire}
                  onChange={(e) => setReartire(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Front Hub</span>
                </label>
                <input
                  type="text"
                  placeholder="Front Hub"
                  className="input input-bordered"
                  value={fronthub}
                  onChange={(e) => setFronthub(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rear Hub</span>
                </label>
                <input
                  type="text"
                  placeholder="Rear Hub"
                  className="input input-bordered"
                  value={rearhub}
                  onChange={(e) => setRearhub(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Chain</span>
                </label>
                <input
                  type="text"
                  placeholder="Chain"
                  className="input input-bordered"
                  value={chain}
                  onChange={(e) => setChain(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pegs</span>
                </label>
                <input
                  type="text"
                  placeholder="Pegs"
                  className="input input-bordered"
                  value={pegs}
                  onChange={(e) => setPegs(e.target.value)}
                />
              </div>
              <div className="justify-center card-actions mt-6">
                <button
                  className="btn bg-blue-500 rounded m-1 p-1 w-20 text-white"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="btn bg-green-950 rounded m-1 p-1 w-20 text-white"
                  onClick={() => handleBikePage()}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
