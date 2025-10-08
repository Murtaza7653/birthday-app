import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatar01 from "./images/avatar_01.webp";
import avatar02 from "./images/avatar_02.webp";
import avatar03 from "./images/avatar_03.webp";
import avatar04 from "./images/avatar_04.webp";
import avatar05 from "./images/avatar_05.webp";
import avatar06 from "./images/avatar_06.webp";
import photo01 from "./images/photos_01.webp";
import photo02 from "./images/photos_02.webp";
import photo03 from "./images/photos_03.webp";
import photo04 from "./images/photos_04.webp";
import photo05 from "./images/photos_05.webp";
import photo06 from "./images/photos_06.webp";
import photo07 from "./images/photos_07.webp";
import photo08 from "./images/photos_08.webp";

export default function BirthdayGameApp() {
  const STAGES = {
    START: 0,
    GREETING: 1,
    POLAROID: 2,
    AVATAR: 3,
    NOTES: 4,
    SCRATCH: 5,
    FINAL: 6,
  };

  // --- Replace these with your real assets ---
  const PHOTO_URLS = [
    photo01,
    photo02,
    photo03,
    photo04,
    photo05,
    photo06,
    photo07,
    photo08,
  ];
  const PHOTO_CAPTIONS = [
    "Meri Param Sundari 😍💕",
    "You >>> Flowers 🌻🌷",
    "My pretty little baby 😘",
    "Sundar Susheel Sanskaari 🤭💕",
    "My sweet little cupcake 🧁",
    "Who's behind the sunflower? 👀",
    "It's my beautiful Aamena! 🥰",
    "My precious human 🌻❤️",
  ];
  const AVATAR_URLS = [
    avatar01,
    avatar02,
    avatar03,
    avatar04,
    avatar05,
    avatar06,
  ];
  const MUSIC_URL = ""; // optional background music
  const NOTES = [
    "You are the queen of my heart 👸🏻",
    "You make my heart happy 😊",
    "You are my sukoon 🤗",
    "Your smile lights up my world 🥰",
    "My life is better because of you 😇",
    "You are my Rasmalai 😋",
    "You are my favourite human 😘",
  ];
  // -----------------------------------------

  const [stage, setStage] = useState(STAGES.START);
  const [polaroidIndex, setPolaroidIndex] = useState(0);
  const [openedNote, setOpenedNote] = useState("");
  const [openedNoteIndex, setOpenedNoteIndex] = useState([]);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const audioRef = useRef(null);
  const scratchRef = useRef(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (MUSIC_URL && audioRef.current && stage !== STAGES.START) {
      audioRef.current.play().catch(() => {});
    }
  }, [stage]);

  function nextStage() {
    setStage((s) => Math.min(s + 1, STAGES.FINAL));
  }
  function prevStage() {
    setStage((s) => Math.max(s - 1, STAGES.START));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        {/* Floating hearts/stars */}
        <FloatingDecor />

        <AnimatePresence mode="wait">
          {stage === STAGES.START && (
            <StartScreen
              key="start"
              onStart={() => setStage(STAGES.GREETING)}
            />
          )}

          {stage === STAGES.GREETING && (
            <GreetingStage
              key="greeting"
              onNext={nextStage}
              onBack={prevStage}
            />
          )}

          {stage === STAGES.POLAROID && (
            <PolaroidStage
              key="polaroid"
              photos={PHOTO_URLS}
              captions={PHOTO_CAPTIONS}
              index={polaroidIndex}
              setIndex={setPolaroidIndex}
              onNext={nextStage}
              onBack={prevStage}
            />
          )}

          {stage === STAGES.AVATAR && (
            <AvatarStage
              key="avatar"
              images={AVATAR_URLS}
              onNext={nextStage}
              onBack={prevStage}
            />
          )}

          {stage === STAGES.NOTES && (
            <NotesStage
              key="notes"
              notes={NOTES}
              openedNote={openedNote}
              setOpenedNote={setOpenedNote}
              openedNoteIndex={openedNoteIndex}
              setOpenedNoteIndex={setOpenedNoteIndex}
              onNext={() => setStage(STAGES.SCRATCH)}
              onBack={prevStage}
            />
          )}

          {stage === STAGES.SCRATCH && (
            <ScratchStage
              key="scratch"
              onRevealed={() => {
                setScratchRevealed(true);
              }}
              scratchRevealed={scratchRevealed}
              onNext={() => setStage(STAGES.FINAL)}
            />
          )}

          {stage === STAGES.FINAL && (
            <FinalStage
              key="final"
              confetti={confetti}
              setConfetti={setConfetti}
              onRestart={() => {
                setStage(STAGES.START);
                setPolaroidIndex(0);
                setOpenedNote("");
                setOpenedNoteIndex([]);
                setScratchRevealed(false);
              }}
              onBack={prevStage}
            />
          )}
        </AnimatePresence>

        {MUSIC_URL && <audio ref={audioRef} src={MUSIC_URL} loop />}
      </div>
    </div>
  );
}

