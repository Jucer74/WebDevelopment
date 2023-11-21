import PropTypes from "prop-types";

export const Carousel = ({ images, imagesHeight, title, subtitle }) => {
  return (
    <div
      id="carouselExampleDark"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {images?.map((_: string, index: number) => {
          return (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={"Slide " + index}
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {images?.map((image: string, index: number) => {
          return (
            <div
              key={index}
              className={"carousel-item".concat(index === 0 ? " active" : "")}
              data-bs-interval="10000"
            >
              <img
                src={image}
                className="d-block w-100 object-fit-cover"
                height={imagesHeight}
              />
              <div className="carousel-caption d-none d-md-block h">
                <p className="m-0">{subtitle}</p>
                <p className="fw-bold fs-1">{title}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imagesHeight: PropTypes.number.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
