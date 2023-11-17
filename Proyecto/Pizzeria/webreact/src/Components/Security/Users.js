import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import imagen1 from "../../Assets/Images/Categorias/Pastas.jpg";
import imagen2 from "../../Assets/Images/Categorias/Pastas.jpg";
import imagen3 from "../../Assets/Images/Categorias/Pastas.jpg";

const CrudComponent = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    imagen: '',
    descripcion: '',
  });

  const [editedCategoria, setEditedCategoria] = useState({
    id: '',
    imagen: '',
    descripcion: '',
  });

  const [file, setFile] = useState(null);
  const [categorias, setCategorias] = useState([
    { id: 1, imagen: imagen1, descripcion: 'Pizzas' },
    { id: 2, imagen: imagen2, descripcion: 'Pastas' },
    { id: 3, imagen: imagen3, descripcion: 'Lasañas' },
  ]);
  const [autoIncrementId, setAutoIncrementId] = useState(categorias.length + 1);

  const onDrop = (acceptedFiles) => {
    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setFile({ file: acceptedFiles[0], url: fileUrl });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
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
      id: '',
      imagen: '',
      descripcion: '',
    });
    setShowModalEdit(false);
    setFile(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const postCategoria = () => {
    const newCategoria = {
      id: autoIncrementId,
      imagen: file ? file.url : '',
      descripcion: formData.descripcion,
    };

    setCategorias([...categorias, newCategoria]);
    setAutoIncrementId(autoIncrementId + 1);

    openCloseModalCreate();
  };

  const editCategoria = () => {
    const updatedCategorias = categorias.map((categoria) =>
      categoria.id === editedCategoria.id
        ? { ...editedCategoria, imagen: file ? file.url : categoria.imagen }
        : categoria
    );

    setCategorias(updatedCategorias);

    closeEditModal();
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Categorías</h1>
        <p className="text-center">
          <Button variant="success" onClick={openCloseModalCreate}>
            <i className="fas fa-plus"></i> Nueva Categoría
          </Button>
        </p>
      </div>

      <Modal show={showModalCreate} onHide={openCloseModalCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtId" name="id" value={autoIncrementId} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                {file ? (
                  <img src={file.url} alt="Imagen seleccionada" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                ) : (
                  <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción:</Form.Label>
              <Form.Control type="text" id="txtDescripcion" name="descripcion" placeholder="Descripción" required onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={postCategoria}>Crear</Button>
          <Button variant="outline-info" onClick={openCloseModalCreate}>Cancelar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalEdit} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Id:</Form.Label>
              <Form.Control type="text" id="txtIdEdit" name="id" value={editedCategoria.id} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen:</Form.Label>
              <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                {file ? (
                  <img src={file.url} alt="Imagen seleccionada" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                ) : (
                  <img src={editedCategoria.imagen} alt={`Imagen ${editedCategoria.descripcion}`} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                )}
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción:</Form.Label>
              <Form.Control type="text" id="txtDescripcionEdit" name="descripcion" value={editedCategoria.descripcion} onChange={(e) => setEditedCategoria({ ...editedCategoria, descripcion: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editCategoria}>Guardar Cambios</Button>
          <Button variant="outline-info" onClick={closeEditModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td><img src={categoria.imagen} alt={`Imagen ${categoria.descripcion}`} style={{ width: '120px', height: '120px' }} /></td>
                <td>{categoria.descripcion}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2" onClick={() => openEditModal(categoria)}>Editar</Button>
                  <Button variant="outline-danger" className="mr-2">Eliminar</Button>
                  <Button variant="outline-dark">Productos</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CrudComponent;