// ------------------- Individual Stage Components -------------------

function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-96 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient background with harmonized colors */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>

      {/* Title zoom in/out */}
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.6, 1], ease: "easeInOut" }}
        className="text-3xl text-center md:text-5xl font-extrabold text-purple-700 relative z-10"
      >
        Celebrating You, Today and Always! 💕💕
      </motion.h1>

      {/* Subtitle fade-in from below */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1.5, ease: "easeOut" }}
        className="mt-4 text-beige-700 text-center relative z-10"
      >
        The Queen of my Heart Turns Another Year Beautiful 🎂
      </motion.p>

      {/* Button fade-in */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1.5, ease: "easeOut" }}
        className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
      >
        Let the party begin! 🎉
      </motion.button>

      {/* Spotlight effect */}
      <div className="absolute w-96 h-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse -z-10"></div>

      {/* Gradient animation CSS */}
      <style>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
    </motion.div>
  );
}

function GreetingStage({ onNext, onBack }) {
  const lines = [
    "Happy Birthday, my sweetheart!💕💕",
    "Cheers to another year filled with love and joy 😊😊",
    "I love you sooooooo much, my Aamena!💕💕",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showText, setShowText] = useState("");

  useEffect(() => {
    if (currentLine < lines.length) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= lines[currentLine].length) {
          setShowText(lines[currentLine].slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setCurrentLine((prev) => prev + 1), 1000);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentLine]);

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      className="text-center w-100 py-4"
    >
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>
      <p className="text-2xl font-bold text-pink-700 min-h-[3rem]">
        {showText}
      </p>

      {currentLine >= lines.length && (
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="mt-3 text-beige-700 text-center relative z-10"
          >
            Get ready for a trip down memory lane... 😊💕
          </motion.p>
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
            className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
          >
            Let's go! ✨
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

function PolaroidStage({ photos, captions, index, setIndex, onNext, onBack }) {
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(photos.length - 1, i + 1));
  }

  const tilt = index % 2 === 0 ? 2 : -2;

  return (
    <motion.div
      // initial={{ y: 20 }}
      // animate={{ y: 0 }}
      // exit={{ y: -20 }}
      className={"py-4 text-center"}
    >
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.6, 1], ease: "easeInOut" }}
        className="text-3xl text-center md:text-5xl font-extrabold text-purple-700 relative z-10"
      >
        My Queen, my Aamena 💕✨
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1.5, ease: "easeOut" }}
      >
        <div className="mt-10 flex items-center gap-4 justify-center">
          {index > 0 && (
            <button onClick={prev} className="text-pink-500">
              ◀
            </button>
          )}

          <div className="w-72 h-72 relative perspective-800">
            <motion.div
              key={photos[index]}
              initial={{
                rotate: tilt,
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                rotate: [tilt, 0, tilt * -1],
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="absolute left-0 top-0 w-full h-full bg-white rounded-lg shadow-xl flex flex-col items-center justify-between p-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={photos[index]}
                alt="polaroid"
                className="w-60 h-60 object-cover rounded-md"
              />
              <div className="w-full text-center mt-2">
                <div className="font-medium">{captions[index]}</div>
              </div>
            </motion.div>
          </div>

          {index < photos.length - 1 && (
            <button onClick={next} className="text-purple-500">
              ▶
            </button>
          )}
        </div>
        {index === photos.length - 1 && (
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
          >
            What's next? 👀
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

function AvatarStage({ images, onNext, onBack }) {
  const lines = [
    "You look amazing in all these photos! 😍😍",
    "But...",
    "Do you know which photos you look the best in? 💕✨",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showText, setShowText] = useState("");

  useEffect(() => {
    if (currentLine < lines.length) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= lines[currentLine].length) {
          setShowText(lines[currentLine].slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setCurrentLine((prev) => prev + 1), 1000);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentLine]);

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (currentLine < lines.length) return; // wait until typing is done

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500); // 2.5s per slide
    return () => clearInterval(timer);
  }, [images.length, currentLine]);

  // Different animations for each slide
  const variants = [
    // { initial: { opacity: 0 }, animate: { opacity: 1 } }, // simple fade in
    { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 } }, // soft zoom in
    { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } }, // soft zoom out
    {
      initial: { opacity: 0, filter: "blur(8px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
    }, // blur reveal
  ];
  const variant = variants[index % variants.length];

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      className="py-4 text-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>

      {/* Typing text */}
      <p className="text-2xl font-bold text-pink-700 min-h-[3rem]">
        {showText}
      </p>

      {currentLine >= lines.length && (
        <React.Fragment>
          {/* Circle frame that animates in once */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              stiffness: 80,
              duration: 1.5,
            }}
            className="mt-6 w-64 h-64 rounded-xl shadow-2xl overflow-hidden mx-auto relative"
          >
            <motion.img
              key={index}
              src={images[index]}
              alt={`avatar-${index}`}
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              initial={variant.initial}
              animate={variant.animate}
              // exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="mt-8 text-stone-700 text-center relative z-10"
          >
            The ones where we're together 😊💕
          </motion.p>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 13, duration: 1.5, ease: "easeOut" }}
            className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
          >
            Yayy us! 🤗💕
          </motion.button>
        </React.Fragment>
      )}
    </motion.div>
  );
}

