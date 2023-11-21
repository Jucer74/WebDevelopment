import { Travel } from "../../../core/services/interfaces/travel";

export const EditTravelForm = (props) => {
  const travel: Travel = props.travel
  const handleInputChange = (e) => {
    props.setTravel({ ...travel, [e.target.name]: formatProperties(e.target) });
  };
  const formatProperties = (property) => {
    let value = property.value;
    if (property.name === "images") value = value.trim().split(",")
    console.log(value);
    return value;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.editTravel(travel)
  };

  return (
    <form onSubmit={handleEdit}>
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
