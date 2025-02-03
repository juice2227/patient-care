

import NewPrescriptionForm from "./NewPrescriptionForm";
import PrescriptionPage from "../PrescriptionPage";
import PatientPrescriptions from "./PatientPrescription";

const Forms = () => (
    <div className="p-4">
      <PrescriptionPage/>
      <NewPrescriptionForm/>
      <PatientPrescriptions/>
    </div>
  );
  export default Forms; 