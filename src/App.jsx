import { Routes, Route, useNavigate } from 'react-router-dom'
import Introduction from './pages/Introduction';


function Home() {
 const navigate = useNavigate();
  return ( 
    <div className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold tracking-tight">
            SKINSTRIC
          </h1>
          <span className="text-xs text-grey-500">
            [ INTRO ]
          </span>
        </div>
        <button className="bg-black px-4 py-2 text-xs font-semibold text-white">
          ENTER CODE
        </button>
      </header>
     <main className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden">

  {/* Diamond shape */}
{/* Left diamond */}
<div className="pointer-events-none absolute left-0 top-1/2 h-[750px] w-[750px] -translate-x-[85%] -translate-y-1/2 rotate-45 border border-dotted border-gray-400"></div>

{/* Right diamond */}
<div className="pointer-events-none absolute right-0 top-1/2 h-[750px] w-[750px] translate-x-[85%] -translate-y-1/2 rotate-45 border border-dotted border-gray-400"></div>
  {/* Homepage heading */}
  <h2 className="relative z-10 text-center text-6xl font-light leading-tight tracking-tight md:text-8xl">
    Sophisticated
    <br />
    skincare
  </h2>
<button
  type="button"
  onClick={() => navigate('/introduction')}
  className="absolute left-8 top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 text-xs font-medium tracking-wide md:left-16 cursor-pointer"
>
  <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">◀</span>
  </span>

  DISCOVER A.I.
</button>
<button
  type="button"
  className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 text-xs font-medium tracking-wide md:right-16"
>
  TAKE TEST

  <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">▶</span>
  </span>
</button>
{/* Homepage description */}
<p className="absolute bottom-4 left-8 z-10 max-w-[320px] text-xs font-normal leading-5 md:bottom-10 md:left-10">
  SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
  <br />
  HIGHLY-PERSONALIZED ROUTINE TAILORED TO
  <br />
  WHAT YOUR SKIN NEEDS.
</p>

</main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/introduction" element={<Introduction />} />
    </Routes>
  );
}

export default App;