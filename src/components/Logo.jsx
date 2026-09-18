import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ light = false }) {
  return (
    <Link to='/' className='flex items-center gap-2 w-fit' aria-label='ArogyaSetu home'>
      <span
        className={`grid h-7 w-7 place-items-center rounded-lg ${
          light ? "bg-white text-[#27966b]" : "bg-[#27966b] text-white"
        }`}
      >
        <HeartPulse size={18} strokeWidth={2.3} />
      </span>

      <span
        className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-[#17372d]"}`}
      >
        Arogya
        <span className={light ? "text-[#b9f0d4]" : "text-[#27966b]"}>Setu</span>
      </span>
    </Link>
  );
}
