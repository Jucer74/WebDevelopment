import forest from "../../../shared/assets/travels/forest.jpg";
import desert from "../../../shared/assets/travels/desert.jpg";
import tree from "../../../shared/assets/travels/tree.jpg";
import rural from "../../../shared/assets/travels/rural.jpg";
import { STYLE } from "../../../core/const/const";
import {
  ArrowRightIcon,
  CoinIcon,
  GeoAltFillIcon,
} from "./../../../shared/components/Icon";
import { TravelItemInterface } from "../interfaces/TravelItem";

const processItems: TravelItemInterface[] = [
  {
    location: "Cali, Colombia",
    price: 900,
    image: forest,
  },
  {
    location: "Madrid, España",
    price: 1200,
    image: desert,
  },
  {
    location: "Buenos Aires, Argentina",
    price: 300,
    image: tree,
  },
  {
    location: "Sidney, Australia",
    price: 700,
    image: rural,
  },
];

export const Travels = () => {
  return (
    <div>
      <div className="row g-0 w-100 my-3 align-items-center">
        <div className="col">
          <p className="fw-bold text-success m-0">¡Mejores Destinos!</p>
          <h2
            className="fs-1 fw-bold"
            style={{ maxWidth: STYLE.principalTitleMaxWidth }}
          >
            Explora Los Mejores Destinos
          </h2>
        </div>
        <div className="col-auto">
          <a href="/explore" className="btn btn-clear text-success fw-bold">
            Ver Todo
            <span className="px-2">
              <ArrowRightIcon></ArrowRightIcon>
            </span>
          </a>
        </div>
      </div>
      <div className={"row " + STYLE.contentPaddingY}>
        {processItems.map((travelItem: TravelItemInterface) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 py-3 d-flex justify-content-center">
              <div className="d-flex flex-column" style={{width: 300}}>
                <div className="text-center">
                  <img
                    src={travelItem.image}
                    className="w-100 object-fit-cover border rounded shadow"
                    style={{ height: 450 }}
                  />
                </div>
                <div className="d-flex py-3">
                  <div className="w-50 text-truncate">
                    <small className="fw-semibold">
                      <span className="px-2">
                        <GeoAltFillIcon></GeoAltFillIcon>
                      </span>
                      {travelItem.location}
                    </small>
                  </div>
                  <div className="w-50 text-end">
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
        })}
      </div>
    </div>
  );
};
