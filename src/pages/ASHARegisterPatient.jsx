import { useState } from "react";
import { FileText, HeartPulse, MapPin, Phone, Save, UserPlus, UserRound } from "lucide-react";

import PageShell from "../components/PageShell";
import { Card, PageHeader } from "../components/UI";

const nav = [
  { to: "/asha/dashboard", label: "Dashboard", icon: UserRound },
  { to: "/asha/follow-ups", label: "Follow-ups", icon: FileText },
  { to: "/asha/high-risk", label: "Maternal & Chronic", icon: HeartPulse },
  { to: "/asha/my-area", label: "My Area", icon: MapPin },
  {
    to: "/asha/register-patient",
    label: "Register Patient",
    icon: UserPlus,
  },
];

export default function ASHARegisterPatient() {
  const [registered, setRegistered] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    mobile: "",
    abhaId: "",
    village: "",
    address: "",
    patientType: "",
    condition: "",
    pregnancyStage: "",
    nextCheckup: "",
  });

  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const submit = (e) => {
    e.preventDefault();
    setRegistered(true);
    console.log("Registered Patient:", form);
  };

  return (
    <PageShell role='asha' items={nav}>
      <PageHeader
        eyebrow='Patient Management'
        title='Register New Patient'
        description='Register patients from your assigned area who do not have an ArogyaSetu account.'
      />

      {registered && (
        <div className='mb-6 rounded-xl border border-[#bfe3ce] bg-[#edf7f1] p-4'>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#27966b] text-white'>
              <UserPlus size={17} />
            </div>

            <div>
              <p className='text-[13px] font-semibold text-[#1e7655]'>
                Patient Registered Successfully
              </p>

              <p className='mt-1 text-[10px] text-gray-500'>
                The patient has been added to your assigned area.
              </p>
            </div>
          </div>

          <div className='mt-3 rounded-lg bg-white p-3'>
            <p className='text-[9px] text-gray-400'>Generated Patient ID</p>

            <p className='mt-1 text-[14px] font-semibold text-[#27966b]'>PT-2026-1089</p>
          </div>
        </div>
      )}

      <Card className='max-w-5xl p-5 lg:p-6'>
        <form onSubmit={submit}>
          {/* Basic Details */}
          <Section
            icon={<UserRound size={17} />}
            title='Basic Patient Details'
            description="Enter the patient's basic information."
          />

          <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Field
              label='First Name'
              name='firstName'
              value={form.firstName}
              onChange={change}
              placeholder='Enter first name'
            />

            <Field
              label='Last Name'
              name='lastName'
              value={form.lastName}
              onChange={change}
              placeholder='Enter last name'
            />

            <Field
              label='Age'
              name='age'
              type='number'
              value={form.age}
              onChange={change}
              placeholder='Enter age'
            />

            <Select
              label='Gender'
              name='gender'
              value={form.gender}
              onChange={change}
              options={["Female", "Male", "Other"]}
            />

            <Field
              label='Mobile Number'
              name='mobile'
              value={form.mobile}
              onChange={change}
              placeholder='Enter mobile number'
              icon={<Phone size={14} />}
            />

            <Field
              label='ABHA ID'
              name='abhaId'
              value={form.abhaId}
              onChange={change}
              placeholder='Optional'
              required={false}
            />
          </div>

          {/* Location */}
          <div className='mt-8 border-t border-[#edf2ee] pt-6'>
            <Section
              icon={<MapPin size={17} />}
              title='Patient Location'
              description='Select the village where the patient lives.'
            />

            <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Select
                label='Village / Area'
                name='village'
                value={form.village}
                onChange={change}
                options={["Pimpri Rural", "Dapodi", "Bhosari Rural", "Akurdi Rural"]}
              />

              <Field
                label='Address / Landmark'
                name='address'
                value={form.address}
                onChange={change}
                placeholder='Enter address or landmark'
                required={false}
              />
            </div>
          </div>

          {/* Healthcare Information */}
          <div className='mt-8 border-t border-[#edf2ee] pt-6'>
            <Section
              icon={<HeartPulse size={17} />}
              title='Healthcare Information'
              description='Select the type of care the patient needs.'
            />

            <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Select
                label='Patient Category'
                name='patientType'
                value={form.patientType}
                onChange={change}
                options={["General", "Maternal", "Chronic", "Maternal & Chronic"]}
              />

              <Field
                label='Condition / Health Concern'
                name='condition'
                value={form.condition}
                onChange={change}
                placeholder='e.g. Diabetes, Hypertension'
                required={false}
              />

              {(form.patientType === "Maternal" || form.patientType === "Maternal & Chronic") && (
                <Field
                  label='Pregnancy Stage'
                  name='pregnancyStage'
                  value={form.pregnancyStage}
                  onChange={change}
                  placeholder='e.g. 28 Weeks'
                  required={false}
                />
              )}

              <Field
                label='Next Check-up'
                name='nextCheckup'
                type='date'
                value={form.nextCheckup}
                onChange={change}
                required={false}
              />
            </div>
          </div>

          {/* Information */}
          <div className='mt-7 flex gap-3 rounded-xl bg-[#f5faf6] p-4'>
            <FileText size={17} className='mt-0.5 shrink-0 text-[#27966b]' />

            <p className='text-[10px] leading-5 text-gray-500'>
              If the patient already has an ABHA ID, enter it above so their existing health records
              can be linked through the appropriate healthcare system and consent process.
            </p>
          </div>

          {/* Buttons */}
          <div className='mt-7 flex flex-wrap justify-end gap-3'>
            <button
              type='button'
              onClick={() => window.history.back()}
              className='rounded-lg border border-[#d9e7df] px-5 py-2.5 text-[11px] font-medium text-gray-500 hover:bg-[#f5faf6]'
            >
              Cancel
            </button>

            <button
              type='submit'
              className='flex items-center gap-2 rounded-lg bg-[#27966b] px-5 py-2.5 text-[11px] font-medium text-white hover:bg-[#21835c]'
            >
              <Save size={14} />
              Register Patient
            </button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}

/* ================= SECTION ================= */

function Section({ icon, title, description }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4ed] text-[#27966b]'>
        {icon}
      </div>

      <div>
        <h3 className='text-[15px] font-semibold'>{title}</h3>

        <p className='mt-0.5 text-[10px] text-gray-400'>{description}</p>
      </div>
    </div>
  );
}

/* ================= FIELD ================= */

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  icon,
}) {
  return (
    <label className='block'>
      <span className='mb-1.5 block text-[10px] font-medium text-gray-600'>
        {label}
        {required && <span className='ml-1 text-red-400'>*</span>}
      </span>

      <div className='relative'>
        {icon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>{icon}</div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`h-10 w-full rounded-lg border border-[#dfe9e3] bg-white px-3 text-[11px] text-[#17372d] outline-none placeholder:text-gray-300 focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10 ${
            icon ? "pl-9" : ""
          }`}
        />
      </div>
    </label>
  );
}

/* ================= SELECT ================= */

function Select({ label, name, value, onChange, options }) {
  return (
    <label className='block'>
      <span className='mb-1.5 block text-[10px] font-medium text-gray-600'>{label}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className='h-10 w-full rounded-lg border border-[#dfe9e3] bg-white px-3 text-[11px] text-[#17372d] outline-none focus:border-[#27966b] focus:ring-2 focus:ring-[#27966b]/10'
      >
        <option value=''>Select {label}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
