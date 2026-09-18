import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  Clock,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";

import PageShell from "../components/PageShell";

import { Card, PageHeader, Status } from "../components/UI";

import { doctors } from "../data/mockData";

const nav = [
  {
    to: "/hospital/dashboard",
    label: "Dashboard",
    icon: Stethoscope,
  },
  {
    to: "/hospital/referrals",
    label: "Referrals",
    icon: FileText,
  },
  {
    to: "/hospital/doctors",
    label: "Doctors & Slots",
    icon: Stethoscope,
  },
  {
    to: "/hospital/emergency",
    label: "Emergency",
    icon: ShieldAlert,
  },
];

const appointments = [
  {
    id: "APT-1001",
    doctorId: "DOC-001",
    patient: "Sita Devi",
    age: 42,
    specialty: "Cardiology",
    time: "10:30 AM",
    type: "Referral",
    referralId: "REF-2041",
    status: "Confirmed",
  },
  {
    id: "APT-1002",
    doctorId: "DOC-001",
    patient: "Mahesh Kumar",
    age: 61,
    specialty: "Cardiology",
    time: "11:15 AM",
    type: "Emergency",
    referralId: "REF-2044",
    status: "Emergency",
  },
  {
    id: "APT-1003",
    doctorId: "DOC-001",
    patient: "Ravi Sharma",
    age: 49,
    specialty: "Cardiology",
    time: "12:00 PM",
    type: "Referral",
    referralId: "REF-2048",
    status: "Confirmed",
  },
  {
    id: "APT-1004",
    doctorId: "DOC-002",
    patient: "Anita Patil",
    age: 45,
    specialty: "Cardiology",
    time: "2:30 PM",
    type: "Referral",
    referralId: "REF-2051",
    status: "Confirmed",
  },
  {
    id: "APT-1005",
    doctorId: "DOC-002",
    patient: "Vijay Kumar",
    age: 52,
    specialty: "Cardiology",
    time: "3:15 PM",
    type: "Referral",
    referralId: "REF-2053",
    status: "Confirmed",
  },
  {
    id: "APT-1006",
    doctorId: "DOC-003",
    patient: "Ramesh Patil",
    age: 56,
    specialty: "Diabetology",
    time: "11:30 AM",
    type: "Referral",
    referralId: "REF-2042",
    status: "Confirmed",
  },
  {
    id: "APT-1007",
    doctorId: "DOC-004",
    patient: "Sunita Sharma",
    age: 34,
    specialty: "Gynecology",
    time: "10:00 AM",
    type: "Referral",
    referralId: "REF-2043",
    status: "Confirmed",
  },
];

