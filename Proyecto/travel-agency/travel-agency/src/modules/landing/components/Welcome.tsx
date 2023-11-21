import React from "react";
import { STYLE } from "../../../core/const/const";

export const Welcome = () => {
  return (
    <div className="row align-items-center">
      <div className="d-md-none">
        <p className="fw-bold text-success text-capitalize m-0">
          ¡Reserva ahora!
        </p>
        <h1
          className="fw-bold text-capitalize"
          style={{ maxWidth: STYLE.principalTitleMaxWidth }}
        >
          Disfruta tu viaje con Travellers
        </h1>
      </div>
      <div className="col-md-6 order-md-last text-center">
        <img
          className="w-100"
          src="https://img.freepik.com/free-vector/retirement-travel-couple-elderly-people-hiking-mountains-with-backpacks-camera-senior-people-travelling-tourism-recreation-activity_335657-3593.jpg?w=740&t=st=1699782628~exp=1699783228~hmac=b80547d6406a399df5d3b944ae2f4a3cbfed880cf71265a5e704f98954782c1c"
          style={{ maxWidth: STYLE.principalImgMaxWidth }}
        />
      </div>
      <div className="col-md-6 order-md-first">
        <div className="d-none d-md-block">
          <p className="fw-bold text-success text-capitalize m-0">
            ¡Reserva ahora!
          </p>
          <h1
            className="fw-bold text-capitalize"
            style={{ maxWidth: STYLE.principalTitleMaxWidth }}
          >
            Disfruta tu viaje con Travellers
          </h1>
        </div>
        <p className="py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          commodi suscipit dolor neque, repellendus ducimus impedit amet eos sit
          laboriosam! Deserunt commodi ducimus, illo pariatur dolores debitis
          porro aspernatur officia. Ipsum saepe in repudiandae rem provident
          voluptates enim fuga repellat deserunt totam illum quasi,
          exercitationem pariatur recusandae.
        </p>
        <div className="hstack gap-3">
          <a href="/explore" className="btn btn-dark">
            Comienza ahora
          </a>
          <a
            target="blank"
            href="https://www.google.com/search?q=%C2%BFQue+son+los+viajes%3F&sca_esv=71ef8fd97fe28bf1&rlz=1C1CHBD_esCO1083CO1083&sxsrf=AM9HkKmOOXQhMF6mHl7_hMNgJNpFJefPoA%3A1700589869717&ei=LfFcZf-1K_OHwbkP2M6u6Ag&ved=0ahUKEwi_gN_41tWCAxXzQzABHVinC40Q4dUDCBA&uact=5&oq=%C2%BFQue+son+los+viajes%3F&gs_lp=Egxnd3Mtd2l6LXNlcnAiFcK_UXVlIHNvbiBsb3MgdmlhamVzPzIJEAAYHhgPGPEESLttUMwIWN5ncAR4AZABAJgBqgGgAbIaqgEEMC4yNbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAggQABiABBiiBMICChAjGIAEGIoFGCfCAgsQABiABBixAxiDAcICDhAuGIAEGLEDGMcBGNEDwgIFEAAYgATCAggQABiABBixA8ICBBAAGAPCAgoQLhiABBiKBRhDwgILEAAYgAQYigUYsQPCAgQQIxgnwgIMECMYgAQYigUYExgnwgIOEAAYgAQYigUYsQMYgwHCAgoQABiABBiKBRhDwgINEAAYgAQYigUYsQMYQ8ICChAAGIAEGBQYhwLCAggQABiABBjHA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp"
            className="btn btn-clear"
          >
            Más información
          </a>
        </div>
      </div>
    </div>
  );
};
