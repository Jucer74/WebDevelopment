import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon as Fas } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button, Container, Table, Form } from 'react-bootstrap';

const baseUrl = "https://localhost:5001/api/accounts";


export function AccountList() {


    const [data, setData] = useState([]);

    // Control data
    const [currentAccount, setCurrentAccount] = useState({
        id: '',
        accountType: '',
        creationDate: '',
        accountNumber: '',
        ownerName: '', 
        balanceAmount: '',
        overdraftAmount: ''
    });


    const getAccounts = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentAccount({
            ...currentAccount,
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





    const postAccount = async () => {
        delete currentAccount.id;
        await axios.post(baseUrl, currentAccount)
            .then(response => {
                getAccounts();
                openCloseModalCreate();
            }).catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        getAccounts();
    }, []);

    // Update
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const openCloseModalUpdate = () => {
        setShowModalUpdate(!showModalUpdate);
    }









    const selectCurrentAccount = (account, action) => {
        setCurrentAccount(account);
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



    const deleteAccount = async () => {
        await axios.delete(baseUrl + "/" + currentAccount.id)
            .then(() => {
                setData(data.filter(ca => ca.id !== currentAccount.id));
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





    const putAccount = async () => {
        await axios.put(baseUrl + "/" + currentAccount.id, currentAccount)
            .then(response => {
                var result = response.data;
                var updatedData = data;
                updatedData.map(ca => {
                    if (ca.id === currentAccount.id) {
                        ca.accountType = result.accountType;
                        ca.creationDate = result.creationDate;
                        ca.accountNumber = result.accountNumber;
                        ca.ownerName = result.ownerName;
                        ca.balanceAmount = result.balanceAmount;
                        ca.overdraftAmount = result.overdraftAmount;
                    }
                });
                getAccounts();
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
            <h1>Accounts List</h1>
            <p>
                <Button className="left" variant="success btn-sm" onClick={() => openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
            </p>
            <Table id="AccountsTable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>accountType</th>
                        <th>creationDate</th>
                        <th>accountNumber</th>
                        <th>ownerName</th>
                        <th>balanceAmount</th>
                        <th>overdraftAmount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(ca => (
                        <tr key={ca.id}>
                            <td>{ca.id}</td>
                            <td>{ca.accountType}</td>
                            <td>{ca.creationDate}</td>
                            <td>{ca.accountNumber}</td>
                            <td>{ca.ownerName}</td>
                            <td>{ca.balanceAmount}</td>
                            <td>{ca.overdraftAmount}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => selectCurrentAccount(ca, "Edit")}>Edit</Button>{"  "}
                                <Button variant="outline-warning" onClick={() => selectCurrentAccount(ca, "Details")}>Details</Button>{"  "}
                                <Button variant="outline-danger" onClick={() => selectCurrentAccount(ca, "Delete")}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            {/* Create */}
            <Modal isOpen={showModalCreate}>
                <ModalHeader>Create Account</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label> AccountType:</Form.Label>
                            <Form.Control type="text" id="txtAccountType" name="accountType" placeholder="saving" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> creationDate:</Form.Label>
                            <Form.Control type="text" id="txtCreationDate" name="creationDate" placeholder="2023-01-01" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> AccountNumber:</Form.Label>
                            <Form.Control type="text" id="txtAccountNumber" name="accountNumber" placeholder="123456789" required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ownerName:</Form.Label>
                            <Form.Control type="text" id="txtOwnerName" name="ownerName" placeholder='miguel cordoba' required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>balanceAmount:</Form.Label>
                            <Form.Control type="number" id="txtBalanceAmount" name="balanceAmount" placeholder='1000' required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>overdraftAmount:</Form.Label>
                            <Form.Control type="number" id="txtOverdraftAmount" name="overdraftAmount" placeholder='0' required onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => postAccount()}>Create</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalCreate()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Details */}
            <Modal isOpen={showModalDetails}>
                <ModalHeader>Details Account</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentAccount && currentAccount.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>accountType:</Form.Label>
                            <Form.Control type="text" id="txtAccountType" name="accountType" readOnly value={currentAccount && currentAccount.accountType} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>creationDate:</Form.Label>
                            <Form.Control type="text" id="txtCreationDate" name="creationDate" readOnly value={currentAccount && currentAccount.creationDate} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>accountNumber:</Form.Label>
                            <Form.Control type="text" id="txtAccountNumber" name="accountNumber" readOnly value={currentAccount && currentAccount.accountNumber} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ownerName:</Form.Label>
                            <Form.Control type="text" id="txtOwnerName" name="ownerName" readOnly value={currentAccount && currentAccount.ownerName} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>balanceAmount:</Form.Label>
                            <Form.Control type="number" id="txtBalanceAmount" name="balanceAmount" readOnly value={currentAccount && currentAccount.balanceAmount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>overdraftAmount:</Form.Label>
                            <Form.Control type="number" id="txtOverdraftAmount" name="overdraftAmount" readOnly value={currentAccount && currentAccount.overdraftAmount} />
                        </Form.Group>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline-info" onClick={() => openCloseModalDetails()}>Back</Button>
                </ModalFooter>
            </Modal>


            {/* Delete */}
            <Modal isOpen={showModalDelete}>
                <ModalHeader>Are you sure to delete this Account?</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label><b>Id:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.id}</Form.Label><br />
                            <Form.Label><b>accountType:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.accountType}</Form.Label><br />
                            <Form.Label><b>creationDate:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.creationDate}</Form.Label><br />
                            <Form.Label><b>accountNumber:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.accountNumber}</Form.Label><br />
                            <Form.Label><b>ownerName:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.ownerName}</Form.Label><br />
                            <Form.Label><b>balanceAmount:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.balanceAmount}</Form.Label><br />
                            <Form.Label><b>overdraftAmount:</b></Form.Label>
                            <Form.Label>{currentAccount && currentAccount.overdraftAmount}</Form.Label><br />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => deleteAccount(currentAccount.id)}>Delete</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalDelete()}>Back</Button>
                </ModalFooter>
            </Modal>

            {/* Update */}
            <Modal isOpen={showModalUpdate}>
                <ModalHeader>Edit Account</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group>
                            <Form.Label>Id:</Form.Label>
                            <Form.Control type="text" id="txtId" name="id" readOnly value={currentAccount && currentAccount.id} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>accountType:</Form.Label>
                            <Form.Control type="text" id="txtAccountType" name="accountType" placeholder="saving" required onChange={handleChange} value={currentAccount && currentAccount. accountType} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>creationDate:</Form.Label>
                            <Form.Control type="text" id="txtCreationDate" name="creationDate" placeholder="2023-01-01" required onChange={handleChange} value={currentAccount && currentAccount.creationDate} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>accountNumber:</Form.Label>
                            <Form.Control type="text" id="txtAccountNumber" name="accountNumber" placeholder="123456789" required onChange={handleChange} value={currentAccount && currentAccount.accountNumber} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ownerName:</Form.Label>
                            <Form.Control type="text" id="txtOwnerName" name="ownerName" placeholder="miguel cordoba" required onChange={handleChange} value={currentAccount && currentAccount.ownerName} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>balanceAmount:</Form.Label>
                            <Form.Control type="number" id="txtBalanceAmount" name="balanceAmount" placeholder="1000" required onChange={handleChange} value={currentAccount && currentAccount.balanceAmount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>overdraftAmount:</Form.Label>
                            <Form.Control type="number" id="txtOverdraftAmount" name="overdraftAmount" placeholder="0" required onChange={handleChange} value={currentAccount && currentAccount.overdraftAmount} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => putAccount()}>Save</Button>
                    <Button variant="outline-info" onClick={() => openCloseModalUpdate()}>Back</Button>
                </ModalFooter>
            </Modal>

        </Container>


    );
}
export default AccountList;