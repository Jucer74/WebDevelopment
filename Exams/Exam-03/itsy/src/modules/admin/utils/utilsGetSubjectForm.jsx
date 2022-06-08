import React from "react";
import CreateSubjectForm from "../components/subjects/forms/CreateSubjectForm";
import DeleteSubjectForm from "../components/subjects/forms/DeleteSubjectForm";
import DetailsSubjectForm from "../components/subjects/forms/DetailsSubjectForm";
import EditSubjectForm from "../components/subjects/forms/EditSubjectForm";


/**
 * Generate the SubjectForm component you want
 * @param {*} type Type of form that you want (DETAILS, CREATE, EDIT, DELETE). Only the type DETAILS dont need the optional params
 * @param {*} subjectForm Object that will be sent to the database when the form has been submitted
 * @param {*} setSubjectForm (Optional) Function that allow change the data on the subjectForm
 * @param {*} handleSubjectsDbUpdated (Optional) Function that confirm the database has been updated
 * @param {*} submitAction (Optional) Function that will be activate when the form has been submitted
 * @param {*} handleCloseModal (Optional) Function to close the modal
 * @returns A SubjectForm component 
 */
export default function utilsGetSubjectForm(
  type,
  subjectForm,
  setSubjectForm = null,
  handleSubjectsDbUpdated = null,
  submitAction = null,
  handleCloseModal = null
) {
  switch (type) {
    case "DETAILS":
      return <DetailsSubjectForm subjectForm={subjectForm} />;
    case "CREATE":
      return (
        <CreateSubjectForm
          subjectForm={subjectForm}
          setSubjectForm={setSubjectForm}
          handleSubjectsDbUpdated={handleSubjectsDbUpdated}
          onSubmitCreate={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    case "EDIT":
      return (
        <EditSubjectForm
          subjectForm={subjectForm}
          setSubjectForm={setSubjectForm}
          handleSubjectsDbUpdated={handleSubjectsDbUpdated}
          onSubmitEdit={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    case "DELETE":
      return (
        <DeleteSubjectForm
          subjectForm={subjectForm}
          handleSubjectsDbUpdated={handleSubjectsDbUpdated}
          onSubmitDelete={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    default:
      break;
  }
}
