import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedItem, setSelectedItem] = useState(null);
  const [correctedAttributes, setCorrectedAttributes] = useState({});
  const handleReset = () => {
    setCorrectedAttributes({});
    setSelectedItem(null);
    setSelectedCategory("race");
  };
  const savedResults = sessionStorage.getItem("skinstricResults");
  const results = savedResults ? JSON.parse(savedResults) : null;

  console.log("Saved analysis results:", results);
  const getTopPrediction = (category) => {
    if (!category) return null;

    const entries = Object.entries(category);

    entries.sort((a, b) => b[1] - a[1]);

    return entries[0];
  };

  const predictedRace = getTopPrediction(results?.race);
  const predictedAge = getTopPrediction(results?.age);
  const predictedGender = getTopPrediction(results?.gender);
  const selectedPrediction =
    selectedItem ??
    (correctedAttributes[selectedCategory]
      ? [
          correctedAttributes[selectedCategory],
          results?.[selectedCategory]?.[correctedAttributes[selectedCategory]],
        ]
      : getTopPrediction(results?.[selectedCategory]));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="min-h-[75vh] px-8 pt-12 pb-12">
        <div className="mb-16">
          <p className="text-sm font-semibold uppercase">A.I. ANALYSIS</p>

         <h1 className="text-3xl font-light uppercase sm:text-5xl lg:text-7xl">
            DEMOGRAPHICS
          </h1>

          <p className="mt-2 text-sm uppercase">PREDICTED RACE & AGE</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[190px_minmax(0,1fr)_350px]">
          <div className="flex w-full flex-row gap-3 lg:max-w-[190px] lg:flex-col">
            <div
              onClick={() => {
                setSelectedCategory("race");
                setSelectedItem(null);
              }}
             className={`flex-[1_1_0%] min-w-0 cursor-pointer border-t border-black p-3 lg:flex-none lg:p-4 ${
                selectedCategory === "race"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <p className="text-lg font-semibold capitalize">
                {correctedAttributes.race ?? predictedRace?.[0]}
              </p>
              <p className="font-semibold">RACE</p>
            </div>

            <div
              onClick={() => {
                setSelectedCategory("age");
                setSelectedItem(null);
              }}
              className={`flex-[1_1_0%] min-w-0 cursor-pointer border-t border-black p-3 lg:flex-none lg:p-4 ${
                selectedCategory === "age"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <p className="text-lg font-semibold">
                {correctedAttributes.age ?? predictedAge?.[0]}
              </p>
              <p className="font-semibold">AGE</p>
            </div>

            <div
              onClick={() => {
                setSelectedCategory("gender");
                setSelectedItem(null);
              }}
             className={`flex-[1_1_0%] min-w-0 cursor-pointer border-t border-black p-3 lg:flex-none lg:p-4 ${
                selectedCategory === "gender"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <p className="text-lg font-semibold capitalize">
                {correctedAttributes.gender ?? predictedGender?.[0]}
              </p>
              <p className="font-semibold">SEX</p>
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-center gap-6 border-t border-black bg-gray-100 p-6">
            <h2 className="w-full text-left text-3xl font-light capitalize">
              {selectedPrediction?.[0]}
            </h2>
<div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center rounded-full bg-gray-100 lg:h-[400px] lg:w-[400px]">
              <div
              className="flex h-[260px] w-[260px] items-center justify-center rounded-full lg:h-[350px] lg:w-[350px]"
                style={{
                  background: `conic-gradient(
    #1a1a1a ${(selectedPrediction?.[1] ?? 0) * 100}%,
    #d1d5db 0
  )`,
                }}
              >
                <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gray-100 lg:h-[340px] lg:w-[340px]">
                  <span className="text-5xl font-light">
                   {((selectedPrediction?.[1] ?? 0) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {results && (
            <div className="flex w-full max-w-[450px] flex-col border-t border-black bg-gray-100 p-6">
              <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                <span className="text-sm font-semibold">
                  {selectedCategory === "gender"
                    ? "SEX"
                    : selectedCategory.toUpperCase()}
                </span>
                <span className="text-sm font-semibold">A.I. CONFIDENCE</span>
              </div>
              {results?.[selectedCategory] &&
                Object.entries(results[selectedCategory])
                  .sort((a, b) => b[1] - a[1])
                  .map(([race, confidence]) => (
                    <div
                      key={race}
                      onClick={() => {
                        setSelectedItem([race, confidence]);

                        setCorrectedAttributes((previous) => ({
                          ...previous,
                          [selectedCategory]: race,
                        }));
                      }}
                      className={`flex cursor-pointer items-center justify-between border-b border-gray-200 px-3 py-4 ${
                        selectedPrediction?.[0] === race
                          ? "bg-black text-white"
                          : "bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-sm font-medium capitalize">
                        {race}
                      </span>

                      <span className="text-sm">
                       {(confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
            </div>
          )}
        </div>
       <div className="relative mt-8 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* BACK */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-sm font-semibold"
          >
            <span className="flex h-9 w-9 rotate-45 items-center justify-center border border-black">
              <span className="-rotate-45">◀</span>
            </span>
            BACK
          </button>

          {/* CENTER MESSAGE */}
          <p className="text-center text-sm text-gray-400 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:whitespace-nowrap">
            If A.I. estimate is wrong, select the correct one.
          </p>

          {/* RIGHT BUTTONS */}
        <div className="flex gap-3 lg:ml-auto">
            <button
              type="button"
              onClick={handleReset}
              className="border border-black bg-white px-8 py-3 text-sm font-semibold uppercase hover:bg-gray-100"
            >
              RESET
            </button>

            <button
              type="button"
              className="bg-black px-8 py-3 text-sm font-semibold uppercase text-white hover:bg-gray-800"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Results;
