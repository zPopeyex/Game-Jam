import React from "react";
//Creamos una funcion tabla que recibe por parametros los integrantes, metodos borra y editar integrantes, imprimir.
function Table({
  integrantes,
  borrarIntegrante,
  editarIntegrante,
  imprimirImagen,
}) {
  return (
    <div className="mx-2">
      <table className="table mt-5 table-striped table-bordered text-center">
        <thead>
          <tr>
            {/*Se nombran las columnas a usar en la tabla*/}
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        {/*Mediante el cuerpo de la tabla*/}
        <tbody>
          {/*Recorremos el arreglo si no se encuentra vacio*/}
          {integrantes.length > 0 ? (
            integrantes.map((integrante) => {
              return (
                //Declaramos un identificador unico para cada integrante
                <tr key={integrante.id}>
                  <th scope="row">{integrante.id}</th>
                  <td className="text-capitalize text-primary">
                    {/*Mostramos Cuando recibamos el evento clic usaremos el metodo imrpimir para generar una imagen aleatoria sobre el ID de integrante seleccionado*/}
                    <div
                      onClick={() => imprimirImagen(integrante.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <u>{integrante.nombre}</u>
                    </div>
                  </td>
                  {/*Agregamos un boton para borrar y a su vez esperamos un evento clic para ejecutar la funcion borrar Integrante con parametro ID de integrante registrado*/}
                  <td className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm d-flex"
                      onClick={() => borrarIntegrante(integrante.id)}
                    >
                      {/*Importamos un icono para el boton*/}
                      <i className="material-icons" style={{ fontSize: 20 }}>
                        delete_forever
                      </i>
                    </button>
                    {/*Creamos un boton para la accion editar y le damos su icono correspondiente*/}
                    <button
                      type="button"
                      className="btn btn-warning btn-sm d-flex"
                      onClick={() => editarIntegrante(integrante.id)}
                    >
                      <i className="material-icons" style={{ fontSize: 20 }}>
                        edit
                      </i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            //Si se encuentran vacio los integrantes con tamaño de 3 columnas informamos que se encuentra vacio
            <tr>
              <td colSpan="3">Vacio</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
//Exportamos la tabla
export default Table;
