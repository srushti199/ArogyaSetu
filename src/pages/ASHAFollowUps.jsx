import { useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Phone,
  Users,
  X,
} from "lucide-react";

import PageShell from "../components/PageShell";
import { Card, PageHeader, Status } from "../components/UI";

const nav = [
  { to: "/asha/dashboard", label: "Dashboard", icon: Users },
  { to: "/asha/follow-ups", label: "Follow-ups", icon: CalendarCheck },
  { to: "/asha/high-risk", label: "Maternal & Chronic", icon: FileText },
  { to: "/asha/my-area", label: "My Area", icon: MapPin },
  { to: "/asha/register-patient", label: "Register Patient", icon: Users },
];

const initial = [
  {
    id: "REF-2081",
    patient: "Sita Devi",
    reason: "Cardiology referral",
    due: "18 Sep",
    phone: "+91 XXXXX XXXXX",
    status: "Overdue",
  },
  {
    id: "REF-2074",
    patient: "Ramesh Patil",
    reason: "Diabetes review",
    due: "17 Sep",
    phone: "+91 XXXXX XXXXX",
    status: "Overdue",
  },
  {
    id: "REF-2069",
    patient: "Sunita Sharma",
    reason: "ANC specialist visit",
    due: "19 Sep",
    phone: "+91 XXXXX XXXXX",
    status: "Due soon",
  },
];