function NotesStage({
  notes,
  openedNote,
  setOpenedNote,
  openedNoteIndex,
  setOpenedNoteIndex,
  onNext,
  onBack,
}) {
  function toggleNote(note, index) {
    if (openedNote === note) return;
    setOpenedNote(note);
    const updatedOpenedNoteIndex = [...openedNoteIndex];
    if (!updatedOpenedNoteIndex.includes(index)) {
      updatedOpenedNoteIndex.push(index);
    }
    setOpenedNoteIndex(updatedOpenedNoteIndex);
  }

  useEffect(() => {
    return () => {
      setOpenedNote([]);
    };
  }, []);

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      className="py-4 text-center"
    >
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.6, 1], ease: "easeInOut" }}
        className="text-3xl text-center md:text-5xl font-extrabold text-purple-700 relative z-10"
      >
        Little notes, from my heart to yours 💕✨
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1.5, ease: "easeOut" }}
      >
        <div className="relative mt-6 h-64 bg-gradient-to-tr from-white/60 to-pink-50 rounded-lg overflow-hidden">
          <FloatingNotes
            notes={notes}
            openedNote={openedNote}
            onClickNote={toggleNote}
          />
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {openedNoteIndex.length === notes.length && (
            <motion.button
              onClick={onNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
            >
              Baaassss havvveeee 👀
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScratchStage({ onRevealed, scratchRevealed, onNext }) {
  const canvasRef = useRef(null);

  const lines = [
    "My love deserves the best birthday celebration 🥳🥳",
    "There's a surprise waiting for you 💕💕",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [showText, setShowText] = useState("");

  useEffect(() => {
    if (currentLine < lines.length) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= lines[currentLine].length) {
          setShowText(lines[currentLine].slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setCurrentLine((prev) => prev + 1), 1000);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentLine]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpi = window.devicePixelRatio || 1;
    const ctxRef = { current: null };
    const listeners = { added: false, start: null, move: null, end: null };
    let ro = null;

    // initialize canvas size & overlay. Returns true when successful.
    const initCanvas = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return false; // not ready yet

      canvas.width = Math.floor(cw * dpi);
      canvas.height = Math.floor(ch * dpi);

      const ctx = canvas.getContext("2d");
      // make sure the canvas is cleared first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw overlay
      ctx.fillStyle = "#7e22ce";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";

      ctxRef.current = ctx;
      return true;
    };

    // check how much has been revealed
    const checkReveal = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      try {
        const imgData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;
        let cleared = 0;
        // sample every Nth alpha byte to reduce work
        for (let i = 3; i < imgData.length; i += 4 * 20) {
          if (imgData[i] === 0) cleared++;
        }
        const ratio = cleared / (imgData.length / (4 * 20));
        if (ratio > 0.25) {
          onRevealed();
        }
      } catch (err) {
        // getImageData may throw if canvas is tainted; ignore safely
        // console.error(err);
      }
    };

    // start pointer listeners for scratching
    const startListeners = () => {
      if (listeners.added) return;
      let drawing = false;

      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches && e.touches[0];
        const clientX = touch ? touch.clientX : e.clientX;
        const clientY = touch ? touch.clientY : e.clientY;
        const x = (clientX - rect.left) * dpi;
        const y = (clientY - rect.top) * dpi;
        return { x, y };
      };

      listeners.start = (e) => {
        drawing = true;
        // allow mouse/touch to draw immediately
        draw(e);
      };
      listeners.move = (e) => {
        if (!drawing) return;
        draw(e);
      };
      listeners.end = () => {
        drawing = false;
        checkReveal();
      };

      function draw(e) {
        const p = getPos(e);
        const ctx = ctxRef.current;
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 30 * dpi, 0, Math.PI * 2);
        ctx.fill();
      }

      // make sure canvas receives touch interactions
      canvas.style.touchAction = "none";

      canvas.addEventListener("mousedown", listeners.start);
      canvas.addEventListener("touchstart", listeners.start, { passive: true });
      window.addEventListener("mouseup", listeners.end);
      window.addEventListener("touchend", listeners.end);
      canvas.addEventListener("mousemove", listeners.move);
      canvas.addEventListener("touchmove", listeners.move, { passive: true });

      listeners.added = true;
    };

    // cleanup function
    const cleanup = () => {
      if (listeners.added) {
        canvas.removeEventListener("mousedown", listeners.start);
        canvas.removeEventListener("touchstart", listeners.start);
        window.removeEventListener("mouseup", listeners.end);
        window.removeEventListener("touchend", listeners.end);
        canvas.removeEventListener("mousemove", listeners.move);
        canvas.removeEventListener("touchmove", listeners.move);
        listeners.added = false;
      }
      if (ro) {
        try {
          ro.disconnect();
        } catch (e) {}
        ro = null;
      }
    };

    // Try to init immediately; otherwise observe size until available
    const tryInit = () => {
      if (initCanvas()) {
        startListeners();
      } else {
        // ResizeObserver to wait for layout
        ro = new ResizeObserver(() => {
          if (initCanvas()) {
            if (ro) {
              try {
                ro.disconnect();
              } catch (e) {}
              ro = null;
            }
            startListeners();
          }
        });
        ro.observe(canvas);
      }
    };

    // Kick off initialization on next frame to let browser paint
    const rafId = requestAnimationFrame(tryInit);

    // cleanup on unmount
    return () => {
      cancelAnimationFrame(rafId);
      cleanup();
    };
  }, []);

  return (
    <motion.div className="p-4 text-center">
      <motion.div className="text-center w-100 py-4">
        <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>
        <p className="text-2xl font-bold text-pink-700 min-h-[3rem]">
          {showText}
        </p>

        {/* {currentLine >= lines.length && ( */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 9, duration: 1.5, ease: "easeOut" }}
          className="mt-3 text-beige-700 text-center relative z-10"
          style={{
            display: `${currentLine >= lines.length ? "block" : "none"}`,
          }}
        >
          <div className="mt-6 mx-auto w-full max-w-md">
            <div
              className="relative bg-white rounded-lg overflow-hidden"
              style={{ height: 220 }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center text-center px-4 text-lg font-semibold"
                style={{ pointerEvents: "none" }}
              >
                Surprise Text Below
              </div>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {!scratchRevealed && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="mt-4 text-stone-700 text-center relative z-10"
              >
                Scratch the card to reveal your surprise ✨
              </motion.p>
            )}
            {/* </div> */}

            {scratchRevealed && (
              <motion.button
                onClick={onNext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                // style={{ display: scratchRevealed ? "" : "none" }}
                className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
              >
                Blush Blush 🥰💕
              </motion.button>
            )}
          </div>
        </motion.div>
        {/* )} */}
      </motion.div>
    </motion.div>
  );
}

