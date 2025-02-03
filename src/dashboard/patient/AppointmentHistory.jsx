import AppointmentForm from "../../components/AppointmentForm";
import AppointmentPage from "../../components/AppointmentPage";

const AppointmentHistory = () => (
  <div className="p-4 gap-y-6 bg-gray-500 rounded-lg">
    <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
    <div className="mb-6">
      <AppointmentPage />
    </div>
    <div>
      <AppointmentForm />
    </div>
  </div>
);

export default AppointmentHistory;
