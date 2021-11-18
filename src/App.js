//Importación de bibliotecas y componentes necesarios.
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { uid } from "uid";
import Swal from "sweetalert2";
import Header from "./components/Header";
import Table from "./components/Table";
import Input from "./components/Input";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import ExcerciseNew from "./pages/ExcerciseNew";
import Excercise from "./pages/Excercise";

//Creación de la pagina principal
const App = () => {
  <BrowserRouter>
    <Route exact path="/excercise" component={Excercise} />
    <Route exact path="/excercise/new" component={ExcerciseNew} />
  </BrowserRouter>;

  //Declaramos arreglo de integrantes y correspondiente seteo para el arreglo dependiendo el estado
  const [integrantes, setIntegrantes] = useState([]);
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");

  //Obtenemos la sesion guardada como JSON o String y la convertimos a Objeto de tipo integrantes
  //El arreglo vacio al final  indica que solo se ejecutara este codigo la primera vez que se renderice
  useEffect(() => {
    setIntegrantes(JSON.parse(sessionStorage.getItem("integrantes")) ?? []);
  }, []);

  //Convertimos el objeto integrantes a JSON para poder guardar la session y consultarla posteriormente cada que el estado integrantes tenga un cambio
  useEffect(() => {
    sessionStorage.setItem("integrantes", JSON.stringify(integrantes));
  }, [integrantes]);

  //Creamos una funcion flecha para crear el integrante  que recibe por parametro el evento del input (donde ingresamos el nombre del integrante)
  const crearIntegrante = (e) => {
    //Prevenimos que al usar el boton guardar se recargue la pagina por defecto.
    e.preventDefault();

    //Si el tamaño de lo ingresado en el input es mayor o igual a 2 nos permite crear un integrante, asignandole un id totalmente unico y un nombre
    if (nuevoIntegrante.length >= 2) {
      setIntegrantes([...integrantes, { id: uid(), nombre: nuevoIntegrante }]);
      //Seteamo el input en vacio para que pueda ser ingresado otro integrante sin inconveniente.
      setNuevoIntegrante("");
      //Agregamos una alerta en esquina inferior derecha que indica que el usuario se agrego correctamente
      toast.success("¡Integrante agregado!", { autoClose: 2300 });
    } //Si no escribe 2 o mas caracteres en el input salta alerta con error
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Ocurrio un error!",
        footer: "Debe ingresar minimo un caracter.",
      });
    }
  };

  //Creamos una funcion flecha para borrar los integrantes agregados y por parametro le pasamos el identificador a borrar
  const borrarIntegrante = async (idBorrar) => {
    //Esperamos una respuesta de la alerta para confirmar.
    const result = await Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás reverti esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, ¡borralo!",
    });
    //Si esto fue confirmado
    //Hacemos un filtro en el arreglo de integrantes  y comparamos el ID de integrante registrado vs el ID que queremos borrar
    //Si esta condicional se cumple no guarda el integrante y nos devuelve un nuevo arreglo filtrado
    if (result.isConfirmed) {
      setIntegrantes(
        integrantes.filter((integrante) => integrante.id !== idBorrar)
      );

      Swal.fire("¡Borrado!", "Tu integrante ha sido borrado.", "success");
    }
  };
  //Creamos una funcion flecha asyncrona donde por parametro pasamos el ID a editar
  const editarIntegrante = async (idEditar) => {
    //Se hace una busqueda en el arreglo de integrantes y se guarda en la constante integranteCambio
    const integranteCambio = integrantes.find(
      //Se compara si el ID del integrante es igual al ID a editar
      (integrante) => integrante.id === idEditar
    );
    //Creamos una constante que nos espera una entrada y es almacenada en nombre, en este caso el nombre a editar
    const result = await Swal.fire({
      title: "Cambia el nombre del integrante",
      input: "text",
      inputValue: integranteCambio.nombre,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    });
    //Si lo esperado es confirmado
    if (result.isConfirmed) {
      //Recorre el arreglo de integrantes y a su vez compara si el ID del integrante es el mismo ID que se desea editar
      //En caso de que sean iguales los ID evaluados del integrante unicamente modifica el nombre digitado por el input
      setIntegrantes(
        integrantes.map((integrante) =>
          integrante.id === idEditar
            ? { ...integrante, nombre: result.value }
            : integrante
        )
      );
      //Mediante una alerta indicamos el nombre anterior y el nombre al cual fue modificado el integrante.
      Swal.fire(
        "¡Editado!",
        `El integrante ${integranteCambio.nombre} cambió a ${result.value}`,
        "success"
      );
    }
  };
  //Creamos una funcion flecha para imprimir una imagen al azar consumida desde una pagina web
  const imprimirImagen = (idImprimir) => {
    const integranteImprimir = integrantes.find(
      (integrante) => integrante.id === idImprimir
    );
    //Mediante una alerta imprimimos o mostramos una imagen que contiene el titulo del integrante que fue seleccionado y la imagen aleatoria mediante consumo desde una pagina web aleatoriamente
    Swal.fire({
      title: `Integrante: ${integranteImprimir.nombre}.`,
      imageUrl: "https://i.pravatar.cc/300",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  };

  return (
    <div className="App">
      {/*Importamos nuestro componente llamado Header que contiene el titulo y el navbar */}
      <Header />
      <div className="container mt-4">
        {/*Importamos nuestro componente Input, donde tenemos almacenado lo relacionado con el formulario de ingreso de los integrantes*/}
        <Input
          crearIntegrante={crearIntegrante}
          nuevoIntegrante={nuevoIntegrante}
          setNuevoIntegrante={setNuevoIntegrante}
        />
        {/*Importamos nuestro componente Tabla, donde tenemos lo relacionado con la tabla, ID,Nombre, iconos y acciones*/}
        <Table
          integrantes={integrantes}
          borrarIntegrante={borrarIntegrante}
          editarIntegrante={editarIntegrante}
          imprimirImagen={imprimirImagen}
        />
      </div>
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
};
//Exportamos la pagina
export default App;
