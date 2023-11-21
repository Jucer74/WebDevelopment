import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon as Fas } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:8000/api/transactions";

export function Transactions() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [currentTransaction, setCurrentTransaction] = useState({
    transaction_id: "",
    user_id: "",
    amount: 0.0,
    transaction_type: "",
    image_path: "",
    transaction_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({
      ...currentTransaction,
      [name]: value,
    });
  };

  // Create
  const [showModalCreate, setShowModalCreate] = useState(false);
  const openCloseModalCreate = () => {
    setCurrentTransaction({
      transaction_id: "",
      user_id: "",
      amount: 0.0,
      transaction_type: "",
      image_path: "",
      transaction_date: "",
    });
    setShowModalCreate(!showModalCreate);
  };

  const postTransaction = async () => {
    delete currentTransaction.transaction_id;
    await axios
      .post(baseUrl, currentTransaction)
      .then((response) => {
        getTransactions();
        openCloseModalCreate();
      })
      .catch((error) => {
        console.log(error);
      });

    // Validaciones
    if (
      !currentTransaction.user_id ||
      !currentTransaction.amount ||
      !currentTransaction.transaction_type ||
      !currentTransaction.image_path ||
      !currentTransaction.transaction_date
    ) {
      toast.error("Por favor rellena todos los campos.");
      return;
    }

    try {
      delete currentTransaction.transaction_id;
      const response = await axios.post(baseUrl, currentTransaction);
      if (response.status === 201) {
        toast.success("¡Transacción creada exitosamente!");
        getTransactions();
        openCloseModalCreate();
      }
    } catch (error) {
      console.error(error);
      toast.error("Se ha producido un error al crear la transacción.");
    }
  };

  // Details
  const [showModalDetails, setShowModalDetails] = useState(false);
  const openCloseModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  };

  // Update
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const openCloseModalUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  const selectCurrentTransaction = (transaction, action) => {
    setCurrentTransaction(transaction);
    switch (action) {
      case "Edit":
        openCloseModalUpdate();
        break;
      case "Details":
        openCloseModalDetails();
        break;
      case "Delete":
        openCloseModalDelete();
        break;
      default:
        break;
    }
  };

  const putTransaction = async () => {
    await axios
      .put(
        baseUrl + "/" + currentTransaction.transaction_id,
        currentTransaction
      )
      .then(() => {
        getTransactions();
        openCloseModalUpdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const openCloseModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const deleteTransaction = async () => {
    await axios
      .delete(baseUrl + "/" + currentTransaction.transaction_id)
      .then(() => {
        setData(
          data.filter(
            (transaction) =>
              transaction.transaction_id !== currentTransaction.transaction_id
          )
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTransactions = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  return (
    <Container className="text-center text-md-left mt-4">
      <h1 className="mb-4">Lista De Transacciones</h1>
      <p className="mb-3">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="success btn-sm" onClick={() => openCloseModalCreate()}>
          <Fas icon={faPlus} /> Nuevo
        </Button>
      </p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID de Transacción</th>
            <th>ID de Usuario</th>
            <th>Monto</th>
            <th>Tipo de Transacción</th>
            <th>Ruta de la Imagen</th>
            <th>Fecha de Transacción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (transaction) =>
                transaction.user_id.toString().includes(searchTerm) ||
                transaction.amount.toString().includes(searchTerm) ||
                transaction.transaction_type.toLowerCase().includes(searchTerm)
            )
            .map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.user_id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transaction_type}</td>
                <td>
                  {transaction.image_path && (
                    <img
                      src={`http://localhost:8000/api/transactions/${transaction.image_path}`}
                      alt="Transaction Image"
                      className="img-fluid"
                    />
                  )}
                </td>
                <td>{transaction.transaction_date}</td>
                <td className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      selectCurrentTransaction(transaction, "Edit")
                    }
                    className="ms-1 mb-1"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() =>
                      selectCurrentTransaction(transaction, "Details")
                    }
                    className="ms-1 mb-1"
                  >
                    Detalles
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      selectCurrentTransaction(transaction, "Delete")
                    }
                    className="ms-1 mb-1"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Create Transaction Modal */}
      <Modal isOpen={showModalCreate} toggle={openCloseModalCreate}>
        <ModalHeader>Crear Transacción</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>ID de Usuario:</Form.Label>
              <Form.Control
                type="number"
                id="txtUserId"
                name="user_id"
                placeholder="ID de Usuario"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Monto:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                id="txtAmount"
                name="amount"
                placeholder="Monto"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo de Transacción:</Form.Label>
              <Form.Select
                id="txtTransactionType"
                name="transaction_type"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione Tipo de Transacción
                </option>
                <option value="Deposit">Depósito</option>
                <option value="Withdrawal">Retiro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ruta de la Imagen:</Form.Label>
              <Form.Control
                type="text"
                id="txtImagePath"
                name="image_path"
                placeholder="Ruta de la Imagen"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => postTransaction()}>
            Crear
          </Button>
          <Button variant="outline-info" onClick={openCloseModalCreate}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Update Transaction Modal */}
      <Modal isOpen={showModalUpdate} toggle={openCloseModalUpdate}>
        <ModalHeader>Editar Transacción</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>ID de Transacción:</Form.Label>
              <Form.Control
                type="text"
                id="txtTransactionId"
                name="transaction_id"
                readOnly
                value={currentTransaction && currentTransaction.transaction_id}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID de Usuario:</Form.Label>
              <Form.Control
                type="text"
                id="txtUserId"
                name="user_id"
                readOnly
                value={currentTransaction && currentTransaction.user_id}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Monto:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                id="txtAmount"
                name="amount"
                value={currentTransaction && currentTransaction.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo de Transacción:</Form.Label>
              <Form.Select
                id="txtTransactionType"
                name="transaction_type"
                onChange={handleChange}
                value={
                  currentTransaction && currentTransaction.transaction_type
                }
              >
                <option value="Deposit">Depósito</option>
                <option value="Withdrawal">Retiro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Ruta de la Imagen:</Form.Label>
              <Form.Control
                type="text"
                id="txtImagePath"
                name="image_path"
                value={currentTransaction && currentTransaction.image_path}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => putTransaction()}>
            Guardar
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Details Transaction Modal */}
      <Modal isOpen={showModalDetails} toggle={openCloseModalDetails} size="lg">
        <ModalHeader>Detalles de la Transacción</ModalHeader>
        <ModalBody>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>
                  <b>ID de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_id}
                </td>
              </tr>
              <tr>
                <td>
                  <b>ID de Usuario:</b>
                </td>
                <td>{currentTransaction && currentTransaction.user_id}</td>
              </tr>
              <tr>
                <td>
                  <b>Monto:</b>
                </td>
                <td>{currentTransaction && currentTransaction.amount}</td>
              </tr>
              <tr>
                <td>
                  <b>Tipo de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_type}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ruta de la Imagen:</b>
                </td>
                <td>{currentTransaction && currentTransaction.image_path}</td>
              </tr>
              <tr>
                <td>
                  <b>Fecha de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_date}
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline-info"
            onClick={() => openCloseModalDetails()}
          >
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Transaction Modal */}
      <Modal isOpen={showModalDelete} toggle={openCloseModalDelete} size="lg">
        <ModalHeader>¿Estás seguro de eliminar esta transacción?</ModalHeader>
        <ModalBody>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>
                  <b>ID de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_id}
                </td>
              </tr>
              <tr>
                <td>
                  <b>ID de Usuario:</b>
                </td>
                <td>{currentTransaction && currentTransaction.user_id}</td>
              </tr>
              <tr>
                <td>
                  <b>Monto:</b>
                </td>
                <td>{currentTransaction && currentTransaction.amount}</td>
              </tr>
              <tr>
                <td>
                  <b>Tipo de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_type}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Ruta de la Imagen:</b>
                </td>
                <td>{currentTransaction && currentTransaction.image_path}</td>
              </tr>
              <tr>
                <td>
                  <b>Fecha de Transacción:</b>
                </td>
                <td>
                  {currentTransaction && currentTransaction.transaction_date}
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="danger"
            onClick={() => deleteTransaction(currentTransaction.transaction_id)}
          >
            Eliminar
          </Button>
          <Button variant="outline-info" onClick={() => openCloseModalDelete()}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </Container>
  );
}
