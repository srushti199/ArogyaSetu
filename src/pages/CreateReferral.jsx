import { useMemo, useState } from "react";

import {
  ArrowLeft,
  ChevronRight,
  FileText,
  FileText as ReferralIcon,
  Search,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import PageShell from "../components/PageShell";

import { Card, PageHeader, Status } from "../components/UI";

import { patients } from "../data/mockData";

const nav = [
  {
    to: "/phc/dashboard",
    label: "Dashboard",
    icon: Stethoscope,
  },
  {
    to: "/phc/teleconsultation",
    label: "Teleconsultation",
    icon: Stethoscope,
  },
  {
    to: "/phc/create-referral",
    label: "Create Referral",
    icon: FileText,
  },
];

export default function CreateReferral() {
  const [q, setQ] = useState("");
  const [patient, setPatient] = useState(null);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    reason: "",
    specialty: "",
    priority: "Normal",
    hospital: "KYC District Hospital",
    expectedDate: "",
  });

  const navigate = useNavigate();

  const list = useMemo(
    () =>
      patients.filter((p) => `${p.name} ${p.id} ${p.abha}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (patient && form.reason && form.specialty && form.hospital && form.expectedDate) {
      console.log("Referral created:", {
        patient,
        ...form,
      });

      setSent(true);
    }
  };

  const resetForm = () => {
    setQ("");
    setPatient(null);
    setSent(false);

    setForm({
      reason: "",
      specialty: "",
      priority: "Normal",
      hospital: "KYC District Hospital",
      expectedDate: "",
    });
  };

  return (
    <PageShell role='phc' items={nav}>
      <PageHeader
        eyebrow='Referral Management'
        title='Create Smart Referral'
        description='Refer a patient to a specialist or district hospital for further care.'
        action={
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center gap-2 rounded-xl border border-[#cddbd3] bg-white px-4 py-2.5 text-sm font-semibold text-[#526d62] transition hover:bg-[#f5f8f6]'
          >
            <ArrowLeft size={16} />
            Back
          </button>
        }
      />

      {sent ? (
        <Card className='mx-auto max-w-[900px] p-6 sm:p-8'>
          <div className='flex flex-col items-center text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f4ea] text-[#27966b]'>
              <ReferralIcon size={25} />
            </div>

            <h2 className='mt-5 text-lg font-semibold text-[#29483d]'>
              Referral Created Successfully
            </h2>

            <p className='mt-2 max-w-[500px] text-sm leading-5 text-[#7a9087]'>
              The referral for <span className='font-semibold text-[#38554b]'>{patient?.name}</span>{" "}
              has been created and is ready for hospital review.
            </p>

            <div className='mt-6 w-full max-w-[650px] rounded-xl bg-[#f3f8f4] p-5 text-left'>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                <SummaryItem label='PATIENT' value={patient?.name} />

                <SummaryItem label='SPECIALTY' value={form.specialty} />

                <SummaryItem label='PRIORITY' value={form.priority} />

                <SummaryItem label='HOSPITAL' value={form.hospital} />

                <SummaryItem label='EXPECTED DATE' value={form.expectedDate} />

                <SummaryItem label='PATIENT ID' value={patient?.id} />
              </div>
            </div>

            <div className='mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
              <button
                onClick={() => navigate("/phc/dashboard")}
                className='rounded-xl border border-[#dce8df] px-5 py-2.5 text-sm font-semibold text-[#526d62] transition hover:bg-[#f5f8f6]'
              >
                Back to Dashboard
              </button>

              <button
                onClick={resetForm}
                className='rounded-xl bg-[#27966b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#207856]'
              >
                Create Another Referral
              </button>
            </div>
          </div>
        </Card>
      ) : (
        <div className='grid gap-6 lg:grid-cols-[0.85fr_1.15fr]'>
          {/* =========================
              PATIENT SELECTION
          ========================= */}
          <Card className='p-5 sm:p-6'>
            <div>
              <h2 className='text-base font-semibold text-[#29483d]'>1. Select Patient</h2>

              <p className='mt-1.5 text-xs text-[#7a9087]'>
                Search using patient name, patient ID or ABHA ID.
              </p>
            </div>

            {/* Search */}
            <div className='relative mt-5'>
              <Search
                size={18}
                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#91a29b]'
              />

              <input
                type='text'
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='Search patient name, ID or ABHA ID...'
                className='w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] py-3 pl-11 pr-4 text-sm text-[#29483d] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
              />
            </div>

            {/* Patient List */}
            <div className='mt-4 space-y-2'>
              {list.length > 0 ? (
                list.map((p) => (
                  <button
                    key={p.id}
                    type='button'
                    onClick={() => setPatient(p)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition ${
                      patient?.id === p.id
                        ? "border-[#27966b] bg-[#eef8f2]"
                        : "border-[#e4ece7] bg-white hover:bg-[#f4faf6]"
                    }`}
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f2e8] text-[#348361]'>
                        <UserRound size={18} />
                      </div>

                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-[#38554b]'>{p.name}</p>

                        <p className='mt-1 truncate text-xs text-[#81938c]'>
                          {p.id} • {p.age} years • ABHA {p.abha}
                        </p>
                      </div>
                    </div>

                    <ChevronRight size={17} className='ml-2 shrink-0 text-[#8ca198]' />
                  </button>
                ))
              ) : (
                <p className='py-6 text-center text-xs text-[#81938c]'>No patient found.</p>
              )}
            </div>

            {/* Selected Patient */}
            {patient && (
              <div className='mt-5 rounded-xl bg-[#f3f8f4] p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex min-w-0 items-center gap-3'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4f2e7] text-[#27966b]'>
                      <UserRound size={20} />
                    </div>

                    <div className='min-w-0'>
                      <p className='truncate text-sm font-semibold text-[#365047]'>
                        {patient.name}
                      </p>

                      <p className='mt-1 text-xs text-[#80928b]'>
                        {patient.age} years • {patient.gender} • {patient.id}
                      </p>

                      <p className='mt-1 text-xs text-[#80928b]'>ABHA ID: {patient.abha}</p>
                    </div>
                  </div>

                  <button
                    type='button'
                    onClick={() => setPatient(null)}
                    className='shrink-0 text-xs font-semibold text-[#d85b57] hover:underline'
                  >
                    Change
                  </button>
                </div>

                <div className='mt-3 border-t border-[#dce8df] pt-3'>
                  <p className='text-xs text-[#71857d]'>Current condition</p>

                  <p className='mt-1 text-xs font-semibold text-[#38554b]'>{patient.condition}</p>
                </div>
              </div>
            )}
          </Card>

          {/* =========================
              REFERRAL DETAILS
          ========================= */}
          <Card className='p-5 sm:p-6'>
            <div>
              <h2 className='text-base font-semibold text-[#29483d]'>2. Referral Details</h2>

              <p className='mt-1.5 text-xs text-[#7a9087]'>
                Provide the clinical reason and destination for the referral.
              </p>
            </div>

            <form onSubmit={submit} className='mt-6 space-y-5'>
              {/* Reason */}
              <Field
                label='Referral Reason'
                name='reason'
                value={form.reason}
                onChange={change}
                placeholder="Describe the patient's symptoms, clinical findings and reason for referral..."
                as='textarea'
                rows={4}
              />

              {/* Specialty */}
              <Select
                label='Required Specialty'
                name='specialty'
                value={form.specialty}
                onChange={change}
                options={[
                  "Select specialty",
                  "Cardiology",
                  "Neurology",
                  "Gynecology",
                  "Orthopedics",
                  "General Medicine",
                ]}
              />

              {/* Priority */}
              <Select
                label='Priority Level'
                name='priority'
                value={form.priority}
                onChange={change}
                required={false}
                options={["Normal", "High", "Emergency"]}
              />

              {/* Hospital */}
              <Select
                label='Preferred / Suggested Hospital'
                name='hospital'
                value={form.hospital}
                onChange={change}
                options={["KYC District Hospital", "Pune Rural District Hospital"]}
              />

              {/* Expected Date */}
              <Field
                label='Expected Visit Date'
                name='expectedDate'
                value={form.expectedDate}
                onChange={change}
                type='date'
              />

              {/* Info */}
              <div className='rounded-xl border border-[#d8e9dd] bg-[#f3f8f4] p-4'>
                <p className='text-xs font-semibold text-[#365047]'>Referral tracking</p>

                <p className='mt-1.5 text-xs leading-5 text-[#7a9087]'>
                  Once created, the referral can be reviewed by the receiving hospital and tracked
                  until the patient's visit is completed.
                </p>
              </div>

              {/* Buttons */}
              <div className='flex flex-col gap-3 pt-1 sm:flex-row'>
                <button
                  type='button'
                  onClick={() => navigate("/phc/dashboard")}
                  className='flex-1 rounded-xl border border-[#dce8df] py-3 text-sm font-semibold text-[#526d62] transition hover:bg-[#f5f8f6]'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={!patient}
                  className='flex-1 rounded-xl bg-[#27966b] py-3 text-sm font-semibold text-white transition hover:bg-[#207856] disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Create Referral
                </button>
              </div>
            </form>

            {/* Success status */}
            {sent && (
              <div className='mt-4 rounded-xl border border-[#bfe5ce] bg-[#eaf8f0] p-4'>
                <Status>Referral created</Status>

                <p className='mt-2 text-sm font-semibold text-[#29483d]'>
                  Referral is now trackable until hospital completion.
                </p>

                <p className='mt-1 text-xs text-[#60736a]'>
                  Patient and ASHA worker can receive appointment and reminder updates.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </PageShell>
  );
}

/* =========================
   REUSABLE FIELD
========================= */

function Field({ label, as = "input", required = true, className = "", ...props }) {
  const Component = as;

  return (
    <label className='block text-xs font-semibold text-[#365047]'>
      {label}

      <Component
        required={required}
        {...props}
        className={`mt-1.5 w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] px-3 py-2.5 text-sm font-normal text-[#29483d] outline-none transition placeholder:text-[#9aa9a3] focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10 ${
          as === "textarea" ? "resize-none" : ""
        } ${className}`}
      />
    </label>
  );
}

/* =========================
   REUSABLE SELECT
========================= */

function Select({ label, options, required = true, ...props }) {
  return (
    <label className='block text-xs font-semibold text-[#365047]'>
      {label}

      <select
        required={required}
        {...props}
        className='mt-1.5 w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] px-3 py-2.5 text-sm font-normal text-[#29483d] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
      >
        {options.map((option) => (
          <option key={option} value={option === "Select specialty" ? "" : option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================
   SUCCESS SUMMARY ITEM
========================= */

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className='text-[10px] font-medium tracking-wide text-[#84968f]'>{label}</p>

      <p className='mt-1.5 break-words text-sm font-semibold text-[#38554b]'>{value || "—"}</p>
    </div>
  );
}
