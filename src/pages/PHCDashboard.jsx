import { useMemo, useState } from "react";
import {
  Bell,
  ChevronRight,
  FileText,
  PhoneCall,
  Search,
  ShieldAlert,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageShell from "../components/PageShell";
import { Card, PageHeader, StatCard, Status } from "../components/UI";
import { patients, referrals } from "../data/mockData";

// =============================================================
// NAVIGATION
// =============================================================

const nav = [
  {
    to: "/phc/dashboard",
    label: "Dashboard",
    icon: Stethoscope,
  },
  {
    to: "/phc/teleconsultation",
    label: "Teleconsultation",
    icon: PhoneCall,
  },
  {
    to: "/phc/create-referral",
    label: "Create Referral",
    icon: FileText,
  },
];

// =============================================================
// PHC DASHBOARD
// =============================================================

export default function PHCDashboard() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // ===========================================================
  // PATIENT SEARCH
  // ===========================================================

  const results = useMemo(
    () =>
      patients.filter((patient) =>
        `${patient.name} ${patient.id} ${patient.abha}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <PageShell role='phc' items={nav}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow='Good morning, Doctor'
        title="Let's take care of your patients."
        description='Manage patients, referrals, emergencies and specialist consultations.'
        action={
          <Link
            to='/phc/create-referral'
            className='inline-flex items-center rounded-xl bg-[#27966b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#21845e]'
          >
            + Create referral
          </Link>
        }
      />

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className='mt-8'>
        <h2 className='text-[16px] font-semibold text-[#29483d]'>Quick actions</h2>

        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <ActionCard
            icon={<FileText size={21} />}
            title='Create Referral'
            text='Refer patient to a specialist'
            to='/phc/create-referral'
          />

          <ActionCard
            icon={<Search size={21} />}
            title='Search Patient'
            text='Find profile and health records'
            onClick={() => {
              document.getElementById("patient-search")?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          <ActionCard
            icon={<PhoneCall size={21} />}
            title='Teleconsultation'
            text='Connect with district hospital'
            to='/phc/teleconsultation'
          />
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className='mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]'>
        {/* ===================================================
            PATIENT SEARCH
        =================================================== */}

        <Card className='p-5' id='patient-search'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-[16px] font-semibold text-[#29483d]'>Search patient record</h2>

              <p className='mt-1.5 text-xs text-[#718078]'>
                Search using patient name, patient ID or ABHA ID.
              </p>
            </div>

            <Search size={19} className='text-[#27966b]' />
          </div>

          {/* Search box */}

          <div className='relative mt-5'>
            <Search
              size={17}
              className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91a29b]'
            />

            <input
              id='patient-search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search patient name, ID or ABHA ID...'
              className='w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] py-3.5 pl-10 pr-4 text-sm text-[#29483d] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
            />
          </div>

          {/* Search results */}

          {query && (
            <div className='mt-4 space-y-2'>
              {results.length > 0 ? (
                results.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelected(patient)}
                    className='flex w-full items-center justify-between rounded-xl border border-[#e4ece7] p-3.5 text-left transition hover:bg-[#f5faf6]'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f2e8] text-[#348361]'>
                        <UserRound size={18} />
                      </div>

                      <div>
                        <p className='text-sm font-semibold text-[#38554b]'>{patient.name}</p>

                        <p className='mt-1 text-xs text-[#81938c]'>
                          {patient.id} • ABHA: {patient.abha}
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={18} className='text-[#8ca198]' />
                  </button>
                ))
              ) : (
                <p className='py-5 text-center text-sm text-[#718078]'>No patient found.</p>
              )}
            </div>
          )}

          {/* Selected patient */}

          {selected && (
            <div className='mt-5 rounded-xl bg-[#eef8f2] p-4'>
              <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-start'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f2e7] text-[#27966b]'>
                    <UserRound size={20} />
                  </div>

                  <div>
                    <h3 className='text-sm font-bold text-[#29483d]'>{selected.name}</h3>

                    <p className='mt-1 text-xs text-[#53655d]'>
                      {selected.age} years • {selected.gender}
                    </p>

                    <p className='mt-1 text-xs text-[#718078]'>
                      {selected.id} • ABHA: {selected.abha}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className='text-left text-xs font-semibold text-[#27966b] hover:underline sm:text-right'
                >
                  Close
                </button>
              </div>

              <p className='mt-3 text-xs leading-5 text-[#718078]'>
                Current condition:{" "}
                <span className='font-semibold text-[#53655d]'>{selected.condition}</span>
              </p>

              <div className='mt-4 flex flex-wrap gap-2'>
                <Link
                  to='/phc/create-referral'
                  state={{ patient: selected }}
                  className='rounded-lg bg-[#27966b] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#207856]'
                >
                  Create Referral
                </Link>

                <button className='rounded-lg border border-[#cddbd3] px-3.5 py-2 text-xs font-semibold text-[#365047] transition hover:bg-white'>
                  View Health Records
                </button>
              </div>

              {/* Previous records */}

              <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
                <RecordCard title='Previous Consultation' value='Cardiology' date='12 Aug 2026' />

                <RecordCard title='Diagnosis' value={selected.condition} date='12 Aug 2026' />

                <RecordCard title='Last Referral' value='Completed' date='28 Jul 2026' />
              </div>
            </div>
          )}
        </Card>

        {/* ===================================================
            RECENT REFERRALS
        =================================================== */}

        <Card className='p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-[16px] font-semibold text-[#29483d]'>Recent referrals</h2>

              <p className='mt-1.5 text-xs text-[#718078]'>
                Track your recently created patient referrals.
              </p>
            </div>

            <FileText size={19} className='text-[#27966b]' />
          </div>

          <div className='mt-4 space-y-3'>
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className='rounded-xl border border-[#e4ece7] p-3.5 transition hover:bg-[#f8fcf9]'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold text-[#38554b]'>{referral.patient}</p>

                    <p className='mt-1 text-xs text-[#718078]'>
                      {referral.specialty} • {referral.date}
                    </p>

                    <p className='mt-1 text-xs text-[#81938c]'>{referral.hospital}</p>
                  </div>

                  <Status
                    tone={
                      referral.status === "Completed"
                        ? "green"
                        : referral.priority === "High"
                          ? "yellow"
                          : "blue"
                    }
                  >
                    {referral.status}
                  </Status>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom actions */}

          <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <Link
              to='/phc/teleconsultation'
              className='rounded-xl border border-[#cddbd3] p-3 text-center text-sm font-semibold text-[#365047] transition hover:bg-[#f5faf6]'
            >
              <PhoneCall size={17} className='mx-auto mb-1 text-[#27966b]' />
              Teleconsultation
            </Link>

            <div className='rounded-xl bg-[#fff6e1] p-3 text-center text-sm font-semibold text-[#7d5a0b]'>
              <ShieldAlert className='mx-auto mb-1' size={17} />
              Emergency ready
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          MY PATIENTS
      ===================================================== */}

      <section className='mt-8'>
        <Card className='overflow-hidden'>
          <div className='flex items-center justify-between border-b border-[#edf2ee] px-5 py-4'>
            <div>
              <h2 className='text-[16px] font-semibold text-[#29483d]'>My Patients</h2>

              <p className='mt-1 text-xs text-[#718078]'>
                View patients currently managed at your PHC.
              </p>
            </div>

            <Users size={19} className='text-[#27966b]' />
          </div>

          <div className='divide-y divide-[#edf2ee]'>
            {patients.map((patient) => (
              <div
                key={patient.id}
                className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f2e8] text-[#348361]'>
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className='text-sm font-semibold text-[#38554b]'>{patient.name}</p>

                    <p className='mt-1 text-xs text-[#81938c]'>
                      {patient.id} • {patient.age} years • {patient.condition}
                    </p>
                  </div>
                </div>

                <span className='w-fit rounded-full bg-[#edf6ef] px-2.5 py-1.5 text-[10px] font-semibold text-[#398261]'>
                  Active
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* =====================================================
          EMERGENCY SUPPORT
      ===================================================== */}

      <section className='mt-8 rounded-xl border border-[#f0d1ce] bg-[#fff9f8] p-5 sm:p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#ffe7e4] text-[#dd5a55]'>
              <ShieldAlert size={21} />
            </div>

            <div>
              <h2 className='text-[16px] font-semibold text-[#29483d]'>Emergency Support</h2>

              <p className='mt-1.5 max-w-[650px] text-xs leading-5 text-[#80928b]'>
                For urgent cases, notify the appropriate hospital for immediate assessment and
                treatment.
              </p>
            </div>
          </div>

          <button className='rounded-lg bg-[#dd5a55] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#c94d49]'>
            Create Emergency Alert
          </button>
        </div>
      </section>
    </PageShell>
  );
}

// =============================================================
// ACTION CARD
// =============================================================

function ActionCard({ icon, title, text, to, onClick }) {
  const content = (
    <>
      <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f4ea] text-[#328362]'>
        {icon}
      </div>

      <p className='mt-4 text-sm font-semibold text-[#38554b]'>{title}</p>

      <p className='mt-1.5 text-[11px] leading-5 text-[#80928b]'>{text}</p>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className='group rounded-xl border border-[#dfeae2] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#b9d8c4] hover:shadow-sm'
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className='group rounded-xl border border-[#dfeae2] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-[#b9d8c4] hover:shadow-sm'
    >
      {content}
    </button>
  );
}

// =============================================================
// RECORD CARD
// =============================================================

function RecordCard({ title, value, date }) {
  return (
    <div className='rounded-lg border border-[#e4eee7] bg-[#fbfdfb] p-4'>
      <p className='text-[10px] text-[#84968f]'>{title}</p>

      <p className='mt-2 text-xs font-semibold text-[#38554b]'>{value}</p>

      <p className='mt-1.5 text-[10px] text-[#91a19b]'>{date}</p>
    </div>
  );
}
