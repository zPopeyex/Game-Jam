import React from "react";
//Creamos una funcion input la cual recibe por parametro lo mencionado
function Input({ crearIntegrante, nuevoIntegrante, setNuevoIntegrante }) {
  return (
    <div className="card">
      <div className="card-body">
        {/*Cuando se da clic sobre agregar se activa onsubmit y se crea el integrante en el arreglo de la App*/}
        <form onSubmit={crearIntegrante}>
          <label htmlFor="nombreInput" className="form-label">
            Nombre del integrante
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreInput"
            placeholder="Ingrese un nombre"
            value={nuevoIntegrante}
            //Cuando se intersa un caracter ese mismo va a ser parte del nombre del nuevo integrante
            onChange={(e) => setNuevoIntegrante(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-4">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Input;
