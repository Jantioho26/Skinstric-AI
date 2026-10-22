import { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Introduction() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [step, setStep] = useState('name');

  const submitInformation = async () => {
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
    console.log('API response:', data);
  } catch (error) {
    console.error('Error submitting information:', error);
  }
};

    return (
      <div className="relative min-g-screen bg-white">
        <Header />
       <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden">
  {/* Background dotted squares */}
 <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

  <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

  <div className="pointer-events-none absolute h-[450px] w-[450px] rotate-square-fast border-2 border-dotted border-gray-200"></div>
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
</main>
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