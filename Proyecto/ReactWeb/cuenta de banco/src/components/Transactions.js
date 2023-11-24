import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';

const baseUrl = "https://localhost:5001/api/transactions";


export function TransactionList() {


    const [data, setData] = useState([]);

    // Control data
    const [currentTransaction, setCurrentTransaction] = useState({
        transactionId: '',
        accountId: '',
        amount: '',
        transactionType: '',
        transactionDate: ''
    });


    const getTransactions = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentTransaction({
            ...currentTransaction,
            [name]: value
        })
    }

    // Create 
    const [showModalCreate, setShowModalCreate] = useState(false);
    const openCloseModalCreate = () => {
        console.log(showModalCreate);
        setShowModalCreate(!showModalCreate);
        console.log(showModalCreate);
    }





    const postTransaction = async () => {
        // Validación de la fecha
        if (!isValidDate(currentTransaction.transactionDate)) {
            console.error("Fecha no válida");
            return;
        }
    
        delete currentTransaction.transactionId;
    
        try {
            await axios.post(baseUrl, currentTransaction);
            getTransactions();
            openCloseModalCreate();
        } catch (error) {
            console.log(error);
        }
    }
    
    // Función para validar la fecha
    const isValidDate = (dateString) => {
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    
        if (!regexDate.test(dateString)) {
            return false;
        }
    
        const dateParts = dateString.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
    
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            return false;
        }
    
        const validDate = new Date(year, month - 1, day);
        return validDate.getFullYear() === year && validDate.getMonth() === month - 1 && validDate.getDate() === day;
    };
    


    useEffect(() => {
        getTransactions();
    }, []);

    // Update
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const openCloseModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
    }









    const selectCurrentTransaction = (Transaction, action) => {
        setCurrentTransaction(Transaction);
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
    }



    const deleteTransaction = async () => {
        await axios.delete(baseUrl + "/" + currentTransaction.transactionId)
            .then(() => {
                setData(data.filter(tr => tr.transactionId !== currentTransaction.transactionId));
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }


    // Delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const openCloseModalDelete = () => {
        setShowModalDelete(!showModalDelete);
    }





    const putTransaction = async () => {
        await axios.put(baseUrl + "/" + currentTransaction.transactionId, currentTransaction)
            .then(response => {
                var result = response.data;
                var updatedData = data;
                updatedData.map(tr => {
                    if (tr.transactionId === currentTransaction.transactionId) {
                        tr.accountId = result.accountId;
                        tr.amount = result.amount;
                        tr.transactionType = result.transactionType;
                        tr.transactionDate = result.transactionDate;
                    }
                });
                getTransactions();
                openCloseModalUpdate();
            }).catch(error => {
                console.log(error);
            })
    }

    // Details
    const [showModalDetails, setShowModalDetails] = useState(false);
    const openCloseModalDetails = () => {
        setShowModalDetails(!showModalDetails);
    }






    return (
        <Container className="text-center text-md-left">
            <h1>Transaction List</h1>
            <p>
                <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
            </p>
            <Table id="UsersTable">
                <thead>
                    <tr>
                        <th>transaction_id</th>
                        <th>account_id</th>
                        <th>amount</th>
                        <th>transaction_type</th>
                        <th>transaction_date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(tr => (
                        <tr key={tr.transactionId}>
                            <td>{tr.transactionId}</td>
                            <td>{tr.accountId}</td>
                            <td>{tr.amount}</td>
                            <td>{tr.transactionType}</td>
                            <td>{tr.transactionDate}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => selectCurrentTransaction(tr, "Edit")}>Edit</Button>{"  "}
                                <Button variant="outline-warning" onClick={() => selectCurrentTransaction(tr, "Details")}>Details</Button>{"  "}
                                <Button variant="outline-danger" onClick={() => selectCurrentTransaction(tr, "Delete")}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            {/* Create */}
            <Modal isOpen={showModalCreate}>
                <ModalHeader>Create Transaction</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>account_id:</Form.Label>
                            <Form.Control type="text" id="txtAccountId" name="accountId" placeholder="1" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>amount:</Form.Label>
                            <Form.Control type="numeric" id="txtAmount" name="amount" placeholder="100000" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_type:</Form.Label>
                            <Form.Control type="text" id="txtTransactionType" name=" transactionType" placeholder="Deposit" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_date:</Form.Label>
                            <Form.Control type="text" id="txtTransactionDate" name=" transactionDate" placeholder='2023-01-01' onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => postTransaction()}>Create</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Details */}
            <Modal isOpen={showModalDetails}>
                <ModalHeader>Details Transaction</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>transaction_id:</Form.Label>
                            <Form.Control type="text" id="txtTransactionId" name="transactionId" readOnly value={currentTransaction && currentTransaction.transactionId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>account_id:</Form.Label>
                            <Form.Control type="text" id="txtAccountId" name="AccountId" readOnly value={currentTransaction && currentTransaction.accountId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>amount:</Form.Label>
                            <Form.Control type="numeric" id="txtAmount" name=" amount" readOnly value={currentTransaction && currentTransaction.amount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_type:</Form.Label>
                            <Form.Control type="text" id="txtTransactionType" name="transactionType" readOnly value={currentTransaction && currentTransaction.transactionType} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_date:</Form.Label>
                            <Form.Control type="text" id="txtTransactionDate:" name="transactionDate:" readOnly value={currentTransaction && currentTransaction.transactionDate} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Delete */}
            <Modal isOpen={showModalDelete}>
                <ModalHeader>Are you sure to delete this user?</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label><b>transaction_id:</b></Form.Label>
                            <Form.Label>{currentTransaction && currentTransaction.transactionId}</Form.Label><br />
                            <Form.Label><b>account_id:</b></Form.Label>
                            <Form.Label>{currentTransaction && currentTransaction.accountId}</Form.Label><br />
                            <Form.Label><b>amount:</b></Form.Label>
                            <Form.Label>{currentTransaction && currentTransaction.amount}</Form.Label><br />
                            <Form.Label><b>transaction_type:</b></Form.Label>
                            <Form.Label>{currentTransaction && currentTransaction.transactionType}</Form.Label><br />
                            <Form.Label><b>transaction_date:</b></Form.Label>
                            <Form.Label>{currentTransaction && currentTransaction.transactionDate}</Form.Label><br />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => deleteTransaction(currentTransaction.transactionId)}>Delete</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
                </ModalFooter>
            </Modal>

            {/* Update */}
            <Modal isOpen={showModalUpdate}>
                <ModalHeader>Edit Transaction</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>transaction_id:</Form.Label>
                            <Form.Control type="text" id="txtTransactionId" name="transactionId" readOnly value={currentTransaction && currentTransaction.transactionId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>account_id:</Form.Label>
                            <Form.Control type="text" id="txtAccountId" name="accountId" readOnly value={currentTransaction && currentTransaction.accountId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >amount:</Form.Label>
                            <Form.Control type="text" id="txtAmount" name="amount" placeholder="1000000" required onChange={handleChange} value={currentTransaction && currentTransaction.amount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_type:</Form.Label>
                            <Form.Control type="text" id="txtTransactionType" name="transactionType" placeholder="Withdrawal" required onChange={handleChange} value={currentTransaction && currentTransaction.transactionType} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>transaction_date:</Form.Label>
                            <Form.Control type="text" id="txtTransactionDate" name="transactionDate"  placeholder="2023-01-01" required onChange={handleChange} value={currentTransaction && currentTransaction.transactionDate} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => putTransaction()}>Save</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
                </ModalFooter>
            </Modal>

        </Container>


    );
}
export default TransactionList;