import { useState } from "react";
import { Travel } from "../../../core/services/interfaces/travel";
import { TravelsService } from "../../../core/services/travels-service";

const initialTravel: Travel = {
  name: "",
  description: "",
  originCity: "",
  destinationCity: "",
  price: 0,
  images: []
};

export const CreateTravelForm = (props) => {
  const [travel, setTravel] = useState(initialTravel);
  const travelsService: TravelsService = new TravelsService();

  const handleInputChange = (e) => {
    setTravel({ ...travel, [e.target.name]: formatProperties(e.target) });
  };

  const formatProperties = (property) => {
    let value = property.value;
    if (property.name === "images") value = value.trim().split(",")
    console.log(value);
    return value;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    props.createTravel(travel);
    setTravel(initialTravel);
  };

  return (
    <form onSubmit={handleCreate}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={travel.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripcion
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={travel.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="originCity" className="form-label">
          Ciudad de partida
        </label>
        <input
          type="text"
          className="form-control"
          id="originCity"
          name="originCity"
          value={travel.originCity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="destinationCity" className="form-label">
          Ciudad de destino
        </label>
        <input
          type="text"
          className="form-control"
          id="destinationCity"
          name="destinationCity"
          value={travel.destinationCity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Precio
        </label>
        <input
          type="numeric"
          className="form-control"
          id="price"
          name="price"
          value={travel.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Imagenes
        </label>
        <textarea
          className="form-control"
          id="images"
          name="images"
          value={travel.images}
          onChange={handleInputChange}
          rows={5}
          required
        ></textarea>
      </div>
      {/* {loginError && (
        <div className="text-center mb-3">
          <small className="text-danger">{loginError}</small>
        </div>
      )} */}
      <div className="text-center">
        <button type="submit" className="btn btn-dark">
          Confirmar
        </button>
      </div>
    </form>
  );
};
