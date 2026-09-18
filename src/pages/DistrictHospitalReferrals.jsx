import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import PageShell from "../components/PageShell";
import { Card, PageHeader, Status } from "../components/UI";

const nav = [
  {
    to: "/hospital/dashboard",
    label: "Dashboard",
    icon: Activity,
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
    icon: AlertCircle,
  },
];

const initialReferrals = [
  {
    id: "REF-2041",
    patient: "Sita Devi",
    age: 42,
    gender: "Female",
    from: "Vadgaon PHC",
    department: "Cardiology",
    doctor: "Dr. XYZ",
    reason: "Chest discomfort and irregular heartbeat",
    priority: "High",
    status: "New",
    date: "18 Sep 2026",
    time: "09:45 AM",
    notes: "Patient requires cardiac evaluation and ECG assessment.",
  },
  {
    id: "REF-2042",
    patient: "Ramesh Patil",
    age: 56,
    gender: "Male",
    from: "Kheda PHC",
    department: "Diabetology",
    doctor: "Dr. ABC",
    reason: "Uncontrolled blood sugar levels",
    priority: "Medium",
    status: "Accepted",
    date: "18 Sep 2026",
    time: "09:20 AM",
    notes: "Review current medication and blood sugar reports.",
  },
  {
    id: "REF-2043",
    patient: "Sunita Sharma",
    age: 34,
    gender: "Female",
    from: "Pimpri Rural PHC",
    department: "Gynecology",
    doctor: "Dr. MNO",
    reason: "ANC specialist consultation",
    priority: "High",
    status: "Scheduled",
    date: "18 Sep 2026",
    time: "08:50 AM",
    notes: "Specialist ANC consultation required.",
  },
  {
    id: "REF-2044",
    patient: "Mahesh Kumar",
    age: 61,
    gender: "Male",
    from: "Vadgaon PHC",
    department: "Cardiology",
    doctor: "Dr. XYZ",
    reason: "Severe chest pain and breathing difficulty",
    priority: "Emergency",
    status: "Accepted",
    date: "18 Sep 2026",
    time: "08:35 AM",
    notes: "Immediate cardiac assessment required.",
  },
  {
    id: "REF-2048",
    patient: "Lakshmi Devi",
    age: 68,
    gender: "Female",
    from: "Kheda PHC",
    department: "Neurology",
    doctor: "Dr. PQR",
    reason: "Sudden weakness and dizziness",
    priority: "High",
    status: "New",
    date: "18 Sep 2026",
    time: "08:10 AM",
    notes: "Neurological evaluation recommended at the earliest.",
  },
  {
    id: "REF-2051",
    patient: "Anita Patil",
    age: 45,
    gender: "Female",
    from: "Dapodi PHC",
    department: "Cardiology",
    doctor: "Dr. PQR",
    reason: "Persistent high blood pressure",
    priority: "Medium",
    status: "Completed",
    date: "17 Sep 2026",
    time: "04:15 PM",
    notes: "Cardiology consultation completed.",
  },
];

const statusTone = {
  New: "blue",
  Accepted: "green",
  Scheduled: "yellow",
  Completed: "green",
};

const priorityTone = {
  Emergency: "red",
  High: "yellow",
  Medium: "blue",
};

