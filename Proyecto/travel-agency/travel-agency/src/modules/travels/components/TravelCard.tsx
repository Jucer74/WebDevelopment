import { Travel } from "../../../core/services/interfaces/travel";
import {
  CoinIcon,
  Eye,
  GeoAltFillIcon,
  PencilSquare,
  Trash,
} from "../../../shared/components/Icon";

export const TravelCard = (props) => {
  const travelItem: Travel = props.travel;

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 py-3 d-flex justify-content-center">
      <div className="d-flex flex-column" style={{ width: 300 }}>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-clear me-2"
            data-bs-toggle="modal"
            data-bs-target="#detailTravelModal"
            onClick={() => props.detailTravel(travelItem)}
          >
            <span>
              <Eye></Eye>
            </span>
          </button>
          {props.user?.email !== "" ? (
            <>
              <button
                type="button"
                className="btn btn-clear me-2"
                data-bs-toggle="modal"
                data-bs-target="#editTravelModal"
                onClick={() => props.editTravel(travelItem)}
              >
                <span>
                  <PencilSquare></PencilSquare>
                </span>
              </button>
              <button
                type="button"
                className="btn btn-clear"
                onClick={() => props.deleteTravel(travelItem.id)}
              >
                <span>
                  <Trash></Trash>
                </span>
              </button>
            </>
          ) : (
            <span></span>
          )}
        </div>
        <div className="text-center h-100">
          <img
            src={travelItem?.images?.[0]}
            className="w-100 h-100 object-fit-cover border rounded shadow"
          />
        </div>
        <div className="d-flex py-3">
          <div className="text-truncate">
            <small className="fw-semibold">
              <span className="px-2">
                <GeoAltFillIcon></GeoAltFillIcon>
              </span>
              {travelItem.destinationCity}
            </small>
          </div>
          <div className="ms-auto text-end">
            <small className="fw-semibold">
              <span className="px-2">
                <CoinIcon></CoinIcon>
              </span>
              {travelItem.price}
              <sub> / Paquete</sub>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
