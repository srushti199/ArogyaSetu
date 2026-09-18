import { CalendarDays, FileText, MapPin, ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";
import { Card, PageHeader, Status } from "../components/UI";

const nav = [
  {
    to: "/patient/dashboard",
    label: "Dashboard",
    icon: CalendarDays,
  },
  {
    to: "/patient/appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    to: "/patient/facilities",
    label: "Find Facilities",
    icon: MapPin,
  },
  {
    to: "/patient/medical-history",
    label: "Medical History",
    icon: FileText,
  },
];

export default function PatientDashboard() {
  return (
    <PageShell role='patient' items={nav}>
      {/* Header */}
      <PageHeader
        eyebrow='Welcome back'
        title='Hello, Sita 👋'
        description='Manage your healthcare from one place.'
      />

      {/* Quick Cards */}
      <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-3'>
        <DashboardCard
          icon={CalendarDays}
          title='Appointments'
          description='View your upcoming and past appointments.'
          button='View Appointments'
          to='/patient/appointments'
        />

        <DashboardCard
          icon={MapPin}
          title='Find Facilities'
          description='Find hospitals, pharmacies, blood banks and diagnostics near you.'
          button='Find Nearby'
          to='/patient/facilities'
        />

        <DashboardCard
          icon={FileText}
          title='Medical History'
          description='View your previous consultations, diagnoses and reports.'
          button='View History'
          to='/patient/medical-history'
        />
      </div>

      {/* Next Appointment */}
      <Card className='mt-6 p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-base font-semibold'>Next Appointment</h2>

            <p className='mt-1 text-[10px] text-gray-400'>Your upcoming consultation</p>
          </div>

          <CalendarDays size={20} className='text-[#27966b]' />
        </div>

        {/* Appointment Details */}
        <div className='mt-5 rounded-xl bg-[#f5faf6] p-4'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm font-semibold'>Cardiologist</p>

              <p className='mt-1 text-[10px] text-gray-500'>Dr. XYZ</p>

              <p className='mt-1 text-[10px] text-gray-500'>KYC District Hospital</p>
            </div>

            <div className='text-left sm:text-right'>
              <p className='text-[11px] font-medium text-[#27966b]'>18 September 2026</p>

              <p className='mt-1 text-[10px] text-gray-500'>10:30 AM</p>
            </div>
          </div>
        </div>

        {/* Appointment Link */}
        <Link
          to='/patient/appointments'
          className='mt-4 inline-flex items-center gap-1 text-[10px] font-medium text-[#27966b] hover:underline'
        >
          View full appointment details
          <ChevronRight size={13} />
        </Link>
      </Card>
    </PageShell>
  );
}

/* Quick Dashboard Card */
function DashboardCard({ icon: Icon, title, description, button, to }) {
  return (
    <Card className='p-5'>
      {/* Icon */}
      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
        <Icon size={20} />
      </div>

      {/* Title */}
      <h3 className='mt-4 text-sm font-semibold'>{title}</h3>

      {/* Description */}
      <p className='mt-2 min-h-[35px] text-[10px] leading-5 text-gray-500'>{description}</p>

      {/* Button */}
      <Link
        to={to}
        className='mt-4 inline-flex items-center gap-1 text-[10px] font-medium text-[#27966b] hover:underline'
      >
        {button}
        <ChevronRight size={13} />
      </Link>
    </Card>
  );
}
