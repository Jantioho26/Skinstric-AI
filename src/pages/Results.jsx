import Header from '../components/Header';

function Results() {
  const savedResults = sessionStorage.getItem('skinstricResults');

  const results = savedResults ? JSON.parse(savedResults) : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[75vh] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-light">
          Demographics
        </h1>

        <p className="text-sm text-gray-500">
          {results
            ? 'Your analysis results are ready!'
            : 'No analysis results found.'}
        </p>
      </main>
    </div>
  );
}

export default Results;