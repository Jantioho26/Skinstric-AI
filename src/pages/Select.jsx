import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Select() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />


      <main className="relative min-h-[calc(100vh-100px)] px-8 pt-8 pb-20">
        <h1 className="text-xl font-semibold">
          A.I. ANALYSIS
        </h1>

        <p className="mt-4">
          A.I. HAS ESTIMATED THE FOLLOWING.
        </p>

        <p>FIX ESTIMATED INFORMATION IF NEEDED.</p>
       <div className="group relative mt-20 flex justify-center">
        
  <div className="peer relative z-10 grid h-[300px] w-[300px] rotate-45 grid-cols-2 grid-rows-2 gap-2 sm:h-[300px] sm:w-[300px] lg:h-[380px] lg:w-[380px]">

   <button
  type="button"
  onClick={() => navigate("/results")}
  className="flex cursor-pointer items-center justify-center bg-gray-200 transition-colors duration-200 hover:bg-gray-400"
>
  <span className="-rotate-45 text-center text-s font-semibold">
    DEMOGRAPHICS
  </span>
</button>

    <div className="flex cursor-not-allowed items-center justify-center bg-gray-100 transition-colors duration-200 hover:bg-gray-400">
      <span className="-rotate-45 text-center text-s font-semibold">
        SKIN TYPE DETAILS
      </span>
    </div>

   <div className="flex cursor-not-allowed items-center justify-center bg-gray-100 transition-colors duration-200 hover:bg-gray-400">
      <span className="-rotate-45 text-center text-m font-semibold">
        COSMETIC CONCERNS
      </span>
    </div>

   <div className="flex cursor-not-allowed items-center justify-center bg-gray-100 transition-colors duration-200 hover:bg-gray-400">
      <span className="-rotate-45 text-center text-xs font-semibold">
        WEATHER
      </span>
    </div>
    </div>
   <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] sm:h-[370px] sm:w-[370px] lg:h-[460px] lg:w-[460px] -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-dotted border-gray-300 opacity-0 transition-opacity duration-300 peer-hover:opacity-100"></div>
</div>
    <button
  type="button"
  onClick={() => navigate("/upload")}
  className="fixed bottom-8 left-8 flex items-center gap-4 cursor-pointer"
>
  <div className="flex h-10 w-10 rotate-45 items-center justify-center border border-black">
    <ChevronLeft
      size={20}
      className="-rotate-45"
    />
  </div>

  <span className="text-sm font-semibold">
    BACK
  </span>
</button>
<button
  type="button"
  onClick={() => navigate("/results")}
  className="fixed bottom-8 right-8 flex items-center gap-4 cursor-pointer"
>
  <span className="text-sm font-semibold">
    GET SUMMARY
  </span>

  <div className="flex h-10 w-10 rotate-45 items-center justify-center border border-black">
    <ChevronRight
      size={20}
      className="-rotate-45"
    />
  </div>
</button>
     </main>
    </div>
  );
}

export default Select;