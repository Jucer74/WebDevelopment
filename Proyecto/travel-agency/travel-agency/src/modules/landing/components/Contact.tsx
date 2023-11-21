import { STYLE } from "../../../core/const/const";
import Map from "../../../shared/components/Map";
export const Contact = () => {
  return (
    <div>
      <div className={"row align-items-center " + STYLE.contentPaddingY}>
        <div className="d-md-none">
          <p className="fw-bold text-success m-0">¡Comunicate!</p>
          <h2
            className="fs-1 fw-bold"
            style={{ maxWidth: STYLE.principalTitleMaxWidth }}
          >
            Contactanos
          </h2>
        </div>
        <div className="col-md-6 text-center">
          <Map></Map>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <div className="d-none d-md-block">
            <p className="fw-bold text-success m-0">¡Comunicate!</p>
            <h2
              className="fs-1 fw-bold"
              style={{ maxWidth: STYLE.principalTitleMaxWidth }}
            >
              Contactanos
            </h2>
          </div>
          <div className="my-3">
            <form>
              <div className="form-group py-2">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="form-group py-2">
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="form-group py-2">
                <label htmlFor="message">Mensaje:</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-center py-2">
                <button type="submit" className="btn btn-dark">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
