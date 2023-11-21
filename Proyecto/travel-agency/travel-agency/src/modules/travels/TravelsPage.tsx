import { STYLE } from "../../core/const/const";
import { useEffect, useState } from "react";
import { TravelsService } from "../../core/services/travels-service";
import { TravelCard } from "./components/TravelCard";
import { CreateTravelForm } from "./components/CreateTravelForm";
import { EditTravelForm } from "./components/EditTravelForm";
import { Travel } from "../../core/services/interfaces/travel";
import { TravelDetail } from "./components/TravelDetail";
import { User } from "../../core/services/interfaces/user";

const initialUser: User = {
  id: 0,
  username: "",
  email: "",
  password: "",
};

const initialSelectedTravel: Travel = {
  id: -1,
  name: "",
  description: "",
  originCity: "",
  destinationCity: "",
  price: -1,
};

export const TravelsPage = () => {
  const getLoggedUser = () => {
    const userFound = localStorage.getItem("user");
    if (userFound) {
      return JSON.parse(JSON.parse(userFound));
    } else {
      return initialUser;
    }
  };
  const [user, setUser] = useState(getLoggedUser());
  const [travels, setTravels] = useState([]);
  const [selectedEditTravel, setSelectedEditTravel] = useState(
    initialSelectedTravel
  );
  const [selectedDetailTravel, setSelectedDetailTravel] = useState(
    initialSelectedTravel
  );
  const travelsService: TravelsService = new TravelsService();
  const getTravels = (query?: string) => {
    travelsService
      .getTravels(query)
      .then((travels) => {
        setTravels(travels);
        console.log(travels);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleDeleteTravel = (travelId: number) => {
    travelsService
      .deleteTravel(travelId)
      .then((deletedTravel) => {
        getTravels();
        console.log("Viaje eliminado:", deletedTravel);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCreateTravel = (travel: Travel) => {
    travelsService
      .createTravel(travel)
      .then((newTravel) => {
        getTravels();
        console.log("Viaje nuevo:", newTravel);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleEditTravel = (travel: Travel) => {
    travelsService
      .updateTravel(travel.id!, travel)
      .then((updatedTravel) => {
        getTravels();
        console.log("Viaje actualizado:", updatedTravel);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    getTravels(query);
  };

  useEffect(() => {
    getTravels();
  }, []);

  return (
    <section
      id="travels"
      className={"container-fluid " + STYLE.contentPaddingY}
    >
      <div className="row">
        <div className="col">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Buscar"
              onChange={handleSearch}
            />
          </form>
        </div>
        <div className="col-auto text-end">
          {user.email!==''?(<button
            type="button"
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#createTravelModal"
          >
            Crear viaje
          </button>):(<p></p>)}
        </div>
      </div>
      <div className={"row " + STYLE.contentPaddingY}>
        {travels.length === 0 ? (
          <p className="text-center">No hay viajes disponibles.</p>
        ) : (
          travels.map((travel) => (
            <TravelCard
              user={user}
              travel={travel}
              deleteTravel={handleDeleteTravel}
              editTravel={setSelectedEditTravel}
              detailTravel={setSelectedDetailTravel}
            ></TravelCard>
          ))
        )}
      </div>
      {/* Travel detail modal */}
      <div
        className="modal fade"
        id="detailTravelModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-capitalize" id="exampleModalLabel">
                {selectedDetailTravel.name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TravelDetail travel={selectedDetailTravel}></TravelDetail>
            </div>
          </div>
        </div>
      </div>
      {/* Create travel modal */}
      <div
        className="modal fade"
        id="createTravelModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear Viaje
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateTravelForm
                createTravel={handleCreateTravel}
              ></CreateTravelForm>
            </div>
          </div>
        </div>
      </div>
      {/* Edit travel modal */}
      <div
        className="modal fade"
        id="editTravelModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar viaje
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditTravelForm
                travel={selectedEditTravel}
                setTravel={setSelectedEditTravel}
                editTravel={handleEditTravel}
              ></EditTravelForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
