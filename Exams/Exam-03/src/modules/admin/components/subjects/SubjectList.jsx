import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import CustomModal from "../../../../components/CustomModal";
import EntityRow from "../../../../components/EntityRow";
import { Search } from "../../../../components/Search";
import { useQuery } from "../../../../hooks/useQuery";
import SubjectService from "../../../../services/SubjectService";
import utilsGetSubjectForm from "../../utils/utilsGetSubjectForm";

const SUBJECT_FORM_INIT = {
  id: "",
  name: "",
  description: "",
  dateOfCreation: "",
};

export default function SubjectList() {
  // BEGIN DATABASE
  const subjectService = new SubjectService();
  const [subjectsDb, setSubjectsDb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // END DATABASE
  // BEGIN FORMS
  const [typeSubjectForm, setTypeSubjectForm] = useState("");
  const [subjectForm, setSubjectForm] = useState(SUBJECT_FORM_INIT);
  const [subjectsDbUpdated, setSubjectsDbUpdated] = useState(false);
  const handleSubjectsDbUpdated = () => setSubjectsDbUpdated(true);
  const handleSubjectsDbNotUpdated = () => setSubjectsDbUpdated(false);
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
  const handleSubmitCreate = (newSubjectForm) => {
    subjectService.addAsync(newSubjectForm);
  };

  const handleSubmitEdit = (id, newSubjectForm) => {
    subjectService.editAsync(id, newSubjectForm);
  };
  const handleSubmitDelete = (id) => {
    subjectService.deleteAsync(id);
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
    setTypeSubjectForm(typeForm);
    handleShowModal();
  };

  useEffect(() => {
    setIsLoading(true);
    handleSubjectsDbNotUpdated();
    setSubjectForm(SUBJECT_FORM_INIT);
    subjectService.getAllAsync().then((data) => {
      setSubjectsDb(
        data.filter((subject) =>
          subject.name.concat(subject.description).includes(search)
        )
      );
    });
    setIsLoading(false);
  }, [subjectsDbUpdated, search]);

  const renderData = () => {
    if (subjectsDb.length > 0 && !isLoading) {
      return (
        <Table bordered hover responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date Of Creation</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {subjectsDb.map((subject) => {
              return (
                <EntityRow
                  key={subject.id}
                  entity={subject}
                  setEntityForm={setSubjectForm}
                  setTypeEntityForm={setTypeSubjectForm}
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
          <Search actualRoute="Subjects"></Search>
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
        modalTitle={"Subject"}
        modalBodyContent={utilsGetSubjectForm(
          typeSubjectForm,
          subjectForm,
          setSubjectForm,
          handleSubjectsDbUpdated,
          getActionSubmitForm(typeSubjectForm),
          handleCloseModal
        )}
      />
    </div>
  );
}
