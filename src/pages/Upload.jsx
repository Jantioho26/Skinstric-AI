import Header from "../components/Header";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aperture, Image as ImageIcon } from "lucide-react";

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

     streamRef.current = stream;
setCameraOpen(true);

if (videoRef.current) {
  videoRef.current.srcObject = stream;
  await videoRef.current.play();
}

      console.log("Camera access granted!");
    } catch (error) {
      console.error("Camera error:", error);
      alert("Unable to access camera. Please check your permissions.");
    }
  };

  const captureSelfie = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      alert("Camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    console.log("Selfie captured!");

    setCapturedImage(canvas.toDataURL("image/jpeg"));

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

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

      navigate("/select");
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("There was a problem analyzing your image.");
    }
  };
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOpen]);
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);
  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[75vh] flex-col items-center justify-center gap-12">
        {cameraOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            {capturedImage ? (
              <>
                <img
                  src={capturedImage}
                  alt="Captured selfie"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <p className="absolute top-12 left-1/2 z-10 -translate-x-1/2 text-sm font-light text-white">
                  GREAT SHOT!
                </p>

                <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-6">
                  <h2 className="text-2xl font-semibold text-white">Preview</h2>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={async () => {
                        setCapturedImage(null);
                        await openCamera();
                      }}
                      className="border border-white bg-white px-6 py-3 text-sm text-black"
                    >
                      RETAKE
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        submitImage(capturedImage.split(",")[1]);
                      }}
                      className="bg-black px-6 py-3 text-sm text-white"
                    >
                      USE THIS PHOTO
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={captureSelfie}
                  className="absolute right-8 top-1/2 z-10 flex -translate-y-1/2 items-center gap-4 text-white"
                >
                  <span className="text-xs font-light">TAKE PICTURE</span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/20">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                      <Aperture
                        size={24}
                        strokeWidth={1}
                        className="text-gray-500"
                      />
                    </div>
                  </div>
                </button>

                <div className="absolute bottom-8 left-1/2 z-10 w-full -translate-x-1/2 text-center text-white">
                  <p className="mb-4 text-sm font-semibold tracking-wide">
                    TO GET BETTER RESULTS MAKE SURE TO HAVE
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-light tracking-wide">
                    <span>◇ NEUTRAL EXPRESSION</span>
                    <span>◇ FRONTAL POSE</span>
                    <span>◇ ADEQUATE LIGHTING</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <h1 className="self-start ml-8 text-xs font-semibold tracking-wide">
          TO START ANALYSIS
        </h1>

        <div className="flex w-full flex-col items-center justify-evenly gap-2 lg:gap-16 lg:flex-row">
          <div className="relative flex h-[250px] w-full max-w-[300px] items-center justify-center lg:h-[350px] lg:w-[350px] lg:max-w-none">
            {/* Rotating dotted squares */}
            <div className="pointer-events-none absolute h-[160px] w-[160px] lg:h-[280px] lg:w-[280px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

            <div className="pointer-events-none absolute h-[145px] w-[145px] lg:h-[260px] lg:w-[260px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

            <div className="pointer-events-none absolute h-[130px] w-[130px] lg:h-[240px] lg:w-[240px] rotate-square-fast border-2 border-dotted border-gray-200"></div>
            {/* Keep your existing TAKE A SELFIE button here */}
            {/* Camera connecting line and label */}
            <div className="hidden lg:absolute lg:left-[65%] lg:top-[22%] lg:flex lg:items-start">
              <div className="h-[1px] w-[100px] origin-left -rotate-45 bg-gray-500"></div>

              <p className="absolute -top-24 left-20 w-[200px] text-left text-sm font-light leading-6">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </p>
            </div>
            <button
              type="button"
              onClick={openCamera}
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
          <div className="relative flex h-[250px] w-full max-w-[300px] items-center justify-center lg:h-[350px] lg:w-[350px] lg:max-w-none">
            {/* Rotating dotted squares */}
          <div className="pointer-events-none absolute h-[160px] w-[160px] lg:h-[280px] lg:w-[280px] rotate-square-slow border-2 border-dotted border-gray-300"></div>

<div className="pointer-events-none absolute h-[145px] w-[145px] lg:h-[260px] lg:w-[260px] rotate-square-medium border-2 border-dotted border-gray-200"></div>

<div className="pointer-events-none absolute h-[130px] w-[130px] lg:h-[240px] lg:w-[240px] rotate-square-fast border-2 border-dotted border-gray-200"></div>
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
                <div className="pointer-events-none hidden lg:absolute lg:left-[25%] lg:top-[75%] lg:block">
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
