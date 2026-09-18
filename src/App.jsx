import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import PHCDashboard from "./pages/PHCDashboard";
import CreateReferral from "./pages/CreateReferral";
import Teleconsultation from "./pages/Teleconsultation";
import DistrictHospitalDashboard from "./pages/DistrictHospitalDashboard";
import HospitalDoctors from "./pages/HospitalDoctors";
import HospitalEmergency from "./pages/HospitalEmergency";
import PatientDashboard from "./pages/PatientDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import PatientFacilities from "./pages/PatientFacilities";
import PatientMedicalHistory from "./pages/PatientMedicalHistory";
import ASHAWorkerDashboard from "./pages/ASHAWorkerDashboard";
import ASHAFollowUps from "./pages/ASHAFollowUps";
import ASHAMaternalChronic from "./pages/ASHAMaternalChronic";
import ASHAMyArea from "./pages/ASHAMyArea";
import ASHARegisterPatient from "./pages/ASHARegisterPatient";
import DistrictHospitalReferrals from "./pages/DistrictHospitalReferrals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/phc/dashboard' element={<PHCDashboard />} />
        <Route path='/phc/create-referral' element={<CreateReferral />} />
        <Route path='/phc/teleconsultation' element={<Teleconsultation />} />
        <Route path='/hospital/dashboard' element={<DistrictHospitalDashboard />} />
        <Route path='/hospital/referrals' element={<DistrictHospitalReferrals />} />
        <Route path='/hospital/doctors' element={<HospitalDoctors />} />
        <Route path='/hospital/emergency' element={<HospitalEmergency />} />
        <Route path='/patient/dashboard' element={<PatientDashboard />} />
        <Route path='/patient/appointments' element={<PatientAppointments />} />
        <Route path='/patient/facilities' element={<PatientFacilities />} />
        <Route path='/patient/medical-history' element={<PatientMedicalHistory />} />
        <Route path='/asha/dashboard' element={<ASHAWorkerDashboard />} />
        <Route path='/asha/follow-ups' element={<ASHAFollowUps />} />
        <Route path='/asha/high-risk' element={<ASHAMaternalChronic />} />
        <Route path='/asha/my-area' element={<ASHAMyArea />} />
        <Route path='/asha/register-patient' element={<ASHARegisterPatient />} />
        <Route path='*' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
