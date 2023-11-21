import { ProcessItemInterface } from "../interfaces/ProcessItem";
import variousDestination from "../../../shared/assets/process/various_destination_2.jpg";
import bestGuide from "../../../shared/assets/process/best_guide.jpg";
import easyBooking from "../../../shared/assets/process/easy_booking.jpg";
import { STYLE } from "../../../core/const/const";

const processItems: ProcessItemInterface[] = [
  {
    title: "Variedad de destinos",
    description:
      "Some quick example text to build on the card title and make up thebulk of the card's content.",
    image: variousDestination,
  },
  {
    title: "La mejor guía turistica",
    description:
      "Some quick example text to build on the card title and make up thebulk of the card's content.",
    image: bestGuide,
  },
  {
    title: "Facíl proceso de reserva",
    description:
      "Some quick example text to build on the card title and make up thebulk of the card's content.",
    image: easyBooking,
  },
];

export const Process = () => {
  return (
    <div>
      <div className="row w-100 my-3 text-center justify-content-center">
        <p className="fw-bold text-success m-0">¡Nuestros Procesos!</p>
        <h2
          className="fs-1 fw-bold"
          style={{ maxWidth: STYLE.principalTitleMaxWidth }}
        >
          Ofrecemos Los Siguientes Servicios
        </h2>
      </div>
      <div className={"row " + STYLE.contentPaddingY}>
        {processItems.map((processItem: ProcessItemInterface) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12 py-3">
              <div className="card h-100 shadow-sm">
                <div className="row h-100 g-0 align-items-center">
                  <div className="col-md-4 text-center">
                    <img
                      src={processItem.image}
                      className="img-fluid w-100"
                      style={{ maxWidth: STYLE.secondaryImgMaxWidth }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h4 className="card-title">{processItem.title}</h4>
                      <p className="card- text">{processItem.description}</p>
                    </div>
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
