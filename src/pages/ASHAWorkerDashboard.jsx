import {
  Activity,
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  FileText,
  HeartPulse,
  MapPin,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";
import { Card, PageHeader, StatCard, Status } from "../components/UI";

const items = [
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

const todayFollowUps = [
  {
    id: "PT-1045",
    name: "Sunita Sharma",
    type: "Maternal Care",
    reason: "ANC Check-up",
    priority: "High",
  },
  {
    id: "PT-1031",
    name: "Ramesh Patil",
    type: "Chronic Care",
    reason: "Diabetes follow-up",
    priority: "Medium",
  },
  {
    id: "PT-1024",
    name: "Sita Devi",
    type: "Referral",
    reason: "Cardiology consultation",
    priority: "High",
  },
];

export default function ASHAWorkerDashboard() {
  return (
    <PageShell role='asha' items={items}>
      <PageHeader
        eyebrow='Pimpri Rural Area'
        title='ASHA Dashboard'
        description='Track patients and make sure no follow-up is missed.'
        action={
          <Link
            to='/asha/register-patient'
            className='rounded-xl bg-[#27966b] px-4 py-2.5 text-sm font-semibold text-white'
          >
            + Register patient
          </Link>
        }
      />

      {/* Stats */}
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard
          icon={CalendarDays}
          label="Today's Follow-ups"
          value='08'
          note='Patients to contact today'
        />

        <StatCard
          icon={AlertCircle}
          label='High-Risk Patients'
          value='05'
          note='Need frequent monitoring'
        />

        <StatCard
          icon={FileText}
          label='Pending Referrals'
          value='04'
          note='Patients not yet reached hospital'
        />

        <StatCard
          icon={Users}
          label='Registered Patients'
          value='126'
          note='Patients in your area'
        />
      </div>

      {/* Quick Actions */}
      <section className='mt-6'>
        <h2 className='text-[16px] font-semibold'>Quick Actions</h2>

        <div className='mt-4 grid gap-4 md:grid-cols-3'>
          <Link
            to='/asha/follow-ups'
            className='rounded-2xl border border-[#e4eee8] bg-white p-5 transition hover:border-[#27966b]'
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
              <CalendarDays size={19} />
            </div>

            <h3 className='mt-4 text-[13px] font-semibold'>Today's Follow-ups</h3>

            <p className='mt-2 text-[10px] leading-5 text-gray-500'>
              View patients who need to be contacted today.
            </p>

            <div className='mt-3 flex items-center gap-1 text-[10px] font-medium text-[#27966b]'>
              Open
              <ChevronRight size={13} />
            </div>
          </Link>

          <Link
            to='/asha/high-risk'
            className='rounded-2xl border border-[#e4eee8] bg-white p-5 transition hover:border-[#27966b]'
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
              <HeartPulse size={19} />
            </div>

            <h3 className='mt-4 text-[13px] font-semibold'>Maternal & Chronic Patients</h3>

            <p className='mt-2 text-[10px] leading-5 text-gray-500'>
              Monitor patients who require frequent check-ups.
            </p>

            <div className='mt-3 flex items-center gap-1 text-[10px] font-medium text-[#27966b]'>
              Open
              <ChevronRight size={13} />
            </div>
          </Link>

          <Link
            to='/asha/register-patient'
            className='rounded-2xl border border-[#e4eee8] bg-white p-5 transition hover:border-[#27966b]'
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
              <UserPlus size={19} />
            </div>

            <h3 className='mt-4 text-[13px] font-semibold'>Register Patient</h3>

            <p className='mt-2 text-[10px] leading-5 text-gray-500'>
              Register a patient who does not have a portal account.
            </p>

            <div className='mt-3 flex items-center gap-1 text-[10px] font-medium text-[#27966b]'>
              Open
              <ChevronRight size={13} />
            </div>
          </Link>
        </div>
      </section>

      {/* Today's Follow-ups */}
      <Card className='mt-6 p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-[16px] font-semibold'>Today's Follow-ups</h2>

            <p className='mt-1 text-[10px] text-gray-400'>Patients who need your attention today</p>
          </div>

          <Link
            to='/asha/follow-ups'
            className='flex items-center gap-1 text-[10px] font-medium text-[#27966b]'
          >
            View All
            <ChevronRight size={13} />
          </Link>
        </div>

        <div className='mt-5 space-y-3'>
          {todayFollowUps.map((patient) => (
            <div
              key={patient.id}
              className='flex flex-col justify-between gap-4 rounded-xl bg-[#f5faf6] p-4 md:flex-row md:items-center'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#e1f2e9] text-[#27966b]'>
                  <Users size={16} />
                </div>

                <div>
                  <p className='text-[12px] font-semibold'>{patient.name}</p>

                  <p className='mt-1 text-[9px] text-gray-500'>
                    {patient.type} • {patient.reason}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <Status tone={patient.priority === "High" ? "yellow" : "blue"}>
                  {patient.priority} Priority
                </Status>

                <Link to='/asha/follow-ups' className='text-[#27966b]'>
                  <ChevronRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* My Area */}
      <Card className='mt-6 p-5'>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <div>
            <h2 className='text-[16px] font-semibold'>My Allocated Area</h2>

            <p className='mt-1 text-[10px] text-gray-400'>Pimpri Rural Area</p>
          </div>

          <Link
            to='/asha/my-area'
            className='flex w-fit items-center gap-1 rounded-lg bg-[#27966b] px-4 py-2 text-[10px] font-medium text-white'
          >
            <MapPin size={13} />
            View Area Map
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