export default function HospitalDoctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctorAppointments = selectedDoctor
    ? appointments.filter((appointment) => appointment.doctorId === selectedDoctor.id)
    : [];

  return (
    <PageShell role='hospital' items={nav}>
      {!selectedDoctor ? (
        <>
          <PageHeader
            eyebrow='KYC Hospital'
            title='Hospital Doctors'
            description='View all specialists and their current availability.'
          />

          {/* DOCTOR GRID */}
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className='rounded-xl border border-[#e4eee8] bg-white p-5 text-left transition hover:border-[#b9dcca] hover:shadow-sm'
              >
                {/* Doctor Header */}
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f5ed] text-[#27966b]'>
                      <Stethoscope size={19} />
                    </div>

                    <div>
                      <h3 className='text-[14px] font-semibold'>{doctor.name}</h3>

                      <p className='text-[10px] text-[#879890]'>{doctor.specialty}</p>
                    </div>
                  </div>

                  <span className='text-[#91a29b]'>
                    <ArrowLeft size={16} className='rotate-180' />
                  </span>
                </div>

                {/* Doctor Information */}
                <div className='mt-5 space-y-3'>
                  <div className='flex justify-between gap-4'>
                    <span className='text-[10px] text-[#879890]'>Department</span>

                    <span className='text-right text-[10px] font-medium'>{doctor.department}</span>
                  </div>

                  <div className='flex justify-between gap-4'>
                    <span className='text-[10px] text-[#879890]'>Experience</span>

                    <span className='text-right text-[10px] font-medium'>{doctor.experience}</span>
                  </div>

                  <div className='flex justify-between gap-4'>
                    <span className='text-[10px] text-[#879890]'>Today's Schedule</span>

                    <span className='text-right text-[10px] font-medium'>{doctor.schedule}</span>
                  </div>
                </div>

                {/* Room + Status */}
                <div className='mt-5 flex items-center justify-between border-t border-[#edf2ef] pt-4'>
                  <span className='text-[10px] text-[#879890]'>{doctor.room}</span>

                  <Status
                    tone={
                      doctor.status === "Available"
                        ? "green"
                        : doctor.status === "Busy"
                          ? "yellow"
                          : "blue"
                    }
                  >
                    {doctor.status}
                  </Status>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* BACK BUTTON */}
          <button
            onClick={() => setSelectedDoctor(null)}
            className='mb-5 flex items-center gap-2 text-[11px] font-semibold text-[#27966b]'
          >
            <ArrowLeft size={15} />
            Back to Doctors
          </button>

          {/* DOCTOR DETAILS */}
          <Card className='mb-5 p-6'>
            <div className='flex flex-col justify-between gap-5 md:flex-row md:items-center'>
              <div className='flex items-center gap-4'>
                <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e8f5ed] text-[#27966b]'>
                  <Stethoscope size={24} />
                </div>

                <div>
                  <h1 className='text-[21px] font-semibold'>{selectedDoctor.name}</h1>

                  <p className='mt-1 text-[11px] text-[#71847b]'>
                    {selectedDoctor.specialty} · {selectedDoctor.department}
                  </p>
                </div>
              </div>

              <Status
                tone={
                  selectedDoctor.status === "Available"
                    ? "green"
                    : selectedDoctor.status === "Busy"
                      ? "yellow"
                      : "blue"
                }
              >
                {selectedDoctor.status}
              </Status>
            </div>

            {/* Doctor Stats */}
            <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
              <div>
                <p className='text-[9px] text-[#879890]'>Experience</p>

                <p className='mt-1 text-[12px] font-semibold'>{selectedDoctor.experience}</p>
              </div>

              <div>
                <p className='text-[9px] text-[#879890]'>Department</p>

                <p className='mt-1 text-[12px] font-semibold'>{selectedDoctor.department}</p>
              </div>

              <div>
                <p className='text-[9px] text-[#879890]'>Room</p>

                <p className='mt-1 text-[12px] font-semibold'>{selectedDoctor.room}</p>
              </div>

              <div>
                <p className='text-[9px] text-[#879890]'>Today's Schedule</p>

                <p className='mt-1 text-[12px] font-semibold'>{selectedDoctor.schedule}</p>
              </div>
            </div>
          </Card>

          {/* BOOKED APPOINTMENTS */}
          <Card className='overflow-hidden p-0'>
            <div className='border-b border-[#edf2ef] px-5 py-4'>
              <h2 className='text-[16px] font-semibold'>Booked Appointments</h2>

              <p className='mt-0.5 text-[11px] text-[#879890]'>
                Today's appointments for {selectedDoctor.name}
              </p>
            </div>

            {doctorAppointments.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[700px]'>
                  <thead>
                    <tr className='bg-[#f8fbf9] text-left'>
                      <th className='px-5 py-3 text-[10px] text-[#71847b]'>Patient</th>

                      <th className='px-3 py-3 text-[10px] text-[#71847b]'>Time</th>

                      <th className='px-3 py-3 text-[10px] text-[#71847b]'>Type</th>

                      <th className='px-3 py-3 text-[10px] text-[#71847b]'>Referral ID</th>

                      <th className='px-3 py-3 text-[10px] text-[#71847b]'>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctorAppointments.map((appointment) => (
                      <tr key={appointment.id} className='border-t border-[#edf2ef]'>
                        {/* Patient */}
                        <td className='px-5 py-4'>
                          <p className='text-[12px] font-semibold'>{appointment.patient}</p>

                          <p className='text-[9px] text-[#879890]'>
                            {appointment.age} years · {appointment.specialty}
                          </p>
                        </td>

                        {/* Time */}
                        <td className='px-3 py-4'>
                          <div className='flex items-center gap-2'>
                            <Clock size={13} className='text-[#27966b]' />

                            <span className='text-[11px]'>{appointment.time}</span>
                          </div>
                        </td>

                        {/* Type */}
                        <td className='px-3 py-4'>
                          <span
                            className={`rounded-md px-2 py-1 text-[9px] font-semibold ${
                              appointment.type === "Emergency"
                                ? "bg-[#ffe7e7] text-[#d04444]"
                                : "bg-[#e8f5ed] text-[#27966b]"
                            }`}
                          >
                            {appointment.type}
                          </span>
                        </td>

                        {/* Referral ID */}
                        <td className='px-3 py-4 text-[10px] text-[#53685e]'>
                          {appointment.referralId}
                        </td>

                        {/* Status */}
                        <td className='px-3 py-4'>
                          <span
                            className={`flex items-center gap-1 text-[9px] font-semibold ${
                              appointment.status === "Emergency"
                                ? "text-[#d04444]"
                                : "text-[#27966b]"
                            }`}
                          >
                            <CheckCircle2 size={12} />

                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='p-10 text-center'>
                <CalendarDays size={25} className='mx-auto text-[#9aaba3]' />

                <p className='mt-3 text-[12px] font-semibold'>No appointments booked</p>

                <p className='mt-1 text-[10px] text-[#879890]'>
                  This doctor has no appointments for today.
                </p>
              </div>
            )}
          </Card>
        </>
      )}
    </PageShell>
  );
}
