import { Routes, Route, useNavigate } from 'react-router-dom'
import Introduction from './pages/Introduction';
import { useState } from 'react';
import Header from './components/Header';


function Home() {
 const navigate = useNavigate();
 const [hoveredButton, setHoveredButton] = useState(null);
  return ( 
    <div className="min-h-screen bg-white text-black">
      <Header />
    <main className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden max-lg:pb-40">

  {/* Diamond shape */}
{/* Left diamond */}
<div className={`pointer-events-none absolute hidden lg:block left-0 top-1/2 h-[750px] w-[750px] -translate-x-[85%] -translate-y-1/2 rotate-45 border border-dotted border-gray-300 transition-opacity duration-500 ${
  hoveredButton === 'test' ? 'opacity-0' : 'opacity-100'
}`}></div>

{/* Right diamond */}
<div className={`pointer-events-none absolute hidden lg:block right-0 top-1/2 h-[750px] w-[750px] translate-x-[85%] -translate-y-1/2 rotate-45 border border-dotted border-gray-300 transition-opacity duration-500 ${
  hoveredButton === 'discover' ? 'opacity-0' : 'opacity-100'
}`}
></div>
<div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden lg:hidden">
  {/* Outer diamond */}
  <div className="absolute h-[48vw] w-[48vw] max-h-[480px] max-w-[480px] rotate-45 border border-dotted border-gray-300"></div>

  {/* Inner diamond */}
  <div className="absolute h-[42vw] w-[42vw] max-h-[420px] max-w-[420px] rotate-45 border border-dotted border-gray-300"></div>
</div>
 
  {/* Homepage heading */}
<h2
  className={`relative z-10 text-center text-4xl sm:text-5xl lg:text-8xl font-light leading-tight tracking-tight transition-transform duration-700 ease-in-out ${
    hoveredButton === 'test'
      ? '-translate-x-80'
      : hoveredButton === 'discover'
      ? 'translate-x-80'
      : 'translate-x-0'
  }`}
>
  Sophisticated<br />
  skincare
</h2>
<button
  type="button"
  onMouseEnter={() => setHoveredButton('discover')}
  onMouseLeave={() => setHoveredButton(null)}
  className={`absolute left-8 top-1/2 z-20 hidden lg:flex -translate-y-1/2 items-center gap-4 text-xs font-medium tracking-wide transition-opacity duration-500 md:left-16 ${
  hoveredButton === 'test' ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'
}`}
>
  <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">◀</span>
  </span>

  DISCOVER A.I.
</button>
<button
  type="button"
  onMouseEnter={() => setHoveredButton('test')}
  onMouseLeave={() => setHoveredButton(null)}  
  onClick={() => navigate('/introduction')}
  className={`absolute right-8 top-1/2 z-20 hidden lg:flex -translate-y-1/2 items-center gap-4 text-xs font-medium tracking-wide transition-opacity duration-500 md:right-16 cursor-pointer ${
  hoveredButton === 'discover'
    ? 'opacity-0 pointer-events-none'
    : 'opacity-100'
}`}
>
  TAKE TEST

  <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">▶</span>
  </span>
</button>
{/* Homepage description */}
<p className="absolute bottom-[35%] left-1/2 z-10 w-[90%] max-w-[420px] -translate-x-1/2 text-center text-xs font-light text-grey-500 lg:font-normal lg:text-black leading-5 lg:bottom-6 lg:left-10 lg:w-auto lg:max-w-[320px] lg:translate-x-0 lg:text-left">
  SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
  <br />
  HIGHLY-PERSONALIZED ROUTINE TAILORED TO
  <br />
  WHAT YOUR SKIN NEEDS.
</p>
<button
  type="button"
  onClick={() => navigate('/introduction')}
  className="absolute bottom-[25%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 text-sm font-semibold tracking-wide lg:hidden cursor-pointer"
>
  ENTER EXPERIENCE

  <span className="flex h-8 w-8 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">▶</span>
  </span>
</button>

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