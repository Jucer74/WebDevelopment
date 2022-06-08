import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table, Spinner } from "react-bootstrap";
import CustomModal from "../../../../components/CustomModal";
import EntityRow from "../../../../components/EntityRow";
import { Search } from "../../../../components/Search";
import { useQuery } from "../../../../hooks/useQuery";
import StudentService from "../../../../services/StudentService";
import utilsGetStudentForm from "../../utils/utilsGetStudentForm";

const STUDENT_FORM_INIT = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  dateOfBirth: "",
  residenceAdress: "",
};

export default function StudentList() {
  // BEGIN DATABASE
  const studentsService = new StudentService();
  const [studentsDb, setStudentsDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // END DATABASE
  // BEGIN FORMS
  const [typeStudentForm, setTypeStudentForm] = useState("");
  const [studentForm, setStudentForm] = useState(STUDENT_FORM_INIT);
  const [studentsDbUpdated, setStudentsDbUpdated] = useState(false);
  const handleStudentsDbUpdated = () => setStudentsDbUpdated(true);
  const handleStudentsDbNotUpdated = () => setStudentsDbUpdated(false);
  // END FORMS
  // BEGIN MODAL
  const [modalShow, setModalShow] = useState(false);
  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);
  // END MODAL
  // SEARCH INPUT
  const query = useQuery();
  const search = query.get("search") !== null ? query.get("search") : "";
  // END SEARCH INPUT
  // SUBMIT ACTIONS FORM
  const handleSubmitCreate = (newStudentForm) => {
    studentsService.addAsync(newStudentForm);
  };

  const handleSubmitEdit = (id, newStudentForm) => {
    studentsService.editAsync(id, newStudentForm);
  };
  const handleSubmitDelete = (id) => {
    studentsService.deleteAsync(id);
  };
  const getActionSubmitForm = (actionType) => {
    switch (actionType) {
      case "CREATE":
        return handleSubmitCreate;
      case "EDIT":
        return handleSubmitEdit;
      case "DELETE":
        return handleSubmitDelete;
      default:
        break;
    }
  };
  // END SUBMIT ACTIONS FORM
  const handlePushButton = (typeForm) => {
    setTypeStudentForm(typeForm);
    handleShowModal();
  };

  useEffect(() => {
    setIsLoading(true);
    handleStudentsDbNotUpdated();
    setStudentForm(STUDENT_FORM_INIT);
    studentsService.getAllAsync().then((data) => {
      setStudentsDb(
        data.filter((student) =>
          student.firstName.concat(student.lastName).includes(search)
        )
      );
    });
    setIsLoading(false);
  }, [studentsDbUpdated, search]);

  const renderData = () => {
    if (studentsDb.length > 0 && !isLoading) {
      return (
        <Table bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Residence Adress</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {studentsDb.map((student) => {
              return (
                <EntityRow
                  key={student.id}
                  entity={student}
                  setEntityForm={setStudentForm}
                  setTypeEntityForm={setTypeStudentForm}
                  handleShowModal={handleShowModal}
                />
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return (
        <Row className="justify-content-center text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      );
    }
  };

  return (
    <div>
      <Row className="justify-content-between my-3">
        <Col xs={8} sm={9} lg={10}>
          <Search actualRoute="Students"></Search>
        </Col>
        <Col xs={4} sm={3} lg={2} className="d-grid">
          <Button variant="success" onClick={() => handlePushButton("CREATE")}>
            Create
          </Button>
        </Col>
      </Row>
      {renderData()}
      <CustomModal
        modalShow={modalShow}
        handleCloseModal={handleCloseModal}
        modalTitle={"Student"}
        modalBodyContent={utilsGetStudentForm(
          typeStudentForm,
          studentForm,
          setStudentForm,
          handleStudentsDbUpdated,
          getActionSubmitForm(typeStudentForm),
          handleCloseModal
        )}
      />
    </div>
  );
}
