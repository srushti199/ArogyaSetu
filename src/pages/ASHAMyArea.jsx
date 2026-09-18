import {
  Activity,
  AlertCircle,
  CalendarDays,
  ChevronRight,
  HeartPulse,
  Map,
  MapPin,
  Navigation,
  UserPlus,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";
import { Card, PageHeader, StatCard } from "../components/UI";

const nav = [
  {
    to: "/asha/dashboard",
    label: "Dashboard",
    icon: Activity,
  },
  {
    to: "/asha/follow-ups",
    label: "Follow-ups",
    icon: CalendarDays,
  },
  {
    to: "/asha/high-risk",
    label: "Maternal & Chronic",
    icon: HeartPulse,
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

const villages = [
  {
    name: "Pimpri Rural",
    totalPatients: 42,
    maternal: 8,
    chronic: 15,
    followUps: 5,
  },
  {
    name: "Dapodi",
    totalPatients: 31,
    maternal: 5,
    chronic: 12,
    followUps: 3,
  },
  {
    name: "Bhosari Rural",
    totalPatients: 27,
    maternal: 4,
    chronic: 9,
    followUps: 4,
  },
  {
    name: "Akurdi Rural",
    totalPatients: 22,
    maternal: 3,
    chronic: 7,
    followUps: 2,
  },
];

const totalPatients = villages.reduce((total, village) => total + village.totalPatients, 0);

const totalMaternal = villages.reduce((total, village) => total + village.maternal, 0);

const totalChronic = villages.reduce((total, village) => total + village.chronic, 0);

const totalFollowUps = villages.reduce((total, village) => total + village.followUps, 0);

export default function ASHAMyArea() {
  return (
    <PageShell role='asha' items={nav}>
      <PageHeader
        eyebrow='Assigned Area'
        title='My Area'
        description='View villages, patients and healthcare needs assigned to your area.'
      />

      {/* Area Header */}
      <Card className='p-5'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4ed] text-[#27966b]'>
              <MapPin size={21} />
            </div>

            <div>
              <h2 className='text-[16px] font-semibold'>Pimpri Rural Area</h2>

              <p className='mt-1 text-[10px] text-gray-400'>ASHA Worker: Sunita Patil</p>
            </div>
          </div>

          <a
            href='https://www.openstreetmap.org/'
            target='_blank'
            rel='noreferrer'
            className='flex w-fit items-center justify-center gap-2 rounded-lg border border-[#dce9e1] px-4 py-2.5 text-[10px] font-medium text-[#27966b] hover:bg-[#f5faf6]'
          >
            <Navigation size={14} />
            Open Map
          </a>
        </div>
      </Card>

      {/* Summary */}
      <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard
          icon={Users}
          label='Total Patients'
          value={totalPatients}
          note='Patients in your area'
        />

        <StatCard
          icon={HeartPulse}
          label='Maternal Patients'
          value={totalMaternal}
          note='Pregnant women under care'
        />

        <StatCard
          icon={Activity}
          label='Chronic Patients'
          value={totalChronic}
          note='Regular monitoring'
        />

        <StatCard
          icon={AlertCircle}
          label='Follow-ups Due'
          value={totalFollowUps}
          note='Patients needing attention'
        />
      </div>

      {/* Area Map */}
      <Card className='mt-6 p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-[16px] font-semibold'>Allocated Area</h2>

            <p className='mt-1 text-[10px] text-gray-400'>Villages assigned to you</p>
          </div>

          <Map size={19} className='text-[#27966b]' />
        </div>

        <div className='relative mt-5 h-[250px] overflow-hidden rounded-xl bg-[#eef5f0]'>
          {/* Roads */}
          <div className='absolute left-0 top-[45%] h-[2px] w-full rotate-6 bg-[#cbdad2]' />

          <div className='absolute left-[20%] top-0 h-full w-[2px] -rotate-12 bg-[#cbdad2]' />

          <div className='absolute right-[25%] top-0 h-full w-[2px] rotate-[18deg] bg-[#cbdad2]' />

          <div className='absolute left-[10%] top-[70%] h-[2px] w-[80%] -rotate-3 bg-[#cbdad2]' />

          {/* Allocated Area */}
          <div className='absolute left-[15%] top-[15%] h-[65%] w-[65%] rounded-[40%] border-2 border-dashed border-[#27966b] bg-[#27966b]/5' />

          {/* Markers */}
          <AreaMarker name='Pimpri Rural' patients='42 patients' top='25%' left='25%' />

          <AreaMarker name='Dapodi' patients='31 patients' top='48%' left='55%' />

          <AreaMarker name='Bhosari Rural' patients='27 patients' top='65%' left='30%' />

          <AreaMarker name='Akurdi Rural' patients='22 patients' top='35%' left='70%' />
        </div>

        <p className='mt-2 text-[9px] text-gray-400'>Area map shown for demonstration.</p>
      </Card>

      {/* Villages */}
      <Card className='mt-6 p-5'>
        <div>
          <h2 className='text-[16px] font-semibold'>Villages in My Area</h2>

          <p className='mt-1 text-[10px] text-gray-400'>
            Patient distribution across assigned villages.
          </p>
        </div>

        <div className='mt-5 grid gap-4 lg:grid-cols-2'>
          {villages.map((village) => (
            <div key={village.name} className='rounded-xl border border-[#e1ebe5] p-4'>
              {/* Village Header */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
                    <MapPin size={16} />
                  </div>

                  <div>
                    <p className='text-[13px] font-semibold'>{village.name}</p>

                    <p className='mt-0.5 text-[9px] text-gray-400'>Assigned village</p>
                  </div>
                </div>

                <div className='text-right'>
                  <p className='text-[20px] font-semibold text-[#27966b]'>
                    {village.totalPatients}
                  </p>

                  <p className='text-[8px] text-gray-400'>Patients</p>
                </div>
              </div>

              {/* Village Stats */}
              <div className='mt-4 grid grid-cols-3 gap-2'>
                <SmallStat label='Maternal' value={village.maternal} />

                <SmallStat label='Chronic' value={village.chronic} />

                <SmallStat label='Follow-ups' value={village.followUps} />
              </div>

              <Link
                to='/asha/follow-ups'
                className='mt-4 flex items-center gap-1 text-[10px] font-medium text-[#27966b]'
              >
                View Patients
                <ChevronRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </Card>

      {/* Area Monitoring */}
      <div className='mt-6 flex gap-3 rounded-xl border border-[#dce9e1] bg-[#edf7f1] p-4'>
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#27966b]'>
          <AlertCircle size={17} />
        </div>

        <div>
          <p className='text-[12px] font-semibold'>Area Monitoring</p>

          <p className='mt-1 text-[10px] leading-4 text-gray-500'>
            Monitor maternal, chronic and overdue patients across your assigned villages and follow
            up when required.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function AreaMarker({ name, patients, top, left }) {
  return (
    <div
      className='absolute'
      style={{
        top,
        left,
      }}
    >
      <div className='flex items-center gap-1.5'>
        <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#27966b] text-white shadow-sm'>
          <MapPin size={13} />
        </div>

        <div className='rounded-lg bg-white px-2.5 py-1.5 shadow-sm'>
          <p className='text-[9px] font-semibold'>{name}</p>

          <p className='mt-0.5 text-[8px] text-gray-400'>{patients}</p>
        </div>
      </div>
    </div>
  );
}

function SmallStat({ label, value }) {
  return (
    <div className='rounded-lg bg-[#f5faf6] p-3'>
      <p className='text-[8px] text-gray-400'>{label}</p>

      <p className='mt-1 text-[15px] font-semibold'>{value}</p>
    </div>
  );
}
