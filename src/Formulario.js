import React, { useState, useEffect } from "react";
import Nota from "./Nota";
import { v4 as uuid } from "uuid";

function Formulario() {
  const initialNotas = JSON.parse(localStorage.getItem("notas")) || [];
  const [notas, setNotas] = useState(initialNotas);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [importante, setImportante] = useState(false);
  const [error, setError] = useState("");
  


  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);

  const agregarNota = (e) => {
    e.preventDefault();
    if (descripcion.trim() === "") {
      setError("El campo de descripción es obligatorio.");
      return;
    }
    const nuevaNota = {
      id: uuid(),
      titulo,
      descripcion,
      importante,
    };
    setNotas([...notas, nuevaNota]);
    setTitulo("");
    setDescripcion("");
    setImportante(false);
  };

  return (
    <div className="container">
      <h2 className="mt-3" style={{ textAlign: "center" }}>Mis Notas</h2>
      <hr></hr>
      <form onSubmit={agregarNota}>
        <div className="mb-3" style={{ textAlign: "center" }}>
          <label htmlFor="titulo" className="form-label" >
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3" style={{ textAlign: "center" }}>
          <label htmlFor="descripcion" className="form-label" >
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
          {error && <div className="text-danger">{error}</div>}
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="importante"
            className="form-check-input"
            checked={importante}
            onChange={(e) => setImportante(e.target.checked)}
          />
          <label htmlFor="importante" className="form-check-label">
            Importante
          </label>
        </div>

        <button type="submit" className="btn btn-primary"  style={{ display: "block", margin: "0 auto" }}>
          Agregar nota
        </button>
      </form>

      {notas.map((nota) => (
        <Nota
          key={nota.id}
          titulo={nota.titulo}
          descripcion={nota.descripcion}
          importante={nota.importante}
        />
      ))}
    </div>
  );
}

export default Formulario;