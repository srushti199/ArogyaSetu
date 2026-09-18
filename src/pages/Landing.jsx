import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CircleUserRound,
  HeartPulse,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  Volume2,
} from "lucide-react";
import { Link } from "react-router-dom";

import AuthModal from "../components/AuthModal";
import Logo from "../components/Logo";

function Landing() {
  const [authModal, setAuthModal] = useState(null);

  return (
    <div className='min-h-screen overflow-x-hidden bg-[#f6faf5] text-[#18372d]'>
      {/* ================= NAVBAR ================= */}
      <header className='border-b border-[#dce8df] bg-[#f8fbf7]'>
        <nav className='mx-auto flex min-h-[64px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10'>
          {/* LOGO */}
          <Logo />

          {/* NAV LINKS */}
          <div className='hidden items-center gap-7 text-[14px] font-medium text-[#587066] md:flex'>
            <a href='#how-it-works' className='transition hover:text-[#27966b]'>
              How it works
            </a>

            <a href='#features' className='transition hover:text-[#27966b]'>
              Features
            </a>

            <a href='#about' className='transition hover:text-[#27966b]'>
              About
            </a>
          </div>

          {/* CTA */}
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setAuthModal("login")}
              className='
                rounded-lg
                border border-[#cbded2]
                bg-white
                px-3 py-2
                text-[12px]
                font-semibold
                text-[#17372d]
                transition
                hover:border-[#27966b]
                hover:text-[#27966b]
                sm:px-4
                sm:text-[13px]
              '
            >
              Login
            </button>

            <button
              onClick={() => setAuthModal("register")}
              className='
                rounded-lg
                bg-[#17372d]
                px-3 py-2
                text-[12px]
                font-semibold
                text-white
                transition
                hover:bg-[#27966b]
                sm:px-4
                sm:text-[13px]
              '
            >
              Register
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section id='hero' className='relative overflow-hidden'>
          {/* Background decoration */}
          <div className='pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#dcefe5] opacity-60 blur-3xl' />

          <div
            className='
              relative
              mx-auto
              grid
              max-w-[1280px]
              items-center
              gap-10
              px-5
              pt-7
              pb-14
              sm:px-8
              sm:pt-9
              sm:pb-16
              lg:grid-cols-[1fr_0.9fr]
              lg:gap-12
              lg:px-10
              lg:pt-10
              lg:pb-20
            '
          >
            {/* ================= LEFT ================= */}
            <div className='max-w-[570px]'>
              {/* Badge */}
              <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe2d6] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-[#27966b]'>
                <ShieldCheck size={14} />
                Connected healthcare
              </div>

              {/* Heading */}
              <h1 className='font-serif text-[27px] font-semibold leading-[1.15] tracking-[-0.4px] text-[#17372d] sm:text-[31px] md:text-[34px] lg:text-[38px] xl:text-[40px]'>
                From first consultation
                <br />
                to <span className='text-[#27966b]'>completed care.</span>
              </h1>

              {/* Description */}
              <p className='mt-4 max-w-[500px] text-[14px] leading-6 text-[#64766d] sm:text-[15px]'>
                ArogyaSetu connects patients, healthcare workers, PHC doctors and hospitals to make
                referrals, consultations and follow-ups simple and accessible.
              </p>

              {/* Buttons */}
              <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                {/* Get Started */}
                <button
                  onClick={() => setAuthModal("register")}
                  className='flex items-center justify-center gap-2 rounded-lg bg-[#27966b] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1f805b]'
                >
                  Get started
                  <ArrowRight size={15} />
                </button>

                {/* See How It Works */}
                <a
                  href='#how-it-works'
                  className='flex items-center justify-center gap-2 rounded-lg border border-[#cbded2] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#315348] transition hover:border-[#27966b] hover:text-[#27966b]'
                >
                  See how it works
                </a>
              </div>

              {/* Trust Points */}
              <div className='mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[12px] text-[#687b72]'>
                <div className='flex items-center gap-1.5'>
                  <ShieldCheck size={15} className='text-[#27966b]' />
                  Secure records
                </div>

                <div className='flex items-center gap-1.5'>
                  <Volume2 size={15} className='text-[#27966b]' />
                  Voice enabled
                </div>

                <div className='flex items-center gap-1.5'>
                  <MapPin size={15} className='text-[#27966b]' />
                  Rural focused
                </div>
              </div>
            </div>

            {/* ================= RIGHT DASHBOARD ================= */}
            <div className='relative mx-auto w-full max-w-[430px]'>
              {/* Main Card */}
              <div className='rounded-2xl border border-[#dce8df] bg-white p-4 shadow-[0_15px_45px_rgba(35,75,55,0.10)] sm:p-5'>
                {/* Card Header */}
                <div className='flex items-center justify-between border-b border-[#edf2ee] pb-3'>
                  <div>
                    <p className='text-[11px] font-medium text-[#82938b]'>PATIENT CARE</p>

                    <h3 className='mt-0.5 text-[17px] font-semibold text-[#17372d]'>
                      Care journey
                    </h3>
                  </div>

                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#e7f5ed]'>
                    <CircleUserRound size={18} className='text-[#27966b]' />
                  </div>
                </div>

                {/* Journey */}
                <div className='mt-4 space-y-3'>
                  {/* Step 1 */}
                  <div className='flex items-start gap-3 rounded-xl bg-[#f5faf6] p-3'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dff2e8]'>
                      <Stethoscope size={16} className='text-[#27966b]' />
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-2'>
                        <p className='text-[13px] font-semibold text-[#29493d]'>PHC Consultation</p>

                        <span className='text-[10px] font-semibold text-[#27966b]'>COMPLETED</span>
                      </div>

                      <p className='mt-1 text-[11px] leading-4 text-[#7a8982]'>
                        Initial assessment and digital triage completed.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className='ml-4 h-3 border-l border-dashed border-[#b9d5c5]' />

                  {/* Step 2 */}
                  <div className='flex items-start gap-3 rounded-xl border border-[#dcebe1] bg-white p-3'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f4ed]'>
                      <UserRoundCheck size={16} className='text-[#27966b]' />
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-2'>
                        <p className='text-[13px] font-semibold text-[#29493d]'>
                          Specialist Referral
                        </p>

                        <span className='rounded-full bg-[#fff5d9] px-2 py-0.5 text-[9px] font-semibold text-[#aa7b1d]'>
                          IN PROGRESS
                        </span>
                      </div>

                      <p className='mt-1 text-[11px] leading-4 text-[#7a8982]'>
                        Referral sent to the district hospital.
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className='ml-4 h-3 border-l border-dashed border-[#b9d5c5]' />

                  {/* Step 3 */}
                  <div className='flex items-start gap-3 rounded-xl bg-[#f8faf8] p-3'>
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#edf2ef]'>
                      <CalendarDays size={16} className='text-[#71837a]' />
                    </div>

                    <div className='min-w-0 flex-1'>
                      <p className='text-[13px] font-semibold text-[#29493d]'>
                        Specialist Appointment
                      </p>

                      <p className='mt-1 text-[11px] leading-4 text-[#7a8982]'>
                        Appointment and follow-up will be coordinated.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className='mt-4 grid grid-cols-2 gap-2'>
                  <div className='rounded-lg bg-[#f6faf7] p-2.5'>
                    <p className='text-[10px] text-[#84938c]'>PRIORITY</p>

                    <p className='mt-0.5 text-[12px] font-semibold text-[#27966b]'>Normal</p>
                  </div>

                  <div className='rounded-lg bg-[#f6faf7] p-2.5'>
                    <p className='text-[10px] text-[#84938c]'>STATUS</p>

                    <p className='mt-0.5 text-[12px] font-semibold text-[#29493d]'>Tracking</p>
                  </div>
                </div>
              </div>

              {/* ================= FLOATING VOICE CARD ================= */}
              <div className='absolute -bottom-4 -left-4 hidden w-[175px] rounded-xl border border-[#dce8df] bg-white p-3 shadow-lg sm:block'>
                <div className='flex items-center gap-2'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#e5f5ec]'>
                    <PhoneCall size={14} className='text-[#27966b]' />
                  </div>

                  <div>
                    <p className='text-[10px] text-[#87958e]'>VOICE ASSISTANCE</p>

                    <p className='text-[11px] font-semibold text-[#29493d]'>
                      Follow-up call scheduled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id='how-it-works' className='border-t border-[#e1ebe4] bg-white'>
          <div className='mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16'>
            <div className='max-w-[520px]'>
              <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-[#27966b]'>
                How it works
              </p>

              <h2 className='mt-2 font-serif text-[26px] font-semibold leading-tight tracking-[-0.3px] text-[#17372d] sm:text-[30px]'>
                One care journey,
                <br />
                connected end to end.
              </h2>

              <p className='mt-3 text-[13px] leading-5 text-[#718078] sm:text-[14px]'>
                A simple flow connecting PHCs, hospitals, patients and frontline healthcare workers.
              </p>
            </div>

            {/* Steps */}
            <div className='mt-8 grid gap-4 md:grid-cols-3'>
              <Step
                n='01'
                icon={UserRoundCheck}
                title='PHC assesses'
                text='Doctor checks the patient, performs digital triage and creates a referral when specialist care is needed.'
              />

              <Step
                n='02'
                icon={ShieldCheck}
                title='Hospital coordinates'
                text="Hospital receives the referral, reviews details and schedules the patient's appointment."
              />

              <Step
                n='03'
                icon={PhoneCall}
                title='Patient gets support'
                text='Voice and SMS reminders keep patients informed while ASHA workers support follow-up care.'
              />
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id='features' className='border-t border-[#e1ebe4] bg-white'>
          <div className='mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16'>
            <div className='max-w-[520px]'>
              <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-[#27966b]'>
                Built for accessible care
              </p>

              <h2 className='mt-2 font-serif text-[26px] font-semibold leading-tight tracking-[-0.3px] text-[#17372d] sm:text-[30px]'>
                Healthcare that follows
                <br />
                the patient.
              </h2>

              <p className='mt-3 text-[13px] leading-5 text-[#718078] sm:text-[14px]'>
                ArogyaSetu keeps patients connected with the right healthcare support even when
                distance, connectivity or language becomes a barrier.
              </p>
            </div>

            {/* ONLY 4 FEATURES */}
            <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Feature 1 */}
              <FeatureCard
                icon={PhoneCall}
                title='Voice Access'
                text='Patients can access healthcare support through voice without needing to read or type.'
              />

              {/* Feature 2 */}
              <FeatureCard
                icon={MapPin}
                title='Referral Tracking'
                text="Referrals are tracked from the PHC to the hospital until the patient's care is completed."
              />

              {/* Feature 3 */}
              <FeatureCard
                icon={UserRoundCheck}
                title='Follow-up Care'
                text='ASHA workers receive alerts when patients need appointment or follow-up support.'
              />

              {/* Feature 4 */}
              <FeatureCard
                icon={HeartPulse}
                title='Connected Care'
                text='Patients, doctors, hospitals and frontline workers stay connected throughout care.'
              />
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id='about' className='bg-[#f6faf5]'>
          <div className='mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16'>
            <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
              {/* Left */}
              <div>
                <p className='text-[11px] font-semibold uppercase tracking-[1.5px] text-[#27966b]'>
                  A simpler healthcare journey
                </p>

                <h2 className='mt-2 font-serif text-[26px] font-semibold leading-tight text-[#17372d] sm:text-[30px]'>
                  From referral to
                  <br />
                  completed care.
                </h2>

                <p className='mt-3 max-w-[500px] text-[13px] leading-5 text-[#718078] sm:text-[14px]'>
                  ArogyaSetu helps reduce the gaps between rural patients, primary healthcare
                  centres and hospitals by keeping every important step connected.
                </p>

                {/* Explore Facilities */}
                <Link
                  to='/patient/facilities'
                  className='
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-[#27966b]
                    px-5
                    py-2.5
                    text-[13px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#1f805b]
                  '
                >
                  Explore facilities
                  <MapPin size={15} />
                </Link>
              </div>

              {/* Right Cards */}
              <div className='grid grid-cols-2 gap-3'>
                <AboutCard
                  number='01'
                  title='Digital referral'
                  text='Doctor creates and tracks the referral digitally.'
                />

                <AboutCard
                  number='02'
                  title='Hospital coordination'
                  text='Patient receives appointment and care information.'
                />

                <AboutCard
                  number='03'
                  title='Follow-up'
                  text='Follow-up support is triggered when care is pending.'
                />

                <AboutCard
                  number='04'
                  title='Completed care'
                  text='Care journey remains visible until completion.'
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className='bg-[#17372d] text-white'>
        <div className='mx-auto max-w-[1280px] px-5 py-10 sm:px-8 lg:px-10'>
          <div className='grid gap-8 md:grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr]'>
            {/* Brand */}
            <div>
              <Logo light />

              <p className='mt-4 max-w-[300px] text-[13px] leading-6 text-white/75 sm:text-[15px]'>
                A smart referral and teleconsultation
                <br className='hidden sm:block' />
                network for primary health centres.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className='text-[15px] font-semibold text-white'>Product</h3>

              <div className='mt-5 space-y-3'>
                <a
                  href='#features'
                  className='block text-[13px] text-white/70 transition hover:text-white sm:text-[14px]'
                >
                  Solution
                </a>

                <a
                  href='#how-it-works'
                  className='block text-[13px] text-white/70 transition hover:text-white sm:text-[14px]'
                >
                  How it works
                </a>
              </div>
            </div>

            {/* For whom */}
            <div>
              <h3 className='text-[15px] font-semibold text-white'>For whom</h3>

              <div className='mt-5 space-y-3'>
                <p className='text-[13px] text-white/70 sm:text-[14px]'>Patients</p>

                <p className='text-[13px] text-white/70 sm:text-[14px]'>PHC & ASHA</p>

                <p className='text-[13px] text-white/70 sm:text-[14px]'>Hospitals</p>
              </div>
            </div>

            {/* Team */}
            <div>
              <h3 className='text-[15px] font-semibold text-white'>Team</h3>

              <div className='mt-5'>
                <p className='text-[13px] text-white/70 sm:text-[14px]'>Visionary Vectors</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='my-8 border-t border-white/20 sm:my-10' />

          {/* Bottom */}
          <div className='text-[11px] text-white/65 sm:text-[13px]'>
            <p>© 2026 ArogyaSetu · Built by Team Visionary Vectors</p>
          </div>
        </div>
      </footer>

      {/* ================= AUTH MODAL ================= */}
      {authModal && (
        <AuthModal
          type={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={() => setAuthModal(authModal === "login" ? "register" : "login")}
        />
      )}
    </div>
  );
}

/* ================= STEP COMPONENT ================= */

function Step({ n, icon: Icon, title, text }) {
  return (
    <div className='rounded-xl border border-[#dce8df] bg-[#f8fbf8] p-4 sm:rounded-2xl sm:p-5'>
      <div className='flex items-center justify-between'>
        <span className='text-[11px] font-semibold text-[#27966b]'>{n}</span>

        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#e2f3e9] sm:h-9 sm:w-9'>
          <Icon size={17} className='text-[#27966b]' />
        </div>
      </div>

      <h3 className='mt-4 text-[13px] font-semibold text-[#29493d] sm:mt-5 sm:text-[14px]'>
        {title}
      </h3>

      <p className='mt-1.5 text-[11px] leading-5 text-[#75857d] sm:mt-2 sm:text-[12px] sm:leading-6'>
        {text}
      </p>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className='rounded-xl border border-[#dfeae3] bg-[#f8fbf8] p-4'>
      <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#e2f3e9]'>
        <Icon size={18} className='text-[#27966b]' />
      </div>

      <h3 className='mt-4 text-[14px] font-semibold text-[#29493d]'>{title}</h3>

      <p className='mt-1.5 text-[11px] leading-5 text-[#75857d]'>{text}</p>
    </div>
  );
}

/* ================= ABOUT CARD ================= */

function AboutCard({ number, title, text }) {
  return (
    <div className='rounded-xl border border-[#dce8df] bg-white p-4'>
      <p className='text-[23px] font-semibold text-[#27966b]'>{number}</p>

      <p className='mt-1 text-[12px] font-semibold text-[#29493d]'>{title}</p>

      <p className='mt-1 text-[10px] leading-4 text-[#7b8b83]'>{text}</p>
    </div>
  );
}

export default Landing;
