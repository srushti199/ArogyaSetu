import { useState } from "react";

import {
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  FileText,
  ShieldAlert,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

import PageShell from "../components/PageShell";

import { Card, PageHeader, Status } from "../components/UI";

const nav = [
  {
    to: "/hospital/dashboard",
    label: "Dashboard",
    icon: ShieldAlert,
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

const initial = [
  {
    id: "EMG-001",
    patient: "Mahesh Kumar",
    age: 61,
    gender: "Male",
    symptoms: "Severe chest pain and breathing difficulty",
    priority: "Emergency",
    from: "Vadgaon PHC",
    received: "10 minutes ago",
    department: "Cardiology",
    action: "Immediate cardiac assessment required",
    status: "New",
    phone: "+91 XXXXX XXXXX",
  },
  {
    id: "EMG-002",
    patient: "Lakshmi Devi",
    age: 68,
    gender: "Female",
    symptoms: "Sudden weakness, dizziness and difficulty speaking",
    priority: "Emergency",
    from: "Kheda PHC",
    received: "25 minutes ago",
    department: "Neurology",
    action: "Immediate neurological assessment required",
    status: "Being Handled",
    phone: "+91 XXXXX XXXXX",
  },
  {
    id: "EMG-003",
    patient: "Rahul Patil",
    age: 37,
    gender: "Male",
    symptoms: "High fever with severe abdominal pain",
    priority: "Urgent",
    from: "Kheda PHC",
    received: "42 minutes ago",
    department: "General Medicine",
    action: "Urgent clinical assessment required",
    status: "New",
    phone: "+91 XXXXX XXXXX",
  },
];

export default function HospitalEmergency() {
  const [cases, setCases] = useState(initial);
  const [selected, setSelected] = useState(null);

  const handle = (id) => {
    setCases((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Being Handled" } : item)),
    );

    setSelected(null);
  };

  const newCases = cases.filter((item) => item.status === "New").length;

  const handledCases = cases.filter((item) => item.status === "Being Handled").length;

  return (
    <PageShell role='hospital' items={nav}>
      <PageHeader
        eyebrow='Immediate response'
        title='Emergency Desk'
        description='Monitor and respond to emergency cases received from PHCs.'
        action={
          <div className='rounded-xl bg-[#fee5e2] px-3 py-2 text-xs font-bold text-[#b13c30]'>
            {newCases} new alerts
          </div>
        }
      />

      {/* SUMMARY */}
      <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <Card className='p-5'>
          <p className='text-[11px] text-[#879890]'>Total Emergency Cases</p>

          <p className='mt-1 text-[25px] font-semibold'>{cases.length}</p>
        </Card>

        <Card className='p-5'>
          <p className='text-[11px] text-[#879890]'>New Cases</p>

          <p className='mt-1 text-[25px] font-semibold text-[#d04444]'>{newCases}</p>
        </Card>

        <Card className='p-5'>
          <p className='text-[11px] text-[#879890]'>Being Handled</p>

          <p className='mt-1 text-[25px] font-semibold text-[#27966b]'>{handledCases}</p>
        </Card>
      </div>

      {/* EMERGENCY CASES */}
      <div className='space-y-4'>
        {cases.map((item) => (
          <Card key={item.id} className='overflow-hidden border-[#eadada]'>
            {/* CASE HEADER */}
            <div className='flex flex-col justify-between gap-3 border-b border-[#f0e4e4] bg-[#fffafa] px-5 py-4 lg:flex-row lg:items-center'>
              <div className='flex items-center gap-3'>
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ffe7e7] text-[#d04444]'>
                  <AlertTriangle size={17} />
                </div>

                <div>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h3 className='text-[14px] font-semibold'>{item.patient}</h3>

                    <span className='text-[9px] text-[#879890]'>{item.id}</span>
                  </div>

                  <p className='mt-0.5 text-[10px] text-[#879890]'>
                    {item.age} years · {item.gender}
                  </p>
                </div>
              </div>

              <div className='flex flex-wrap items-center gap-2'>
                <Status tone={item.priority === "Emergency" ? "red" : "yellow"}>
                  {item.priority}
                </Status>

                <Status tone={item.status === "New" ? "red" : "green"}>{item.status}</Status>
              </div>
            </div>

            {/* CASE DETAILS */}
            <div className='p-5'>
              <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
                {/* SYMPTOMS */}
                <div>
                  <p className='text-[9px] uppercase tracking-wide text-[#879890]'>
                    Emergency Symptoms
                  </p>

                  <p className='mt-2 text-[12px] font-semibold text-[#30483e]'>{item.symptoms}</p>
                </div>

                {/* SOURCE */}
                <div>
                  <p className='text-[9px] uppercase tracking-wide text-[#879890]'>Referred From</p>

                  <div className='mt-2 flex items-center gap-2'>
                    <MapPin size={14} className='text-[#27966b]' />

                    <p className='text-[12px] font-semibold'>{item.from}</p>
                  </div>
                </div>

                {/* DEPARTMENT */}
                <div>
                  <p className='text-[9px] uppercase tracking-wide text-[#879890]'>
                    Required Department
                  </p>

                  <div className='mt-2 flex items-center gap-2'>
                    <Stethoscope size={14} className='text-[#27966b]' />

                    <p className='text-[12px] font-semibold'>{item.department}</p>
                  </div>
                </div>
              </div>

              {/* REQUIRED ACTION */}
              <div className='mt-5 rounded-lg border border-[#e4eee8] bg-[#f8fbf9] p-4'>
                <p className='text-[9px] uppercase tracking-wide text-[#879890]'>Required Action</p>

                <p className='mt-1 text-[11px] font-semibold'>{item.action}</p>
              </div>

              {/* FOOTER */}
              <div className='mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center gap-1.5'>
                    <Clock size={13} className='text-[#879890]' />

                    <span className='text-[10px] text-[#71847b]'>Received {item.received}</span>
                  </div>

                  <div className='flex items-center gap-1.5'>
                    <Phone size={13} className='text-[#879890]' />

                    <span className='text-[10px] text-[#71847b]'>{item.phone}</span>
                  </div>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => setSelected(item)}
                    className='rounded-lg border border-[#d9e7df] px-4 py-2 text-[10px] font-semibold text-[#53685e] hover:bg-[#f5faf6]'
                  >
                    View Details
                  </button>

                  {item.status === "New" && (
                    <button
                      onClick={() => handle(item.id)}
                      className='rounded-lg bg-[#d04444] px-4 py-2 text-[10px] font-semibold text-white hover:bg-[#bd3939]'
                    >
                      Handle Emergency
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-5'
          onClick={() => setSelected(null)}
        >
          <div
            className='max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-xl bg-white shadow-xl'
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className='flex items-center justify-between border-b border-[#edf2ef] px-5 py-4 sm:px-6 sm:py-5'>
              <div>
                <h2 className='text-[17px] font-semibold'>Emergency Details</h2>

                <p className='mt-1 text-[10px] text-[#879890]'>{selected.id}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className='text-[#71847b] hover:text-[#20362d]'
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className='p-5 sm:p-6'>
              {/* PATIENT */}
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ffe7e7] text-[#d04444]'>
                  <UserRound size={19} />
                </div>

                <div>
                  <h3 className='text-[15px] font-semibold'>{selected.patient}</h3>

                  <p className='text-[10px] text-[#879890]'>
                    {selected.age} years · {selected.gender}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className='mt-6 space-y-4'>
                <div>
                  <p className='text-[9px] uppercase text-[#879890]'>Symptoms</p>

                  <p className='mt-1 text-[12px] font-semibold'>{selected.symptoms}</p>
                </div>

                <div>
                  <p className='text-[9px] uppercase text-[#879890]'>Referring PHC</p>

                  <p className='mt-1 text-[12px] font-semibold'>{selected.from}</p>
                </div>

                <div>
                  <p className='text-[9px] uppercase text-[#879890]'>Required Department</p>

                  <p className='mt-1 text-[12px] font-semibold'>{selected.department}</p>
                </div>

                <div>
                  <p className='text-[9px] uppercase text-[#879890]'>Received</p>

                  <p className='mt-1 text-[12px] font-semibold'>{selected.received}</p>
                </div>

                {/* IMMEDIATE ACTION */}
                <div className='rounded-lg border border-[#f1dada] bg-[#fff7f7] p-4'>
                  <p className='text-[9px] uppercase font-semibold text-[#d04444]'>
                    Immediate Action
                  </p>

                  <p className='mt-1 text-[11px] font-semibold'>{selected.action}</p>
                </div>
              </div>

              {/* MODAL ACTIONS */}
              <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                {selected.status === "New" && (
                  <button
                    onClick={() => handle(selected.id)}
                    className='flex-1 rounded-lg bg-[#d04444] py-2.5 text-[11px] font-semibold text-white'
                  >
                    Handle Emergency
                  </button>
                )}

                <button
                  onClick={() => setSelected(null)}
                  className='flex-1 rounded-lg border border-[#d9e7df] py-2.5 text-[11px] font-semibold'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
