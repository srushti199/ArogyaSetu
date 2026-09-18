export const patients = [
  { id: "PT-1024", name: "Sita Devi", age: 42, gender: "Female", abha: "6254 **** 7890", condition: "Hypertension" },
  { id: "PT-1031", name: "Ramesh Patil", age: 56, gender: "Male", abha: "7142 **** 3421", condition: "Diabetes" },
  { id: "PT-1045", name: "Sunita Sharma", age: 34, gender: "Female", abha: "8231 **** 6712", condition: "Pregnancy" },
];

export const doctors = [
  { id: "DOC-001", name: "Dr. XYZ", specialty: "Cardiologist", department: "Cardiology", experience: "12 years", status: "Available", room: "204", schedule: "10:00 AM - 1:00 PM" },
  { id: "DOC-002", name: "Dr. PQR", specialty: "Cardiologist", department: "Cardiology", experience: "9 years", status: "Available", room: "205", schedule: "2:00 PM - 5:00 PM" },
  { id: "DOC-003", name: "Dr. ABC", specialty: "Diabetologist", department: "Diabetology", experience: "15 years", status: "Busy", room: "301", schedule: "11:00 AM - 2:00 PM" },
  { id: "DOC-004", name: "Dr. MNO", specialty: "Gynecologist", department: "Gynecology", experience: "11 years", status: "Available", room: "102", schedule: "9:00 AM - 12:00 PM" },
];

export const referrals = [
  { id: "REF-2081", patient: "Sita Devi", patientId: "PT-1024", reason: "Persistent high blood pressure", specialty: "Cardiology", priority: "High", status: "Pending", hospital: "KYC District Hospital", date: "18 Sep 2026" },
  { id: "REF-2082", patient: "Ramesh Patil", patientId: "PT-1031", reason: "Diabetes review", specialty: "Diabetology", priority: "Normal", status: "Accepted", hospital: "KYC District Hospital", date: "19 Sep 2026" },
  { id: "REF-2083", patient: "Sunita Sharma", patientId: "PT-1045", reason: "ANC specialist review", specialty: "Gynecology", priority: "High", status: "Completed", hospital: "KYC District Hospital", date: "16 Sep 2026" },
];

export const appointments = [
  { id: "APT-1001", doctor: "Dr. XYZ", specialty: "Cardiologist", hospital: "KYC District Hospital", date: "18 September 2026", time: "10:30 AM", status: "Confirmed" },
  { id: "APT-1002", doctor: "Dr. MNO", specialty: "Gynecologist", hospital: "KYC District Hospital", date: "24 September 2026", time: "11:00 AM", status: "Upcoming" },
];

export const facilities = [
  { name: "KYC District Hospital", type: "Hospital", distance: "4.2 km", address: "Main Road, Kheda", phone: "+91 20 2456 1000", open: true },
  { name: "Jan Aushadhi Kendra", type: "Medical Store", distance: "1.1 km", address: "Market Chowk, Kheda", phone: "+91 98765 43210", open: true },
  { name: "LifeCare Diagnostics", type: "Diagnostic Centre", distance: "2.3 km", address: "Station Road, Kheda", phone: "+91 97654 32109", open: true },
  { name: "Primary Health Centre Kheda", type: "Clinic", distance: "0.8 km", address: "PHC Campus, Kheda", phone: "+91 20 2456 1100", open: true },
];
