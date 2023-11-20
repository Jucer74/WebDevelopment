import React, { useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import imagen1 from "../../Assets/Images/Categorias/Pizzas.jpg";
import imagen2 from "../../Assets/Images/Categorias/Pastas.jpg";
import imagen3 from "../../Assets/Images/Categorias/Lasañas.jpg";

export const CrudComponent = () => {

  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const toggleProductos = (categoriaId) => {
    setExpandedCategoryId((prevCategoryId) =>
      prevCategoryId === categoriaId ? null : categoriaId
    );
    if (!productosPorCategoria[categoriaId]) {
      obtenerProductosPorCategoria(categoriaId);
    }
  };


  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState(null);

  const openInfoModal = (category) => {
    setSelectedCategoryInfo(category);
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setSelectedCategoryInfo(null);
    setShowInfoModal(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Establece el número deseado de elementos por página

  const [productosPorCategoria, setProductosPorCategoria] = useState({});
  const obtenerProductosPorCategoria = (categoriaId) => {
    // Aquí deberías implementar la lógica para obtener los productos de la categoría con el id proporcionado.
    // Por ahora, se proporciona un ejemplo estático.
    const productosEjemplo = [
      {
        id: 1,
        categoriaId: 1,
        imagen: "producto1.jpg",
        nombre: "Producto 1",
        precio: 10.99,
      },
      {
        id: 2,
        categoriaId: 1,
        imagen: "producto2.jpg",
        nombre: "Producto 2",
        precio: 15.99,
      },
      // Agrega más productos según sea necesario
    ];

    setProductosPorCategoria({
      ...productosPorCategoria,
      [categoriaId]: productosEjemplo,
    });
  };

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    imagen: "",
    descripcion: "",
  });

  const [editedCategoria, setEditedCategoria] = useState({
    id: "",
    imagen: "",
    descripcion: "",
  });

  const [file, setFile] = useState(null);
  const [categorias, setCategorias] = useState([
    { id: 1, imagen: imagen1, descripcion: "Pizzas" },
    { id: 2, imagen: imagen2, descripcion: "Pastas" },
    { id: 3, imagen: imagen3, descripcion: "Lasañas" },
  ]);
  const [autoIncrementId, setAutoIncrementId] = useState(categorias.length + 1);

  const onDrop = (acceptedFiles) => {
    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setFile({ file: acceptedFiles[0], url: fileUrl });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const openCloseModalCreate = () => {
    setShowModalCreate(!showModalCreate);
    setFile(null);
  };

  const openEditModal = (categoria) => {
    setEditedCategoria(categoria);
    setShowModalEdit(true);
  };

  const closeEditModal = () => {
    setEditedCategoria({
      id: "",
      imagen: "",
      descripcion: "",
    });
    setShowModalEdit(false);
    setFile(null);
    setCategoryIdToDelete(null); // Agregar esta línea para borrar la confirmación
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const postCategoria = () => {
    // Validar que la descripción no esté vacía y que se haya seleccionado una imagen

    if (!file) {
      alert("Por favor, selecciona una imagen para la categoría.");
      return;
    }

    if (formData.descripcion.trim() === "") {
      alert("Por favor, ingresa una descripción para la categoría.");
      return;
    }

    const newCategoria = {
      id: autoIncrementId,
      imagen: file ? file.url : "",
      descripcion: formData.descripcion,
    };

    setCategorias([...categorias, newCategoria]);
    setAutoIncrementId(autoIncrementId + 1);

    openCloseModalCreate();
  };

  const editCategoria = () => {
    if (editedCategoria.descripcion.trim() === "") {
      alert("Por favor, ingresa una descripción para la categoría.");
      return;
    }

    const updatedCategorias = categorias.map((categoria) =>
      categoria.id === editedCategoria.id
        ? { ...editedCategoria, imagen: file ? file.url : categoria.imagen }
        : categoria
    );

    setCategorias(updatedCategorias);

    closeEditModal();
  };

  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const deleteCategoria = () => {
    const updatedCategorias = categorias.filter(
      (categoria) => categoria.id !== categoryIdToDelete
    );
    setCategorias(updatedCategorias);
    setCategoryIdToDelete(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categorias.slice(indexOfFirstItem, indexOfLastItem);

  //productos -------------------------------------------------------------------------------
  
  // Agrega el estado y la función para controlar el modal de Nuevo Producto
  const [autoIncrementProductId, setAutoIncrementProductId] = useState(1);
  const [showModalCreateProducto, setShowModalCreateProducto] = useState(false);
  // const [productoIdToDelete, setProductoIdToDelete] = useState(null);
  const [
    showDeleteProductoConfirmationModal,
    setShowDeleteProductoConfirmationModal,
  ] = useState(false);

  const openNuevoProductoModal = (categoriaId) => {
    // Puedes establecer el estado o realizar otras acciones necesarias aquí
    setShowModalCreateProducto(true);
  };

  const closeNuevoProductoModal = () => {
    // Puedes realizar acciones de limpieza o establecer el estado aquí
    setShowModalCreateProducto(false);
  };

  const postProducto = () => {
    // Agrega la lógica para crear un nuevo producto aquí
    // Puedes utilizar la información del formulario y realizar las acciones necesarias
    // No olvides cerrar el modal después de crear el producto
    closeNuevoProductoModal();
  };

  const openEditModalProducto = (producto) => {
    // Agrega la lógica para abrir el modal de edición de producto
    // Puedes utilizar la información del producto para inicializar el formulario de edición
  };

  const setProductoIdToDelete = (productId) => {
    // Agrega la lógica para establecer el id del producto a eliminar
    // Puedes utilizar este id más tarde en la función deleteProducto
    setProductoIdToDelete(productId);
    setShowDeleteProductoConfirmationModal(true);
  };

  const deleteProducto = () => {
    // Agrega la lógica para eliminar el producto con el id almacenado en productoIdToDelete
    // No olvides cerrar el modal de confirmación después de eliminar el producto
    setShowDeleteProductoConfirmationModal(false);
  };

  return (
    <>

<Modal show={showInfoModal} onHide={closeInfoModal}>
  <Modal.Header closeButton>
    <Modal.Title>Información de la Categoría</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedCategoryInfo && (
      <>
        <p>ID: {selectedCategoryInfo.id}</p>
        <p>Categoría: {selectedCategoryInfo.descripcion}</p>
        {selectedCategoryInfo.imagen && (
          <div>
            <p>Imagen:</p>
            <img
              src={selectedCategoryInfo.imagen}
              alt={`Imagen ${selectedCategoryInfo.descripcion}`}
              style={{ maxWidth: '100%', maxHeight: '700px' }}
            />
          </div>
        )}
        {/* Add more information as needed */}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline-info" onClick={closeInfoModal}>
      Cerrar
    </Button>
  </Modal.Footer>
</Modal>

      
      <Modal show={showModalCreate} onHide={openCloseModalCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control
                type="text"
                id="txtId"
                name="id"
                value={autoIncrementId}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <div
                {...getRootProps()}
                style={{
                  border: "1px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                {file ? (
                  <img
                    src={file.url}
                    alt="Imagen seleccionada"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <p>
                    Arrastra y suelta una imagen aquí, o haz clic para
                    seleccionar una.
                  </p>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                id="txtDescripcion"
                name="descripcion"
                placeholder="Descripción"
                required
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={postCategoria}>
            Crear
          </Button>
          <Button variant="outline-info" onClick={openCloseModalCreate}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title className="disabled">Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control
                type="text"
                id="txtIdEdit"
                name="id"
                value={editedCategoria.id}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <div
                {...getRootProps()}
                style={{
                  border: "1px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />
                {file ? (
                  <img
                    src={file.url}
                    alt="Imagen seleccionada"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <img
                    src={editedCategoria.imagen}
                    alt={`Imagen ${editedCategoria.descripcion}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                id="txtDescripcionEdit"
                name="descripcion"
                value={editedCategoria.descripcion}
                onChange={(e) =>
                  setEditedCategoria({
                    ...editedCategoria,
                    descripcion: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editCategoria}>
            Guardar Cambios
          </Button>
          <Button variant="outline-info" onClick={closeEditModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirmationModal}
        onHide={() => setShowDeleteConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteCategoria();
              setShowDeleteConfirmationModal(false);
            }}
          >
            Sí, Eliminar
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmationModal(false)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalCreateProducto} onHide={closeNuevoProductoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              {/* Puedes utilizar una lógica similar a la del Id de la categoría */}
              {/* Aquí, estoy usando un ejemplo simple con autoincremento */}
              <Form.Control
                type="text"
                id="txtIdProducto"
                name="id"
                value={autoIncrementProductId}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              {/* Aquí, deberías implementar la funcionalidad para cargar la imagen */}
              {/* Puedes utilizar la misma lógica que en el formulario de nueva categoría */}
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                id="txtNombreProducto"
                name="nombre"
                placeholder="Nombre"
                required
                // Agrega la función onChange correspondiente
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Precio:</Form.Label>
              <Form.Control
                type="number"
                id="txtPrecioProducto"
                name="precio"
                placeholder="Precio"
                required
                // Agrega la función onChange correspondiente
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={postProducto}>
            Crear
          </Button>
          <Button variant="outline-info" onClick={closeNuevoProductoModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Categorias</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((categoria) => (
              <React.Fragment key={categoria.id}>
                <tr>
                  <td>{categoria.id}</td>
                  <td>
                    <img
                      src={categoria.imagen}
                      alt={`Imagen ${categoria.descripcion}`}
                      style={{ height: "100px" }}
                    />
                  </td>
                  <td> {categoria.descripcion}</td>
                  <td className="">
                    <Button
                      variant="outline-success"
                      className="m-2"
                      onClick={openCloseModalCreate}
                    >
                      <i className="fas fa-plus "></i> Nueva Categoría
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="m-2"
                      onClick={() => openEditModal(categoria)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="m-2"
                      onClick={() => {
                        setCategoryIdToDelete(categoria.id);
                        setShowDeleteConfirmationModal(true);
                      }}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="outline-warning"
                      className="m-2"
                      onClick={() => openInfoModal(categoria)}
                    >
                      Información
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="m-2"
                      onClick={() => toggleProductos(categoria.id)}
                    >
                      Productos
                    </Button>
                  </td>
                </tr>
                {productosPorCategoria[categoria.id] && (
                  <tr>
                    <td colSpan="6">
                      <Table striped bordered responsive>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Categoría Id</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productosPorCategoria[categoria.id].map(
                            (producto) => (
                              <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.categoriaId}</td>
                                <td>
                                  <img
                                    src={producto.imagen}
                                    alt={`Imagen ${producto.nombre}`}
                                    style={{ height: "50px" }}
                                  />
                                </td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>
                                <Button
                                variant="outline-success"
                                className="m-2"
                                onClick={() =>
                                  openNuevoProductoModal(categoria.id)
                                }
                              >
                                Nuevo Producto
                              </Button>
                                  
                                  <Button
                                    variant="outline-primary"
                                    className="m-2"
                                    onClick={() =>
                                      openEditModalProducto(producto)
                                    }
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    className="m-2"
                                    onClick={() => {
                                      setProductoIdToDelete(producto.id);
                                      setShowDeleteProductoConfirmationModal(
                                        true
                                      );
                                    }}
                                  >
                                    Eliminar
                                  </Button>

                                  <Button
                                  className="m-2"
                                    variant="outline-dark"
                                    onClick={() =>
                                      setProductosPorCategoria({
                                        ...productosPorCategoria,
                                        [categoria.id]: null,
                                      })
                                    }
                                  >
                                    Cerrar
                                  </Button>
                                </td>
                              </tr>
                            )
                          )}
                          
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <div
          className="pagination"
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="mx-2">
            Página {currentPage} de{" "}
            {Math.ceil(categorias.length / itemsPerPage)}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(categorias.length / itemsPerPage)
            }
          >
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
};

export default CrudComponent;