function FinalStage({ confetti, setConfetti, onRestart, onBack }) {
  useEffect(() => {
    // small confetti timer
    setConfetti(true);
    const id = setTimeout(() => setConfetti(false), 6000);
    return () => clearTimeout(id);
  }, []);
  return (
    <motion.div className={"py-4 text-center"}>
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200"></div>
      <motion.h1
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.6, 1], ease: "easeInOut" }}
        className="text-3xl text-center md:text-5xl font-extrabold text-purple-700 relative z-10"
      >
        Happiest Birthday to you, my Aamena! 💕💕
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1.5, ease: "easeOut" }}
        className="mt-4 text-beige-700 text-center relative z-10"
      >
        I can’t wait to celebrate forever with you. 🤗❤️
      </motion.p>

      <motion.button
        onClick={() => {
          window.open("", "_self");
          window.close();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1.5, ease: "easeOut" }}
        className="mt-8 px-6 py-3 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-offwhite shadow-lg relative z-10"
      >
        Buueee Buueee 🤗💕
      </motion.button>

      {confetti && <ConfettiMini />}
    </motion.div>
    // <motion.div
    //   initial={{ scale: 0.98, opacity: 0 }}
    //   animate={{ scale: 1, opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   className="p-6 text-center"
    // >
    //   <h1 className="text-4xl font-extrabold text-pink-600">
    //     Happiest Birthday to you, my Aamena! 💕💕
    //   </h1>
    //   <p className="mt-3 text-gray-700">
    //     I can’t wait to celebrate forever with you. 🤗❤️
    //   </p>

    //   <div className="mt-6 flex justify-center gap-3">
    //     <button onClick={onBack} className="px-4 py-2 rounded-md border">
    //       Back
    //     </button>
    //     <button
    //       onClick={onRestart}
    //       className="px-5 py-3 rounded-full bg-indigo-600 text-white"
    //     >
    //       Play Again
    //     </button>
    //   </div>

    //   {confetti && <ConfettiMini />}
    // </motion.div>
  );
}

