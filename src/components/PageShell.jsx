import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const roleConfig = {
  phc: { title: "PHC Portal", user: "Dr. Anjali Patil", subtitle: "Kheda PHC" },
  hospital: { title: "District Hospital", user: "Hospital Desk", subtitle: "KYC District Hospital" },
  patient: { title: "Patient Portal", user: "Sita Devi", subtitle: "ABHA •••• 7890" },
  asha: { title: "ASHA Worker", user: "Meena Patil", subtitle: "Kheda Village" },
};

export default function PageShell({ role, items, children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const config = roleConfig[role];

  const logout = () => navigate("/");

  return (
    <div className="min-h-screen bg-[#f5faf6] text-[#17372d]">
      {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-[#17372d] px-4 py-5 text-white transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="mb-7 flex items-center justify-between px-1">
          <Logo light />
          <button className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <div className="mb-5 rounded-xl bg-white/10 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9ed9bd]">{config.title}</p>
          <p className="mt-1 text-sm font-semibold">{config.user}</p>
          <p className="mt-0.5 text-xs text-white/60">{config.subtitle}</p>
        </div>
        <nav className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[#27966b] text-white shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"><LogOut size={18} /> Logout</button>
      </aside>
      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dce8df] bg-white/90 px-4 backdrop-blur sm:px-6">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-[#eef5f0] lg:hidden"><Menu size={21} /></button>
          <div className="hidden lg:block"><p className="text-sm font-semibold">{config.title}</p><p className="text-xs text-[#718078]">Connected healthcare coordination</p></div>
          <div className="ml-auto flex items-center gap-3"><span className="hidden text-right sm:block"><span className="block text-sm font-semibold">{config.user}</span><span className="block text-xs text-[#718078]">{config.subtitle}</span></span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d9f2e5] text-sm font-bold text-[#27966b]">{config.user.charAt(0)}</span></div>
        </header>
        <main className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