function SummaryCard({ icon: Icon, label, value, description }) {
  return (
    <Card className='p-5'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-[#71847b]'>{label}</p>

          <p className='mt-2 text-3xl font-bold text-[#17372d]'>{value}</p>

          <p className='mt-1 text-xs text-[#879890]'>{description}</p>
        </div>

        <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf7f1] text-[#27966b]'>
          <Icon size={21} />
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className='flex items-start gap-3'>
      <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f7f3] text-[#27966b]'>
        <Icon size={16} />
      </div>

      <div className='min-w-0'>
        <p className='text-xs font-medium text-[#879890]'>{label}</p>

        <p className='mt-0.5 text-sm font-semibold text-[#20362d]'>{value}</p>
      </div>
    </div>
  );
}

function ReferralCard({ referral, onView }) {
  return (
    <Card className='overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md'>
      <div className='border-b border-[#edf2ef] px-5 py-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#27966b]'>
              <Users size={20} />
            </div>

            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='text-base font-bold text-[#17372d]'>{referral.patient}</h3>

                <Status tone={priorityTone[referral.priority]}>{referral.priority}</Status>

                <Status tone={statusTone[referral.status]}>{referral.status}</Status>
              </div>

              <p className='mt-1 text-xs text-[#879890]'>Referral ID: {referral.id}</p>
            </div>
          </div>

          <div className='flex items-center gap-1.5 text-xs text-[#879890]'>
            <Clock3 size={14} />
            {referral.time}
          </div>
        </div>
      </div>

      <div className='grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-4'>
        <InfoItem icon={FileText} label='Referral Reason' value={referral.reason} />

        <InfoItem icon={Stethoscope} label='Department' value={referral.department} />

        <InfoItem icon={MapPin} label='Referred From' value={referral.from} />

        <InfoItem
          icon={CalendarCheck}
          label='Received'
          value={`${referral.date}, ${referral.time}`}
        />
      </div>

      <div className='border-t border-[#edf2ef] bg-[#fbfdfc] px-5 py-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-xs font-medium text-[#879890]'>Assigned Doctor</p>

            <p className='mt-1 text-sm font-semibold text-[#20362d]'>{referral.doctor}</p>
          </div>

          <button
            type='button'
            onClick={() => onView(referral)}
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce9e2] bg-white px-4 py-2.5 text-sm font-semibold text-[#27966b] transition hover:bg-[#f0f8f4]'
          >
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
}

function ReferralModal({ referral, onClose }) {
  if (!referral) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#17372d]/40 p-4 backdrop-blur-sm'>
      <div className='max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl'>
        <div className='sticky top-0 z-10 flex items-start justify-between border-b border-[#edf2ef] bg-white px-5 py-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[1.2px] text-[#27966b]'>
              Referral Details
            </p>

            <h2 className='mt-1 text-xl font-bold text-[#17372d]'>{referral.patient}</h2>

            <p className='mt-1 text-xs text-[#879890]'>{referral.id}</p>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='flex h-9 w-9 items-center justify-center rounded-lg text-[#71847b] transition hover:bg-[#f1f6f3] hover:text-[#17372d]'
          >
            <X size={19} />
          </button>
        </div>

        <div className='space-y-5 p-5'>
          <div className='flex flex-wrap gap-2'>
            <Status tone={priorityTone[referral.priority]}>{referral.priority} Priority</Status>

            <Status tone={statusTone[referral.status]}>{referral.status}</Status>
          </div>

          <div className='grid gap-4 rounded-xl border border-[#e4eee8] bg-[#fbfdfc] p-4 sm:grid-cols-2'>
            <InfoItem
              icon={Users}
              label='Patient'
              value={`${referral.patient}, ${referral.age} years`}
            />

            <InfoItem icon={Users} label='Gender' value={referral.gender} />

            <InfoItem icon={MapPin} label='Referred From' value={referral.from} />

            <InfoItem icon={Stethoscope} label='Department' value={referral.department} />

            <InfoItem icon={Stethoscope} label='Assigned Doctor' value={referral.doctor} />

            <InfoItem
              icon={CalendarCheck}
              label='Received'
              value={`${referral.date}, ${referral.time}`}
            />
          </div>

          <div>
            <p className='text-xs font-semibold uppercase tracking-[1px] text-[#879890]'>
              Referral Reason
            </p>

            <div className='mt-2 rounded-xl border border-[#e4eee8] bg-white p-4 text-sm leading-6 text-[#20362d]'>
              {referral.reason}
            </div>
          </div>

          <div>
            <p className='text-xs font-semibold uppercase tracking-[1px] text-[#879890]'>
              Clinical Notes
            </p>

            <div className='mt-2 rounded-xl border border-[#e4eee8] bg-[#f8fbf9] p-4 text-sm leading-6 text-[#52655c]'>
              {referral.notes}
            </div>
          </div>

          <div className='flex items-start gap-3 rounded-xl border border-[#dcebe2] bg-[#f2faf5] p-4'>
            <CheckCircle2 size={19} className='mt-0.5 shrink-0 text-[#27966b]' />

            <div>
              <p className='text-sm font-semibold text-[#17372d]'>Automated referral workflow</p>

              <p className='mt-1 text-xs leading-5 text-[#62756c]'>
                Referral processing is handled automatically by ArogyaSetu. The hospital team can
                review the referral and its current status here.
              </p>
            </div>
          </div>

          <div className='flex justify-end border-t border-[#edf2ef] pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl bg-[#27966b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20855d]'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DistrictHospitalReferrals() {
  const [referrals] = useState(initialReferrals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedReferral, setSelectedReferral] = useState(null);

  const stats = useMemo(() => {
    return {
      total: referrals.length,
      new: referrals.filter((item) => item.status === "New").length,
      accepted: referrals.filter((item) => item.status === "Accepted").length,
      scheduled: referrals.filter((item) => item.status === "Scheduled").length,
      emergency: referrals.filter((item) => item.priority === "Emergency").length,
    };
  }, [referrals]);

  const filteredReferrals = useMemo(() => {
    const value = search.trim().toLowerCase();

    return referrals.filter((referral) => {
      const matchesSearch =
        !value ||
        referral.patient.toLowerCase().includes(value) ||
        referral.id.toLowerCase().includes(value) ||
        referral.from.toLowerCase().includes(value) ||
        referral.department.toLowerCase().includes(value);

      const matchesStatus = statusFilter === "All" || referral.status === statusFilter;

      const matchesPriority = priorityFilter === "All" || referral.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [referrals, search, statusFilter, priorityFilter]);

  return (
    <PageShell role='hospital' items={nav}>
      <PageHeader
        eyebrow='Hospital Coordination'
        title='Referrals'
        description='View and monitor all patient referrals received from PHCs through the ArogyaSetu system.'
      />

      {/* Summary */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        <SummaryCard
          icon={FileText}
          label='Total Referrals'
          value={stats.total}
          description='All received referrals'
        />

        <SummaryCard icon={Clock3} label='New' value={stats.new} description='Recently received' />

        <SummaryCard
          icon={CheckCircle2}
          label='Accepted'
          value={stats.accepted}
          description='Automatically accepted'
        />

        <SummaryCard
          icon={CalendarCheck}
          label='Scheduled'
          value={stats.scheduled}
          description='Appointments scheduled'
        />

        <SummaryCard
          icon={AlertCircle}
          label='Emergency'
          value={stats.emergency}
          description='Priority referrals'
        />
      </div>

      {/* Automated workflow notice */}
      <div className='mt-6 flex items-start gap-3 rounded-2xl border border-[#dcebe2] bg-[#f2faf5] p-4'>
        <CheckCircle2 size={20} className='mt-0.5 shrink-0 text-[#27966b]' />

        <div>
          <p className='text-sm font-bold text-[#17372d]'>Automated Referral Processing</p>

          <p className='mt-1 text-xs leading-5 text-[#62756c]'>
            Referrals are automatically processed by the system. Hospital staff can view referral
            information, priority, assigned department, doctor and current status from this page.
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <Card className='mt-6 p-4'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='relative w-full lg:max-w-md'>
            <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-[#879890]' />

            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search patient, referral ID, PHC...'
              className='w-full rounded-xl border border-[#dfeae4] bg-[#fbfdfc] py-2.5 pl-10 pr-4 text-sm text-[#20362d] outline-none transition placeholder:text-[#9aa8a2] focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
            />
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='rounded-xl border border-[#dfeae4] bg-white px-4 py-2.5 text-sm font-medium text-[#20362d] outline-none focus:border-[#27966b]'
            >
              <option value='All'>All Status</option>
              <option value='New'>New</option>
              <option value='Accepted'>Accepted</option>
              <option value='Scheduled'>Scheduled</option>
              <option value='Completed'>Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className='rounded-xl border border-[#dfeae4] bg-white px-4 py-2.5 text-sm font-medium text-[#20362d] outline-none focus:border-[#27966b]'
            >
              <option value='All'>All Priority</option>
              <option value='Emergency'>Emergency</option>
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Referral list */}
      <div className='mt-7'>
        <div className='mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-lg font-bold text-[#17372d]'>Incoming Referrals</h2>

            <p className='mt-1 text-sm text-[#71847b]'>
              {filteredReferrals.length} referral
              {filteredReferrals.length !== 1 ? "s" : ""} displayed
            </p>
          </div>
        </div>

        {filteredReferrals.length > 0 ? (
          <div className='space-y-4'>
            {filteredReferrals.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} onView={setSelectedReferral} />
            ))}
          </div>
        ) : (
          <Card className='p-10 text-center'>
            <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf6f1] text-[#27966b]'>
              <Search size={24} />
            </div>

            <h3 className='mt-4 text-base font-bold text-[#17372d]'>No referrals found</h3>

            <p className='mt-1 text-sm text-[#71847b]'>
              Try changing your search or filter selection.
            </p>
          </Card>
        )}
      </div>

      <ReferralModal referral={selectedReferral} onClose={() => setSelectedReferral(null)} />
    </PageShell>
  );
}
