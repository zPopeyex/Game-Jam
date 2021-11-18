import React from "react";
//Creamos la funcion header, donde tenemos nuestro navbar y titulo
function Header() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          Game Jam - Inscripción al equipo
        </span>
        <div className="mx-3">
          <i>Leonardo Ospina & Nedith Cortes</i>
        </div>
      </div>
    </nav>
  );
}

export default Header;
