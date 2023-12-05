import React from "react";
import Info from "../Common/Components/Info";
import Menu from "../Components/Menu/Menu";

export function MenuPage() {
  return (
    <div
      className="container col d-flex justify-content-center"
      style={{ backgroundColor: "#007a53" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">

          <div>
            <Menu />
          </div>

          <div style={{ marginTop: "5rem" }}>
          <Info/>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MenuPage;