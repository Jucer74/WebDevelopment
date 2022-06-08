import CreateStudentForm from "../components/students/forms/CreateStudentForm";
import DeleteStudentForm from "../components/students/forms/DeleteStudentForm";
import DetailsStudentForm from "../components/students/forms/DetailsStudentForm";
import EditStudentForm from "../components/students/forms/EditStudentForm";

/**
 * Generate the StudentForm component you want
 * @param {*} type Type of form that you want (DETAILS, CREATE, EDIT, DELETE). Only the type DETAILS dont need the optional params
 * @param {*} studentForm Object that will be sent to the database when the form has been submitted
 * @param {*} setStudentForm (Optional) Function that allow change the data on the studentForm
 * @param {*} handleStudentsDbUpdated (Optional) Function that confirm the database has been updated
 * @param {*} submitAction (Optional) Function that will be activate when the form has been submitted
 * @param {*} handleCloseModal (Optional) Function to close the modal
 * @returns A StudentForm component
 */
export default function utilsGetStudentForm(
  type,
  studentForm,
  setStudentForm = null,
  handleStudentsDbUpdated = null,
  submitAction = null,
  handleCloseModal = null
) {
  switch (type) {
    case "DETAILS":
      return <DetailsStudentForm studentForm={studentForm} />;
    case "CREATE":
      return (
        <CreateStudentForm
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          handleStudentsDbUpdated={handleStudentsDbUpdated}
          onSubmitCreate={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    case "EDIT":
      return (
        <EditStudentForm
          studentForm={studentForm}
          setStudentForm={setStudentForm}
          handleStudentsDbUpdated={handleStudentsDbUpdated}
          onSubmitEdit={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    case "DELETE":
      return (
        <DeleteStudentForm
          studentForm={studentForm}
          handleStudentsDbUpdated={handleStudentsDbUpdated}
          onSubmitDelete={submitAction}
          _onFinish={handleCloseModal}
        />
      );
    default:
      break;
  }
}
