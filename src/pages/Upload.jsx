import Header from "../components/Header";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Aperture, Image as ImageIcon } from "lucide-react";

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];

      console.log("Image converted to Base64!");
      console.log("Base64 length:", base64Image.length);

      submitImage(base64Image);
    };

    reader.onerror = () => {
      alert("There was a problem reading your image.");
    };

    reader.readAsDataURL(file);
  };
  const submitImage = async (base64Image) => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Image analysis failed");
      }

      const data = await response.json();

      console.log("Phase 2 API response:", data);
      if (!data.success || !data.data) {
        throw new Error("Invalid analysis response");
      }

      sessionStorage.setItem("skinstricResults", JSON.stringify(data.data));

      navigate("/results");
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("There was a problem analyzing your image.");
    }
  };
  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[75vh] flex-col items-center justify-center gap-12">
        <h1 className="self-start ml-8 text-xs font-semibold tracking-wide">
          TO START ANALYSIS
        </h1>

        <div className="flex w-full flex-col items-center justify-evenly gap-16 lg:flex-row">
          <div className="relative flex h-[350px] w-[350px] items-center justify-center">
            {/* Rotating dotted squares */}
            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-fast border-2 border-dotted border-gray-200"></div>

            {/* Keep your existing TAKE A SELFIE button here */}
        {/* Camera connecting line and label */}
<div className="absolute left-[65%] top-[22%] flex items-start">
  <div className="h-[1px] w-[100px] origin-left -rotate-45 bg-gray-500"></div>

<p className="absolute -top-24 left-20 w-[200px] text-left text-sm font-light leading-6">
  ALLOW A.I.
  <br />
  TO SCAN YOUR FACE
</p>
</div>
            <button
              type="button"
              className="flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-black">
                  <Aperture size={85} strokeWidth={1.5} />
                </div>
              </div>
              <span className="text-sm font-semibold">TAKE A SELFIE</span>
            </button>
          </div>
          <div className="relative flex h-[350px] w-[350px] items-center justify-center">
            {/* Rotating dotted squares */}
            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

            <div className="pointer-events-none absolute h-[280px] w-[280px] rotate-square-fast border-2 border-dotted border-gray-200">
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-black">
                  <ImageIcon size={85} strokeWidth={1.5} />
                </div>
                {/* Gallery connecting line and label */}
<div className="pointer-events-none absolute left-[25%] top-[75%]">
  <div className="h-[1px] w-[100px] origin-right rotate-[-45deg] bg-gray-500"></div>

  <p className="absolute top-20 -left-44 w-[200px] text-right text-sm font-light leading-6">
    ALLOW A.I.
    <br />
    ACCESS GALLERY
  </p>
</div>
              </div>
              <span className="text-sm font-semibold">UPLOAD AN IMAGE</span>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </main>
    </div>
  );
}

export default Upload;
