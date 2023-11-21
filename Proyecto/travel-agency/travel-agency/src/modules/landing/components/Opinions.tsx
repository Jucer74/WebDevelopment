import { ProcessItemInterface } from "../interfaces/ProcessItem";
import variousDestination from "../../../shared/assets/process/various_destination_2.jpg";
import bestGuide from "../../../shared/assets/process/best_guide.jpg";
import easyBooking from "../../../shared/assets/process/easy_booking.jpg";
import { STYLE } from "../../../core/const/const";

const processItems: ProcessItemInterface[] = [
  {
    title: "Variedad de destinos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda quae nostrum odio laboriosam, incidunt voluptates quisquam reprehenderit enim alias iure quibusdam aut rem at voluptatibus ad tempora nulla accusantium?",
    image: variousDestination,
  },
  {
    title: "La mejor guía turistica",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda quae nostrum odio laboriosam, incidunt voluptates quisquam reprehenderit enim alias iure quibusdam aut rem at voluptatibus ad tempora nulla accusantium?",
    image: bestGuide,
  },
  {
    title: "Facíl proceso de reserva",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda quae nostrum odio laboriosam, incidunt voluptates quisquam reprehenderit enim alias iure quibusdam aut rem at voluptatibus ad tempora nulla accusantium?",
    image: easyBooking,
  },
];

export const Opinions = () => {
  return (
    <div>
      <div className="row w-100 my-3 text-center justify-content-center">
        <p className="fw-bold text-success m-0">¡Retroalimentate!</p>
        <h2
          className="fs-1 fw-bold"
          style={{ maxWidth: STYLE.principalTitleMaxWidth }}
        >
          Opiniones De Clientes
        </h2>
      </div>
      <div className={"container" + STYLE.contentPaddingY}>
        <div id="carouselExample" className="carousel carousel-dark slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {processItems.map((processItem: ProcessItemInterface) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-12 py-3">
                      <div className="card h-100 shadow-sm">
                        <div className="row h-100 g-0 ">
                          <div className="card-body">
                            <h5 className="card-title fw-normal">
                              <cite>"{processItem.description}"</cite>
                            </h5>
                            <p className="card-text text-end fw-semibold">
                              - {processItem.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                {processItems.map((processItem: ProcessItemInterface) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-12 py-3">
                      <div className="card h-100 shadow-sm">
                        <div className="row h-100 g-0 ">
                          <div className="card-body">
                            <h5 className="card-title fw-normal">
                              <cite>"{processItem.description}"</cite>
                            </h5>
                            <p className="card-text text-end fw-semibold">
                              - {processItem.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
