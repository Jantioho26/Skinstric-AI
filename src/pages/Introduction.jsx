import { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Introduction() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [step, setStep] = useState('name');

 const submitInformation = async () => {
  setStep('processing');

  try {
    const response = await fetch(
      'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          location: city.trim(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    const data = await response.json();

    if (data.success !== true) {
      throw new Error(data.message || 'Submission failed');
    }

    setStep('thankYou');
  } catch (error) {
    console.error('Error submitting information:', error);
    alert('Something went wrong. Please try again.');
    setStep('city');
  }
};

    return (
      <div className="relative min-h-screen bg-white">
        <Header />
       <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
  {/* Background dotted squares */}
 <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

  <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

  <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-fast border-2 border-dotted border-gray-200"></div>
      {(step === 'name' || step === 'city') && (
  <div className="relative z-10 flex flex-col items-center gap-3">
   
  <label htmlFor="name" className="text-sm text-slate-400">
    CLICK TO TYPE
  </label>

 <input
  id={step}
  type="text"
  value={step === 'name' ? name : city}
  onChange={(e) => {
    if (step === 'name') {
      setName(e.target.value);
    } else {
      setCity(e.target.value);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const value = step === 'name' ? name : city;

      if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(value.trim())) {
        alert('Please enter a valid name or city using letters.');
        return;
      }

      if (step === 'name') {
        setStep('city');
      } else {
       submitInformation();
      }
    }
  }}
  placeholder={step === 'name' ? 'Introduce Yourself' : 'your city name'}
  autoComplete={step === 'name' ? 'name' : 'address-level2'}
  className="w-[90vw] max-w-[550px] border-b border-black bg-transparent pb-1 text-center text-4xl font-light text-gray-700 placeholder:text-gray-400 focus:outline-none md:text-5xl"
/>
</div>
      )}
       {step === 'processing' && (
  <div className="relative z-10 flex flex-col items-center gap-8">
    <p className="text-xl font-light text-slate-500">
      Processing submission
    </p>

    <div className="flex items-center gap-5">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-400"></span>
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-400 [animation-delay:200ms]"></span>
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-400 [animation-delay:400ms]"></span>
    </div>
  </div>
)}
{/* Thank You screen */}
{step === 'thankYou' && (
  <div className="relative z-10 flex flex-col items-center gap-6 text-center">
    <h2 className="text-3xl font-light text-black">
      Thank you!
    </h2>

    <p className="text-xl font-light text-slate-500">
      Proceed for the next step
    </p>
  </div>
)}
</main>
{step === 'thankYou' && (
  <button
    type="button"
    onClick={() => navigate('/upload')}
    className="absolute bottom-8 right-8 z-20 flex items-center gap-5 text-sm font-semibold cursor-pointer"
  >
    PROCEED

    <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black">
      <span className="-rotate-45 text-sm">▶</span>
    </span>
  </button>
)}
<button
  type="button"
  onClick={() => navigate('/')}
  className="absolute bottom-8 left-8 z-20 flex items-center gap-5 text-sm font-semibold cursor-pointer"
>
  <span className="flex h-10 w-10 rotate-45 items-center justify-center border border-black">
    <span className="-rotate-45 text-sm">◀</span>
  </span>

  BACK
</button>
</div>
    );
}

export default Introduction;