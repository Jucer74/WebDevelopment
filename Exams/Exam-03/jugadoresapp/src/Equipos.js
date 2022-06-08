import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";

const api2 = "http://localhost:5000/equipos";
const api = "http://localhost:5000/jugadores";
const initialState = {
  Imagen: "",
  Nombre: "",
  Liga: "",
};
function Equipos() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);
  const [equipoId, setEquipoId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");
  const { Nombre, Liga } = state;

  useEffect(() => {
    loadEquipos();
  }, []);

  const loadEquipos = async () => {
    const response = await axios.get(api2);
    setData(response.data);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Estás seguro que desea eliminar?")) {
      axios.delete(`${api2}/${id}`);
      toast.success("Equipo eliminado");
      for (let index = 0; index < state.length; index++) {
        if (parseInt(state[index].id) === Equipos.id) {
          console.log(state.length);
          axios.delete(api + "/" + state[index].id);
        }
      }
      setTimeout(() => loadEquipos(), 500);
    }
  };
  const handleUpdate = (id) => {
    const singleEquipo = data.find((item) => item.id === id);
    setState({ ...singleEquipo });
    setEquipoId(id);
    setEditMode(true);
  };

  const handleReset = () => {
    loadEquipos();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:5000/equipos?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Nombre || !Liga) {
      toast.error("Por favor llene los campos");
    } else {
      if (!editMode) {
        axios.post(api2, state);
        toast.success("Equipo agregado");
        setState({ Imagen: "", Nombre: "", Liga: "" });
        setTimeout(() => loadEquipos(), 500);
      } else {
        axios.put(`${api2}/${equipoId}`, state);
        toast.success("Equipo actualizado");
        setState({ Imagen: "", Nombre: "", Liga: "" });
        setTimeout(() => loadEquipos(), 500);
        setEquipoId(null);
        setEditMode(false);
      }
    }
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "WebDev");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dddbf676z/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col md={4}>
            <Form
              style={{ marginRight: "5px", marginTop: "10px" }}
              Name="d-flex input-group w-auto"
              onClick={handleSearch}
            >
              <input
                id="Busqueda"
                type="text"
                className="form-control"
                placeholder="Buscar por liga"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <ButtonGroup>
                <Button
                  style={{ marginRight: "5px", marginTop: "10px" }}
                  variant="outline-primary"
                >
                  Buscar
                </Button>
                <Button
                  style={{ marginRight: "5px", marginTop: "10px" }}
                  variant="outline-info"
                  onClick={() => handleReset()}
                >
                  Limpiar
                </Button>
              </ButtonGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <h1>Subir Imagen</h1>
                <div class="inputWrapper">
                  <p style={{ fontSize: "100%", marginLeft: "10px" }}>
                    Subir archivo
                  </p>
                  <input
                    class="fileInput"
                    type="file"
                    name="file"
                    onChange={uploadImage}
                  />
                </div>
                {loading ? (
                  <h4>Subiendo...</h4>
                ) : (
                  <img src={image} style={{ width: "100px" }} />
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="Nombre"
                  id="Nombre"
                  value={Nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Liga</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Liga"
                  name="Liga"
                  id="Liga"
                  value={Liga}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button
                  id="Aceptar"
                  type="Submit"
                  variant="outline-success"
                  sizs="lg"
                >
                  {editMode ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <Table border hover responsive size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Liga</th>
                </tr>
              </thead>
              {data &&
                data.map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.Imagen}</td>
                      <td>{item.Nombre}</td>
                      <td>{item.Liga}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            id="Editar"
                            style={{ marginRight: "5px" }}
                            variant="outline-primary"
                            onClick={() => handleUpdate(item.id)}
                          >
                            Editar
                          </Button>
                          <Button
                            id="Eliminar"
                            style={{ marginRight: "5px" }}
                            variant="outline-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Elimiar
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Equipos;
