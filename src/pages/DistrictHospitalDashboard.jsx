import {
  Activity,
  CalendarDays,
  ClipboardList,
  FileText,
  Hospital,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";

import { Card, PageHeader, StatCard, Status } from "../components/UI";

import { referrals } from "../data/mockData";

const nav = [
  {
    to: "/hospital/dashboard",
    label: "Dashboard",
    icon: Hospital,
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

export default function DistrictHospitalDashboard() {
  return (
    <PageShell role='hospital' items={nav}>
      {/* =========================
          PAGE HEADER
      ========================= */}
      <PageHeader
        eyebrow='KYC District Hospital'
        title='Hospital Dashboard'
        description='Monitor referrals, appointments, emergency cases and hospital resources.'
      />

      {/* =========================
          STAT CARDS
      ========================= */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatCard icon={FileText} label='New Referrals' value='12' note='5 high priority cases' />

        <StatCard
          icon={CalendarDays}
          label="Today's Appointments"
          value='28'
          note='8 appointments remaining'
        />

        <StatCard
          icon={ClipboardList}
          label='Pending Referrals'
          value='07'
          note='Awaiting hospital action'
        />

        <StatCard
          icon={ShieldAlert}
          label='Emergency Cases'
          value='02'
          note='Requires immediate attention'
        />
      </div>

      {/* =========================
          EMERGENCY + HOSPITAL STATUS
      ========================= */}
      <div className='mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2'>
        {/* Emergency Alert */}
        <Card className='overflow-hidden p-0'>
          <div className='border-b border-[#edf2ef] px-5 py-4'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffe8e8] text-[#d04444]'>
                <ShieldAlert size={17} />
              </div>

              <div>
                <h2 className='text-[15px] font-semibold text-[#20362d]'>Emergency Alerts</h2>

                <p className='text-[10px] text-[#879890]'>Requires immediate attention</p>
              </div>
            </div>
          </div>

          <div className='p-5'>
            <div className='rounded-xl border border-[#f1d7d7] bg-[#fff8f8] p-4'>
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-xs font-semibold text-[#b33b3b]'>Emergency Case</p>

                  <p className='mt-2 text-xs font-semibold text-[#30483e]'>Mahesh Kumar</p>

                  <p className='mt-1 text-[10px] text-[#71847b]'>
                    Severe chest pain + breathing difficulty
                  </p>
                </div>

                <span className='shrink-0 rounded-md bg-[#d94d4d] px-2 py-1 text-[9px] font-bold text-white'>
                  EMERGENCY
                </span>
              </div>

              <div className='mt-4 border-t border-[#f1d7d7] pt-3'>
                <p className='text-[9px] text-[#879890]'>Referred from</p>

                <p className='text-[11px] font-medium text-[#53685e]'>Vadgaon PHC</p>
              </div>

              <Link
                to='/hospital/emergency'
                className='mt-4 block w-full rounded-lg bg-[#d94d4d] py-2 text-center text-[11px] font-semibold text-white transition hover:bg-[#c83f3f]'
              >
                View Emergency Cases
              </Link>
            </div>
          </div>
        </Card>

        {/* Hospital Status */}
        <Card className='p-5'>
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f5ed] text-[#27966b]'>
              <Hospital size={17} />
            </div>

            <div>
              <h2 className='text-[15px] font-semibold text-[#20362d]'>Hospital Status</h2>

              <p className='text-[10px] text-[#879890]'>Current resource availability</p>
            </div>
          </div>

          <div className='mt-5 space-y-3'>
            <div className='flex items-center justify-between rounded-lg bg-[#f5faf6] p-3'>
              <span className='text-xs text-[#53685e]'>Specialist availability</span>

              <Status tone='green'>12 Available</Status>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-[#f5faf6] p-3'>
              <span className='text-xs text-[#53685e]'>Today's appointments</span>

              <Status tone='blue'>28 Scheduled</Status>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-[#fff8f7] p-3'>
              <span className='text-xs text-[#53685e]'>Emergency cases</span>

              <Status tone='yellow'>02 Active</Status>
            </div>

            <div className='flex items-center justify-between rounded-lg bg-[#f5faf6] p-3'>
              <span className='text-xs text-[#53685e]'>Pending referrals</span>

              <Status tone='yellow'>07 Pending</Status>
            </div>
          </div>
        </Card>
      </div>

      {/* =========================
          AI SCHEDULING
      ========================= */}
      <Card className='mt-6 overflow-hidden p-0'>
        <div className='flex flex-col gap-3 border-b border-[#edf2ef] px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f5ed] text-[#27966b]'>
                <Activity size={17} />
              </div>

              <h2 className='text-[16px] font-semibold text-[#20362d]'>
                AI Scheduling Recommendation
              </h2>
            </div>

            <p className='mt-1 text-[11px] text-[#879890]'>
              AI analyzes specialist availability and recommends a suitable appointment slot.
            </p>
          </div>

          <span className='w-fit rounded-md bg-[#e8f5ed] px-2 py-1 text-[9px] font-semibold text-[#27966b]'>
            AI ASSISTED
          </span>
        </div>

        <div className='p-5'>
          <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
            {/* Referral */}
            <div className='rounded-xl border border-[#e4eee8] p-4'>
              <p className='text-[9px] uppercase tracking-wide text-[#8a9992]'>Referral</p>

              <h3 className='mt-2 text-sm font-semibold text-[#30483e]'>Sita Devi</h3>

              <p className='mt-1 text-[11px] text-[#71847b]'>Cardiology</p>

              <div className='mt-3'>
                <span className='rounded-md bg-[#fff4df] px-2 py-1 text-[9px] font-semibold text-[#c98216]'>
                  HIGH PRIORITY
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className='rounded-xl border border-[#cfe8da] bg-[#f5fbf7] p-4 lg:col-span-2'>
              <p className='text-[9px] font-semibold uppercase tracking-wide text-[#27966b]'>
                Recommended Slot
              </p>

              <h3 className='mt-2 text-xl font-semibold text-[#20362d]'>Today, 10:30 AM</h3>

              <p className='mt-1 text-[11px] text-[#53685e]'>Dr. XYZ · Cardiologist</p>

              <div className='mt-4 flex items-center gap-2 text-[10px] text-[#27966b]'>
                <span className='flex h-4 w-4 items-center justify-center rounded-full bg-[#27966b] text-white'>
                  ✓
                </span>
                Suitable slot found
              </div>

              <Link
                to='/hospital/doctors'
                className='mt-4 block w-full rounded-lg bg-[#27966b] py-2 text-center text-[11px] font-semibold text-white transition hover:bg-[#21875f]'
              >
                Review & Schedule
              </Link>
            </div>
          </div>
        </div>
      </Card>

      {/* =========================
          QUICK ACTIONS
      ========================= */}
      <div className='mt-6'>
        <h2 className='mb-3 text-base font-semibold text-[#20362d]'>Quick Actions</h2>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Referrals */}
          <Link
            to='/hospital/referrals'
            className='rounded-xl border border-[#e4eee8] bg-white p-4 text-left transition hover:border-[#c8ded2] hover:shadow-sm'
          >
            <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5ed] text-[#27966b]'>
              <FileText size={17} />
            </div>

            <p className='text-[13px] font-semibold text-[#20362d]'>Manage Referrals</p>

            <p className='mt-1 text-[10px] text-[#879890]'>Review and process incoming referrals</p>
          </Link>

          {/* Appointments */}
          <Link
            to='/hospital/appointments'
            className='rounded-xl border border-[#e4eee8] bg-white p-4 text-left transition hover:border-[#c8ded2] hover:shadow-sm'
          >
            <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5ed] text-[#27966b]'>
              <CalendarDays size={17} />
            </div>

            <p className='text-[13px] font-semibold text-[#20362d]'>Appointments</p>

            <p className='mt-1 text-[10px] text-[#879890]'>View and manage hospital appointments</p>
          </Link>

          {/* Doctors */}
          <Link
            to='/hospital/doctors'
            className='rounded-xl border border-[#e4eee8] bg-white p-4 text-left transition hover:border-[#c8ded2] hover:shadow-sm'
          >
            <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f5ed] text-[#27966b]'>
              <Users size={17} />
            </div>

            <p className='text-[13px] font-semibold text-[#20362d]'>Doctors</p>

            <p className='mt-1 text-[10px] text-[#879890]'>
              View doctors and their booked appointments
            </p>
          </Link>

          {/* Emergency */}
          <Link
            to='/hospital/emergency'
            className='rounded-xl border border-[#f1d7d7] bg-white p-4 text-left transition hover:border-[#e5bcbc] hover:shadow-sm'
          >
            <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffe8e8] text-[#d04444]'>
              <ShieldAlert size={17} />
            </div>

            <p className='text-[13px] font-semibold text-[#20362d]'>Emergency Cases</p>

            <p className='mt-1 text-[10px] text-[#879890]'>View and respond to emergency cases</p>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
