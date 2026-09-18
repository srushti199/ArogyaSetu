import {
  Activity,
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  UserPlus,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import PageShell from "../components/PageShell";
import { Card, PageHeader, StatCard, Status } from "../components/UI";

const nav = [
  {
    to: "/asha/dashboard",
    label: "Dashboard",
    icon: Activity,
  },
  {
    to: "/asha/follow-ups",
    label: "Follow-ups",
    icon: CalendarCheck,
  },
  {
    to: "/asha/high-risk",
    label: "Maternal & Chronic",
    icon: FileText,
  },
  {
    to: "/asha/my-area",
    label: "My Area",
    icon: MapPin,
  },
  {
    to: "/asha/register-patient",
    label: "Register Patient",
    icon: UserPlus,
  },
];

const maternalPatients = [
  {
    id: "PT-1045",
    name: "Sunita Sharma",
    age: 34,
    village: "Pimpri Rural",
    stage: "28 Weeks",
    nextCheckup: "16 September 2026",
    lastCheckup: "20 August 2026",
    risk: "High",
    reason: "Regular ANC monitoring",
    phone: "98XXXXXX21",
  },
  {
    id: "PT-1062",
    name: "Meena Pawar",
    age: 27,
    village: "Dapodi",
    stage: "20 Weeks",
    nextCheckup: "20 September 2026",
    lastCheckup: "22 August 2026",
    risk: "Normal",
    reason: "Routine ANC check-up",
    phone: "95XXXXXX67",
  },
  {
    id: "PT-1078",
    name: "Kavita More",
    age: 30,
    village: "Bhosari Rural",
    stage: "34 Weeks",
    nextCheckup: "17 September 2026",
    lastCheckup: "25 August 2026",
    risk: "High",
    reason: "Frequent maternal monitoring",
    phone: "94XXXXXX32",
  },
];

const chronicPatients = [
  {
    id: "PT-1031",
    name: "Ramesh Patil",
    age: 56,
    village: "Pimpri Rural",
    condition: "Diabetes",
    nextCheckup: "18 September 2026",
    lastCheckup: "18 August 2026",
    risk: "Medium",
    reason: "Blood sugar monitoring",
    phone: "97XXXXXX34",
  },
  {
    id: "PT-1082",
    name: "Shankar Jadhav",
    age: 62,
    village: "Dapodi",
    condition: "Hypertension",
    nextCheckup: "19 September 2026",
    lastCheckup: "19 August 2026",
    risk: "High",
    reason: "Blood pressure monitoring",
    phone: "93XXXXXX41",
  },
  {
    id: "PT-1091",
    name: "Lata Pawar",
    age: 49,
    village: "Bhosari Rural",
    condition: "Diabetes & Hypertension",
    nextCheckup: "24 September 2026",
    lastCheckup: "24 August 2026",
    risk: "Medium",
    reason: "Regular chronic care",
    phone: "92XXXXXX18",
  },
];

export default function ASHAMaternalChronic() {
  const [activeTab, setActiveTab] = useState("maternal");

  const patients = activeTab === "maternal" ? maternalPatients : chronicPatients;

  return (
    <PageShell role='asha' items={nav}>
      <PageHeader
        eyebrow='Regular Care'
        title='Maternal & Chronic Patients'
        description='Monitor patients who require regular healthcare check-ups.'
      />

      {/* Overview */}
      <div className='grid gap-4 sm:grid-cols-3'>
        <StatCard
          icon={HeartPulse}
          label='Maternal Patients'
          value='12'
          note='Pregnant women under care'
        />

        <StatCard
          icon={Activity}
          label='Chronic Patients'
          value='24'
          note='Patients requiring regular monitoring'
        />

        <StatCard icon={AlertCircle} label='High Risk' value='05' note='Need closer follow-up' />
      </div>

      {/* Tabs */}
      <Card className='mt-6 p-2'>
        <div className='flex gap-2'>
          <button
            onClick={() => setActiveTab("maternal")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[11px] font-medium ${
              activeTab === "maternal"
                ? "bg-[#27966b] text-white"
                : "text-gray-500 hover:bg-[#f5faf6]"
            }`}
          >
            <HeartPulse size={15} />
            Maternal Care
          </button>

          <button
            onClick={() => setActiveTab("chronic")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[11px] font-medium ${
              activeTab === "chronic"
                ? "bg-[#27966b] text-white"
                : "text-gray-500 hover:bg-[#f5faf6]"
            }`}
          >
            <Activity size={15} />
            Chronic Care
          </button>
        </div>
      </Card>

      {/* Patient List */}
      <Card className='mt-6 p-5'>
        <div>
          <h2 className='text-[16px] font-semibold'>
            {activeTab === "maternal" ? "Maternal Patients" : "Chronic Patients"}
          </h2>

          <p className='mt-1 text-[10px] text-gray-400'>Patients assigned to your area</p>
        </div>

        <div className='mt-5 space-y-3'>
          {patients.map((patient) => (
            <div key={patient.id} className='rounded-xl border border-[#e8eee9] p-4'>
              {/* Patient Header */}
              <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f4ed] text-[#27966b]'>
                    <UserRound size={17} />
                  </div>

                  <div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='text-[13px] font-semibold'>{patient.name}</p>

                      <Status
                        tone={
                          patient.risk === "High"
                            ? "yellow"
                            : patient.risk === "Medium"
                              ? "blue"
                              : "green"
                        }
                      >
                        {patient.risk} Risk
                      </Status>
                    </div>

                    <p className='mt-1 text-[9px] text-gray-500'>
                      {patient.id} • Age {patient.age}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Details */}
              <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {activeTab === "maternal" ? (
                  <>
                    <Info label='Pregnancy Stage' value={patient.stage} />
                    <Info label='Next Check-up' value={patient.nextCheckup} />
                    <Info label='Last Check-up' value={patient.lastCheckup} />
                    <Info label='Area' value={patient.village} />
                  </>
                ) : (
                  <>
                    <Info label='Condition' value={patient.condition} />
                    <Info label='Next Check-up' value={patient.nextCheckup} />
                    <Info label='Last Check-up' value={patient.lastCheckup} />
                    <Info label='Area' value={patient.village} />
                  </>
                )}
              </div>

              {/* Follow-up Reason */}
              <div className='mt-3 rounded-lg bg-[#f5faf6] p-3'>
                <p className='text-[8px] text-gray-400'>Follow-up Reason</p>

                <p className='mt-1 text-[10px] font-medium'>{patient.reason}</p>
              </div>

              {/* Actions */}
              <div className='mt-4 flex flex-wrap gap-2'>
                <a
                  href={`tel:${patient.phone}`}
                  className='flex items-center gap-1 rounded-lg bg-[#27966b] px-3 py-2 text-[9px] font-medium text-white hover:bg-[#21835c]'
                >
                  <Phone size={12} />
                  Contact Patient
                </a>

                <button className='flex items-center gap-1 rounded-lg border border-[#dce9e1] px-3 py-2 text-[9px] font-medium text-[#27966b] hover:bg-[#f5faf6]'>
                  <CalendarDays size={12} />
                  Record Check-up
                </button>

                <button className='flex items-center gap-1 rounded-lg border border-[#dce9e1] px-3 py-2 text-[9px] font-medium text-[#27966b] hover:bg-[#f5faf6]'>
                  View Details
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reminder */}
      <div className='mt-6 flex gap-3 rounded-xl border border-[#dce9e1] bg-[#edf7f1] p-4'>
        <AlertCircle size={17} className='mt-0.5 shrink-0 text-[#27966b]' />

        <div>
          <p className='text-[11px] font-semibold text-[#17372d]'>ASHA Follow-up Reminder</p>

          <p className='mt-1 text-[9px] leading-4 text-gray-500'>
            Patients marked as high risk should receive closer follow-up and be escalated to the PHC
            or hospital when required.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function Info({ label, value }) {
  return (
    <div className='rounded-lg bg-[#f5faf6] p-3'>
      <p className='text-[8px] text-gray-400'>{label}</p>

      <p className='mt-1 text-[10px] font-medium'>{value}</p>
    </div>
  );
}