// ------------------- Small Helpers & Visuals -------------------
function AnimatedTyping({ lines }) {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    const line = lines[idx];
    const timer = setTimeout(
      () => {
        if (forward) {
          if (pos < line.length) setPos(pos + 1);
          else setForward(false);
        } else {
          // after full, pause then move to next
          setTimeout(() => {
            setIdx((i) => (i + 1) % lines.length);
            setPos(0);
            setForward(true);
          }, 900);
        }
      },
      forward ? 60 : 0
    );
    return () => clearTimeout(timer);
  }, [lines, idx, pos, forward]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-pink-600">
        {lines[idx].slice(0, pos)}
        <span className="blinking-cursor">|</span>
      </div>
      <style>{`.blinking-cursor{display:inline-block; width:10px; animation: blink 1s steps(2, start) infinite}@keyframes blink{to{visibility:hidden}}`}</style>
    </div>
  );
}

function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-999">
      <div className="absolute left-6 top-10 opacity-30 animate-f1">💖</div>
      <div className="absolute right-6 top-24 opacity-25 animate-f2">✨</div>
      <div className="absolute left-1/2 bottom-10 opacity-20 animate-f3">
        💕
      </div>
      <style>{`
        .animate-f1{ animation: float1 8s ease-in-out infinite; font-size:36px }
        .animate-f2{ animation: float2 10s ease-in-out infinite; font-size:22px }
        .animate-f3{ animation: float3 12s ease-in-out infinite; font-size:30px }
        @keyframes float1{0%{transform:translateY(0)}50%{transform:translateY(-18px) rotate(-6deg)}100%{transform:translateY(0)}}
        @keyframes float2{0%{transform:translateY(0)}50%{transform:translateY(-28px) rotate(6deg)}100%{transform:translateY(0)}}
        @keyframes float3{0%{transform:translateY(0)}50%{transform:translateY(-24px) rotate(-4deg)}100%{transform:translateY(0)}}
      `}</style>
    </div>
  );
}

function FloatingNotes({ notes, openedNote, onClickNote }) {
  return (
    <div className="w-full h-full relative">
      {notes.map((t, i) => {
        const left = 8 + ((i * 18) % 80);
        const top = 8 + ((i * 23) % 60);
        const isOpen = openedNote === t;
        const isMobile = window.innerWidth < 768;

        return (
          <motion.button
            key={i}
            onClick={() => onClickNote(t, i)}
            className={`absolute ${
              isOpen
                ? "p-3 text-sm bg-white w-60 z-10"
                : "p-2 bg-pink-400 text-white"
            } rounded-full shadow-md`}
            style={{
              left: isOpen ? (isMobile ? "8%" : `${left - 8}%`) : `${left}%`,
              top: `${top}%`,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={
              isOpen
                ? {
                    y: [0, -10, 0], // smooth float for opened notes
                    opacity: 1, // lock opacity to 1
                  }
                : {
                    y: [0, -8, 0],
                    opacity: [0.8, 1, 0.8], // twinkling animation
                  }
            }
            transition={{
              duration: isOpen ? 3 + i * 0.3 : 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {isOpen ? t : "💌"}
          </motion.button>
        );
      })}
    </div>
  );
}

function ConfettiMini() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* lightweight CSS confetti */}
      <div className="confetti-piece" style={{ left: "10%", top: "20%" }} />
      <div className="confetti-piece" style={{ left: "30%", top: "10%" }} />
      <div className="confetti-piece" style={{ left: "50%", top: "30%" }} />
      <div className="confetti-piece" style={{ left: "70%", top: "15%" }} />
      <style>{`
        .confetti-piece{ position:absolute; width:12px; height:20px; background:linear-gradient(180deg,#ffd93d,#ff7ab6); transform:rotate(15deg); animation: fall 3s linear forwards }
        @keyframes fall{0%{transform:translateY(-40px) rotate(0deg)}100%{transform:translateY(520px) rotate(360deg)}}
      `}</style>
    </div>
  );
}
