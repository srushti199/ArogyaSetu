import { useState } from "react";

import { CalendarDays, Clock3, PhoneCall, Stethoscope, Video } from "lucide-react";

import PageShell from "../components/PageShell";
import { Card, PageHeader, Status } from "../components/UI";
import { patients } from "../data/mockData";

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
    icon: Stethoscope,
  },
  {
    to: "/phc/create-referral",
    label: "Create Referral",
    icon: Stethoscope,
  },
];

// =============================================================
// SCHEDULED CONSULTATIONS
// =============================================================

const scheduledConsultations = [
  {
    id: "TC-1024",
    patient: "Sita Devi",
    patientId: "PT-1024",
    specialist: "Cardiologist",
    hospital: "District Hospital",
    date: "18 September 2026",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: "TC-1031",
    patient: "Ramesh Patil",
    patientId: "PT-1031",
    specialist: "Neurologist",
    hospital: "District Hospital",
    date: "18 September 2026",
    time: "02:00 PM",
    status: "Scheduled",
  },
];

// =============================================================
// TELECONSULTATION
// =============================================================

export default function Teleconsultation() {
  const [activeTab, setActiveTab] = useState("request");

  const [form, setForm] = useState({
    patient: "",
    specialist: "",
    reason: "",
    date: "",
    time: "",
  });

  const [requested, setRequested] = useState(false);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequest = (e) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <PageShell role='phc' items={nav}>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        eyebrow='Specialist Care'
        title='Teleconsultation'
        description='Connect your PHC patients with specialists at the district hospital without requiring them to travel for every consultation.'
      />

      {/* =====================================================
          TELECONSULTATION OPTIONS
      ===================================================== */}

      <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Request */}

        <button
          onClick={() => setActiveTab("request")}
          className={`group rounded-xl border p-5 text-left transition ${
            activeTab === "request"
              ? "border-[#9ed0b1] bg-white shadow-sm"
              : "border-[#dfeae2] bg-white hover:border-[#b9d8c4]"
          }`}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='grid h-11 w-11 place-items-center rounded-xl bg-[#e5f3e9] text-[#27966b]'>
              <PhoneCall size={20} />
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                activeTab === "request"
                  ? "bg-[#e5f3e9] text-[#27966b]"
                  : "bg-[#f1f5f2] text-[#81938c]"
              }`}
            >
              REQUEST
            </span>
          </div>

          <h2 className='mt-4 text-[16px] font-semibold text-[#29483d]'>
            Request Teleconsultation
          </h2>

          <p className='mt-1.5 text-[11px] leading-4 text-[#7b8e86]'>
            Request a specialist consultation for a patient and provide your preferred date and
            time.
          </p>
        </button>

        {/* Start */}

        <button
          onClick={() => setActiveTab("start")}
          className={`group rounded-xl border p-5 text-left transition ${
            activeTab === "start"
              ? "border-[#9ed0b1] bg-white shadow-sm"
              : "border-[#dfeae2] bg-white hover:border-[#b9d8c4]"
          }`}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='grid h-11 w-11 place-items-center rounded-xl bg-[#e5f3e9] text-[#27966b]'>
              <Video size={20} />
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                activeTab === "start"
                  ? "bg-[#e5f3e9] text-[#27966b]"
                  : "bg-[#f1f5f2] text-[#81938c]"
              }`}
            >
              JOIN
            </span>
          </div>

          <h2 className='mt-4 text-[16px] font-semibold text-[#29483d]'>Start Teleconsultation</h2>

          <p className='mt-1.5 text-[11px] leading-4 text-[#7b8e86]'>
            View confirmed consultations and join the specialist call at the scheduled date and
            time.
          </p>
        </button>
      </div>

      {/* =====================================================
          REQUEST SECTION
      ===================================================== */}

      {activeTab === "request" && (
        <Card className='mt-5 p-5'>
          <div className='border-b border-[#edf2ee] pb-4'>
            <h2 className='text-[16px] font-semibold text-[#29483d]'>
              Request a Specialist Consultation
            </h2>

            <p className='mt-1 text-[11px] text-[#7b8e86]'>
              The district hospital will review the request and confirm the specialist, date and
              time.
            </p>
          </div>

          <form onSubmit={handleRequest} className='mt-5 space-y-4'>
            {/* Patient */}

            <Select
              label='Patient'
              name='patient'
              value={form.patient}
              onChange={change}
              options={patients.map((patient) => `${patient.id} — ${patient.name}`)}
            />

            {/* Specialist */}

            <Select
              label='Required Specialist'
              name='specialist'
              value={form.specialist}
              onChange={change}
              options={[
                "Cardiologist",
                "Neurologist",
                "Gynecologist",
                "Orthopedic Specialist",
                "General Physician",
              ]}
            />

            {/* Reason */}

            <Field
              label='Reason for Teleconsultation'
              name='reason'
              value={form.reason}
              onChange={change}
              placeholder="Describe the patient's condition and reason for specialist consultation..."
              textarea
            />

            {/* Date and Time */}

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Field
                label='Preferred Date'
                type='date'
                name='date'
                value={form.date}
                onChange={change}
                icon={<CalendarDays size={16} />}
              />

              <Field
                label='Preferred Time'
                type='time'
                name='time'
                value={form.time}
                onChange={change}
                icon={<Clock3 size={16} />}
              />
            </div>

            {/* Information */}

            <div className='rounded-lg bg-[#f3f8f4] p-3.5'>
              <div className='flex gap-2.5'>
                <CalendarDays size={17} className='mt-0.5 shrink-0 text-[#27966b]' />

                <p className='text-[10px] leading-4 text-[#6f837a]'>
                  Your preferred date and time are only a request. The district hospital will
                  confirm the final teleconsultation schedule.
                </p>
              </div>
            </div>

            {/* Submit */}

            <button
              type='submit'
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#17372d] py-3 text-sm font-semibold text-white transition hover:bg-[#27966b]'
            >
              <PhoneCall size={15} />
              Request Teleconsultation
            </button>
          </form>

          {/* Request Success */}

          {requested && (
            <div className='mt-4 rounded-xl bg-[#eaf8f0] p-4'>
              <Status>Request sent</Status>

              <p className='mt-2 text-sm text-[#53655d]'>
                District hospital has received the requested date and time.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* =====================================================
          START TELECONSULTATION
      ===================================================== */}

      {activeTab === "start" && (
        <div className='mt-5'>
          <Card className='overflow-hidden'>
            {/* Header */}

            <div className='border-b border-[#edf2ee] px-5 py-4'>
              <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                <div>
                  <h2 className='text-[16px] font-semibold text-[#29483d]'>
                    Scheduled Teleconsultations
                  </h2>

                  <p className='mt-1 text-[11px] text-[#7b8e86]'>
                    Join confirmed consultations with district hospital specialists.
                  </p>
                </div>

                <Status>2 Scheduled</Status>
              </div>
            </div>

            {/* Consultations */}

            <div className='space-y-3 p-5'>
              {scheduledConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className='rounded-xl border border-[#e1ebe4] p-4 transition hover:border-[#b9d8c4]'
                >
                  <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
                    {/* Patient */}

                    <div className='flex items-center gap-3'>
                      <div className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e5f3e9] text-[#27966b]'>
                        <span className='text-sm font-semibold'>
                          {consultation.patient.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <p className='text-[13px] font-semibold text-[#38554b]'>
                          {consultation.patient}
                        </p>

                        <p className='mt-1 text-[10px] text-[#81938c]'>
                          {consultation.patientId} • {consultation.id}
                        </p>
                      </div>
                    </div>

                    {/* Specialist */}

                    <div>
                      <p className='text-[9px] uppercase tracking-wide text-[#91a19a]'>
                        Specialist
                      </p>

                      <p className='mt-1 text-[11px] font-semibold text-[#38554b]'>
                        {consultation.specialist}
                      </p>

                      <p className='mt-0.5 text-[9px] text-[#81938c]'>{consultation.hospital}</p>
                    </div>

                    {/* Date */}

                    <div className='flex items-center gap-2'>
                      <div className='grid h-8 w-8 place-items-center rounded-lg bg-[#f2f8f3] text-[#27966b]'>
                        <CalendarDays size={15} />
                      </div>

                      <div>
                        <p className='text-[9px] text-[#91a19a]'>Date</p>

                        <p className='text-[11px] font-semibold text-[#38554b]'>
                          {consultation.date}
                        </p>
                      </div>
                    </div>

                    {/* Time */}

                    <div className='flex items-center gap-2'>
                      <div className='grid h-8 w-8 place-items-center rounded-lg bg-[#f2f8f3] text-[#27966b]'>
                        <Clock3 size={15} />
                      </div>

                      <div>
                        <p className='text-[9px] text-[#91a19a]'>Time</p>

                        <p className='text-[11px] font-semibold text-[#38554b]'>
                          {consultation.time}
                        </p>
                      </div>
                    </div>

                    {/* Join */}

                    <button
                      onClick={() =>
                        alert(`Joining teleconsultation with ${consultation.specialist}`)
                      }
                      className='flex items-center justify-center gap-2 rounded-lg bg-[#27966b] px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#207856]'
                    >
                      <Video size={15} />
                      Join Consultation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* =================================================
              STATUS CARDS
          ================================================= */}

          <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3'>
            <StatusCard title='Requested' value='03' description='Awaiting hospital confirmation' />

            <StatusCard title='Scheduled' value='02' description='Confirmed consultations' />

            <StatusCard title='Completed' value='18' description='Consultations completed' />
          </div>
        </div>
      )}
    </PageShell>
  );
}

// =============================================================
// FIELD
// =============================================================

function Field({ label, icon, textarea = false, ...props }) {
  return (
    <label className='block text-xs font-semibold text-[#365047]'>
      {label}

      <div className='relative mt-1.5'>
        {icon && (
          <span className='absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9b94]'>{icon}</span>
        )}

        {textarea ? (
          <textarea
            required
            rows={3}
            {...props}
            className='w-full resize-none rounded-xl border border-[#dce8df] bg-[#fbfdfb] px-3 py-3 text-sm font-normal text-[#365047] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
          />
        ) : (
          <input
            required
            {...props}
            className={`w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] py-2.5 pr-3 text-sm font-normal text-[#365047] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10 ${
              icon ? "pl-9" : "px-3"
            }`}
          />
        )}
      </div>
    </label>
  );
}

// =============================================================
// SELECT
// =============================================================

function Select({ label, options, ...props }) {
  return (
    <label className='block text-xs font-semibold text-[#365047]'>
      {label}

      <select
        required
        {...props}
        className='mt-1.5 w-full rounded-xl border border-[#dce8df] bg-[#fbfdfb] px-3 py-2.5 text-sm font-normal text-[#365047] outline-none transition focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
      >
        <option value=''>Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

// =============================================================
// STATUS CARD
// =============================================================

function StatusCard({ title, value, description }) {
  return (
    <Card className='p-4'>
      <p className='text-[10px] font-medium text-[#81938c]'>{title}</p>

      <p className='mt-1 text-[24px] font-semibold text-[#17372d]'>{value}</p>

      <p className='mt-1 text-[9px] text-[#8b9b95]'>{description}</p>
    </Card>
  );
}
