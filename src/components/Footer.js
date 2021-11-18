import React from "react";
//Creamos una funcion Flecha Footer para poner nuestro footer en estilo sticky con cierta información
const Footer = () => (
  <div className="sticky-bottom">
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div />
        <div className="mx-3" style={{ fontSize: 12 }}>
          <i>Copyright © Leonardo & Nedith USC</i>
        </div>
      </div>
    </nav>
  </div>
);

export default Footer;