export default function ASHAFollowUps() {
  const [rows, setRows] = useState(initial);
  const [reason, setReason] = useState("");
  const [active, setActive] = useState(null);

  const overdueCount = rows.filter((r) => r.status === "Overdue").length;
  const dueSoonCount = rows.filter((r) => r.status === "Due soon").length;
  const contactedCount = rows.filter((r) => r.status === "Contacted").length;

  const save = () => {
    if (!active || !reason) return;

    setRows(
      rows.map((r) =>
        r.id === active.id
          ? {
              ...r,
              status: "Contacted",
              barrier: reason,
            }
          : r,
      ),
    );

    setActive(null);
    setReason("");
  };

  return (
    <PageShell role='asha' items={nav}>
      <PageHeader
        eyebrow='Referral continuity'
        title='Follow-ups'
        description='Track patient referrals and record follow-up actions to support timely care.'
      />

      {/* Summary */}
      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <SummaryCard
          icon={<Clock3 size={18} />}
          label='Overdue'
          value={overdueCount}
          description='Needs attention'
          tone='red'
        />

        <SummaryCard
          icon={<CalendarCheck size={18} />}
          label='Due Soon'
          value={dueSoonCount}
          description='Upcoming visits'
          tone='yellow'
        />

        <SummaryCard
          icon={<CheckCircle2 size={18} />}
          label='Contacted'
          value={contactedCount}
          description='Follow-up recorded'
          tone='green'
        />
      </div>

      {/* Info Banner */}
      <div className='mt-6 flex gap-3 rounded-2xl border border-[#dcebe2] bg-white p-4 shadow-sm'>
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f4ed] text-[#27966b]'>
          <CalendarCheck size={17} />
        </div>

        <div>
          <p className='text-xs font-semibold text-[#20362d]'>Referral follow-up matters</p>

          <p className='mt-1 text-[11px] leading-5 text-[#718078]'>
            Contact patients who have not completed their hospital visit and record any barriers
            that may be affecting their care.
          </p>
        </div>
      </div>

      {/* Follow-up List */}
      <div className='mt-7'>
        <div className='mb-3 flex items-center justify-between'>
          <div>
            <h2 className='text-sm font-semibold text-[#20362d]'>Patients Requiring Follow-up</h2>

            <p className='mt-1 text-[10px] text-[#879890]'>
              Review referral status and take the required action.
            </p>
          </div>

          <span className='rounded-full bg-[#edf7f1] px-3 py-1 text-[10px] font-semibold text-[#27966b]'>
            {rows.length} referrals
          </span>
        </div>

        <div className='space-y-4'>
          {rows.map((r) => (
            <FollowUpCard key={r.id} row={r} onRecord={() => setActive(r)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]'>
          <div className='w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl'>
            {/* Modal Header */}
            <div className='flex items-start justify-between border-b border-[#edf2ef] px-5 py-4'>
              <div>
                <p className='text-[10px] font-semibold uppercase tracking-[1px] text-[#27966b]'>
                  Follow-up record
                </p>

                <h2 className='mt-1 text-base font-bold text-[#20362d]'>{active.patient}</h2>

                <p className='mt-1 text-[10px] text-[#879890]'>
                  {active.id} • {active.reason}
                </p>
              </div>

              <button
                onClick={() => {
                  setActive(null);
                  setReason("");
                }}
                className='rounded-lg p-1.5 text-gray-400 hover:bg-[#f5faf6] hover:text-gray-600'
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-5'>
              <div className='rounded-xl bg-[#f5faf6] p-3'>
                <p className='text-[10px] font-medium text-[#718078]'>Expected hospital visit</p>

                <p className='mt-1 text-sm font-semibold text-[#20362d]'>{active.due}</p>
              </div>

              <label className='mt-5 block'>
                <span className='text-xs font-semibold text-[#20362d]'>Follow-up barrier</span>

                <span className='mt-1 block text-[10px] text-[#879890]'>
                  Select the main reason the patient could not visit.
                </span>

                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className='mt-2 h-11 w-full rounded-xl border border-[#dce8df] bg-white px-3 text-xs text-[#20362d] outline-none focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
                >
                  <option value=''>Select barrier</option>
                  <option value='Travel distance'>Travel distance</option>
                  <option value='Could not afford travel'>Could not afford travel</option>
                  <option value='Did not understand appointment'>
                    Did not understand appointment
                  </option>
                  <option value='Family / work constraints'>Family / work constraints</option>
                  <option value='Other'>Other</option>
                </select>
              </label>

              {/* Modal Buttons */}
              <div className='mt-5 flex gap-3'>
                <button
                  onClick={() => {
                    setActive(null);
                    setReason("");
                  }}
                  className='flex-1 rounded-xl border border-[#d9e7df] py-2.5 text-xs font-semibold text-[#718078] hover:bg-[#f5faf6]'
                >
                  Cancel
                </button>

                <button
                  disabled={!reason}
                  onClick={save}
                  className='flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#27966b] py-2.5 text-xs font-semibold text-white transition hover:bg-[#21835c] disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <CheckCircle2 size={15} />
                  Save Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({ icon, label, value, description, tone }) {
  const styles = {
    red: {
      box: "bg-[#fff7f7]",
      icon: "bg-[#ffe7e7] text-[#d04444]",
      value: "text-[#b13c30]",
    },
    yellow: {
      box: "bg-[#fffaf0]",
      icon: "bg-[#fff1d8] text-[#c98216]",
      value: "text-[#a96f12]",
    },
    green: {
      box: "bg-[#f2faf5]",
      icon: "bg-[#e2f4e9] text-[#27966b]",
      value: "text-[#1e7655]",
    },
  };

  const style = styles[tone];

  return (
    <div className={`rounded-2xl border border-[#e4eee8] p-4 shadow-sm ${style.box}`}>
      <div className='flex items-center justify-between'>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${style.icon}`}>
          {icon}
        </div>

        <span className={`text-2xl font-bold ${style.value}`}>{value}</span>
      </div>

      <p className='mt-3 text-xs font-semibold text-[#20362d]'>{label}</p>

      <p className='mt-0.5 text-[10px] text-[#879890]'>{description}</p>
    </div>
  );
}

/* ================= FOLLOW-UP CARD ================= */

function FollowUpCard({ row, onRecord }) {
  const tone = row.status === "Overdue" ? "red" : row.status === "Contacted" ? "green" : "yellow";

  return (
    <Card className='overflow-hidden p-0'>
      <div className='p-5'>
        {/* Top */}
        <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
          <div className='flex gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f4ed] text-[#27966b]'>
              <Users size={19} />
            </div>

            <div>
              <div className='flex flex-wrap items-center gap-2'>
                <h2 className='text-sm font-bold text-[#20362d]'>{row.patient}</h2>

                <Status tone={tone}>{row.status}</Status>
              </div>

              <p className='mt-1 text-xs font-medium text-[#27966b]'>{row.reason}</p>

              <p className='mt-1 text-[10px] text-[#879890]'>Referral ID: {row.id}</p>
            </div>
          </div>

          {/* Expected Date */}
          <div className='rounded-xl bg-[#f5faf6] px-4 py-2.5 md:min-w-[120px]'>
            <div className='flex items-center gap-1.5 text-[#879890]'>
              <CalendarCheck size={13} />

              <span className='text-[9px] font-medium uppercase tracking-wide'>Expected visit</span>
            </div>

            <p className='mt-1 text-xs font-bold text-[#20362d]'>{row.due}</p>
          </div>
        </div>

        {/* Barrier */}
        {row.barrier && (
          <div className='mt-4 rounded-xl border border-[#dcebe2] bg-[#f8fbf9] px-3 py-2.5'>
            <p className='text-[9px] font-semibold uppercase tracking-wide text-[#879890]'>
              Follow-up barrier
            </p>

            <p className='mt-1 text-[11px] text-[#5d7067]'>{row.barrier}</p>
          </div>
        )}

        {/* Bottom */}
        <div className='mt-5 flex flex-col gap-3 border-t border-[#edf2ef] pt-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-2 text-[#718078]'>
            <Phone size={14} />

            <span className='text-[10px]'>{row.phone}</span>
          </div>

          <div className='flex gap-2'>
            <a
              href={`tel:${row.phone}`}
              className='flex items-center justify-center gap-1.5 rounded-xl border border-[#cddbd3] px-4 py-2 text-[10px] font-semibold text-[#20362d] transition hover:bg-[#f5faf6]'
            >
              <Phone size={13} />
              Call Patient
            </a>

            {row.status !== "Contacted" && (
              <button
                onClick={onRecord}
                className='flex items-center justify-center gap-1.5 rounded-xl bg-[#17372d] px-4 py-2 text-[10px] font-semibold text-white transition hover:bg-[#27966b]'
              >
                <CheckCircle2 size={13} />
                Record Follow-up
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
