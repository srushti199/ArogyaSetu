import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const destinations = { patient: "/patient/dashboard", doctor: "/phc/dashboard", hospital: "/hospital/dashboard", asha: "/asha/dashboard" };

export default function AuthModal({ type, onClose, onSwitch }) {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!role) return;
    if (isLogin) { onClose(); navigate(destinations[role]); }
    else { onSwitch(); }
  };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-[#17372d]/45 px-4 backdrop-blur-sm" onMouseDown={onClose}>
    <div className="relative w-full max-w-[410px] rounded-2xl bg-white p-6 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-[#718078] hover:bg-[#eef5f0]"><X size={18}/></button>
      <div className="flex flex-col items-center"><Logo/><h2 className="mt-5 font-serif text-2xl font-bold">{isLogin ? "Welcome back" : "Create your account"}</h2><p className="mt-1 text-center text-sm text-[#718078]">{isLogin ? "Sign in to continue to ArogyaSetu" : "Join ArogyaSetu for connected healthcare"}</p></div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {!isLogin && <div className="grid grid-cols-2 gap-3"><Field label="First name" placeholder="First name"/><Field label="Last name" placeholder="Last name"/></div>}
        <Field label="Email address" type="email" placeholder="you@example.com" required />
        <div><label className="mb-1.5 block text-xs font-semibold">Password</label><div className="relative"><input required type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full rounded-xl border border-[#dce8df] px-3 py-2.5 pr-10 text-sm focus:border-[#27966b]"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#718078]">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></div>
        <div><label className="mb-1.5 block text-xs font-semibold">Role</label><select required value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-xl border border-[#dce8df] bg-white px-3 py-2.5 text-sm focus:border-[#27966b]"><option value="">Select your role</option><option value="patient">Patient</option><option value="doctor">PHC Doctor</option><option value="hospital">District Hospital</option><option value="asha">ASHA Worker</option></select></div>
        {isLogin && <div className="text-right"><button type="button" className="text-xs font-semibold text-[#27966b]">Forgot password?</button></div>}
        <button className="w-full rounded-xl bg-[#17372d] py-2.5 text-sm font-semibold text-white hover:bg-[#27966b]">{isLogin ? "Login" : "Create account"}</button>
      </form>
      <p className="mt-5 text-center text-xs text-[#718078]">{isLogin ? "Don't have an account?" : "Already have an account?"}<button onClick={onSwitch} className="ml-1 font-semibold text-[#27966b]">{isLogin ? "Register" : "Login"}</button></p>
    </div>
  </div>;
}
function Field({ label, ...props }) { return <div><label className="mb-1.5 block text-xs font-semibold">{label}</label><input {...props} className="w-full rounded-xl border border-[#dce8df] px-3 py-2.5 text-sm focus:border-[#27966b]"/></div>; }
