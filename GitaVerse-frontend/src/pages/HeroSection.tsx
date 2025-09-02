import { useEffect } from 'react';
import { ThreeDMarqueeDemo } from '../components/3dgrid';
import gsap from 'gsap';;
import {useGSAP} from "@gsap/react";
interface HeroSectionProps {
  onLoaded?: () => void;
  loading?:boolean;
}
function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-400 bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

const HeroSection = ({ onLoaded,loading}: HeroSectionProps) => {
  useEffect(() => {
    const bgImg = new window.Image();
    const fgImg = new window.Image();
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount += 1;
      if (loadedCount === 2 && onLoaded) onLoaded();
    };

    bgImg.src = "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263112/b67f3bfc246180e199de2cbc60af33301a560e00de56f6699bffc110bcdc02d3_1_1_hpvqaz.png";
    fgImg.src = "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263851/erasebg-transformed_-_Copy_fyt99x.png";

    if (bgImg.complete) {
      checkLoaded();
    } else {
      bgImg.onload = checkLoaded;
    }

    if (fgImg.complete) {
      checkLoaded();
    } else {
      fgImg.onload = checkLoaded;
    }
  }, []);
useGSAP(() => {
  const main = document.querySelector('.main');
  main?.addEventListener('mousemove', (e: Event) => {
    const mouseEvent = e as MouseEvent;
    const xMove = (mouseEvent.clientX / window.innerWidth - 0.5) * 20;
    console.log(xMove);
    const yMove = (mouseEvent.clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".move ", { x: xMove, y: yMove,});
  });
}, [loading]);
 return (
  <>
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background image - lowest z-index */}
      <div
        className="w-full h-full absolute z-0 bg-no-repeat bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1756488860/fd99f5c4-af20-41ca-bcf4-66a0f148a118.png')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-white main">
        <img
          src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756545852/image_3_1_b1xnmf.png"
          className={`move absolute h-full w-auto top-[52%] left-[52%] -translate-x-1/2 -translate-y-1/2  z-30 pointer-events-none ${loading? '' : 'animated fadeIn'}`}        
        /> 
        <div className="relative z-40 items-center justify-center flex flex-col mb-[7%] pointer-events-none">
          <h1 className="text-8xl font-[Hind] font-semibold drop-shadow-[2px_2px_6px_rgba(0,0,0,0.5)] animated fadeInUp duration-700">
            Welcome to GitaVerse
          </h1>
          <h3 className="text-2xl font-[Hind] font-light drop-shadow-[1px_1px_4px_rgba(0,0,0,0.6)] animated fadeInUp duration-700">
            Explore the spiritual wisdom of Bhagvad Gita
          </h3>
        </div>
      </div>
    </div>
    <section className="border-t bg-card/50">
      <div className = "m-auto p-10 items-start justify-center  ">
        <h1 className = "text-2xl font-semibold mb-5 ">Daily Shloka</h1>
        <div className="rounded-l border border-gray-400 bg-card p-6 shadow-md flex flex-col md:flex-row gap-4">
          <img src = "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756545852/image_3_1_b1xnmf.png" className='w-30 border rounded-[50%]'/>
        <div className = "flex flex-col gap-5">
        <h3 className="text-lg font-semibold">shloka name</h3>
        <p className=" text-md text-muted-foreground ">shloka meaning</p>
        </div>
    </div>
      </div>
    </section>
     <section className=" bg-card/50">
     <div className = "flex flex-col items-start justify-center mt-10 space-y-4">
      <h1 className = "text-2xl font-semibold ml-10">Everything you need to explore the Gita</h1>
      <h2 className = "text-xl  ml-10">Browse chapters and verses, view an image-backed shloka page with simple explanations, and ask an Al
for guidance by theme or verse number.</h2>
     </div>
        <div className="container py-12 grid gap-8 md:grid-cols-3 m-auto ">
          <Feature
            title="Chapters"
            body="Read concise summaries for all 18 chapters and dive into verses with context."
          />
          <Feature
            title="Search & Discover"
            body="Quick filters help you find teachings by theme, chapter, or Sanskrit keywords."
          />
          <Feature
            title="AI Companion"
            body="Ask questions and get helpful guidance grounded in the Gita."
          />
          <Feature
            title="Daily Wisdom"
            body="Shows one verse (shloka) each day with translation & short commentary.Shows one verse (shloka) each day with translation & short commentary."
          />
          <Feature
            title="Unfold a Shloka"
            body="Let destiny guide you to a verse. A random shloka from the Bhagavad Gita awaits, carrying timeless wisdom for your journey today."
          />
          <Feature
            title="Reflection"
            body="Provides short guided reflections, or prompts tied to Gita’s teachings."
          />
          
        </div>
      </section>
  </>
);
};
export default HeroSection;