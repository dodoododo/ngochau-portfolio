import React from 'react';
import { useLocale } from "@/content/i18n";

export default function OutdoorsChapter() {
  const { t } = useLocale();
  const o = t.personal.outdoors;

  return (
    <section className="bg-[#FDFBF7] relative text-[#2B3028] py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden selection:bg-[#E8C547] selection:text-[#2B3028]">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img 
          src="src/assets/outdoors/travel-blog-background.png" 
          alt="Background texture" 
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: `linear-gradient(to bottom, #FDFBF7 0%, transparent 15%, transparent 85%, #FDFBF7 100%),
                         linear-gradient(to right, #FDFBF7 0%, transparent 10%, transparent 90%, #FDFBF7 100%)`
          }}
        />
        <div className="absolute inset-0 bg-[#FDFBF7]/90 mix-blend-multiply" />
      </div>
      <div className="max-w-[1400px] mx-auto z-10 relative">

        {/* --- SPREAD ONE: Playful Typography & Intro Cluster --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12 md:mb-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col pt-8 md:pt-0">
            <h2 className="font-serif text-[4.5rem] md:text-[7rem] lg:text-[6rem] leading-[0.85] tracking-tight text-[#2B3028]">
              {o.spreadOne.titleLine1}<br />
              <span className="font-sans italic text-3xl md:text-5xl lg:text-6xl tracking-normal text-[#6B8E7B] block mt-4 mb-2">
                {o.spreadOne.titleMid}
              </span>
              {o.spreadOne.titleLine2}<br />
              <span className="font-serif italic text-4xl md:text-6xl lg:text-7xl tracking-tight text-[#E27D60] block mt-2 mb-1">
                {o.spreadOne.titleHighlight}
              </span>
              {o.spreadOne.titleLine3}
            </h2>
            
            <div className="w-32 h-2 bg-[#E8C547] mt-12 mb-8"></div>
            
            <p className="font-sans text-base md:text-lg leading-relaxed text-[#2B3028]/80 font-medium max-w-md">
              {o.spreadOne.body}
            </p>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative w-full md:w-10/12 ml-auto aspect-[4/5] bg-[#EBE9E0] border-[8px] border-white shadow-sm z-10">
              <img 
                src="src/assets/outdoors/hop-scotch.jpg" 
                alt={o.spreadOne.altHopscotch} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-12 -left-6 md:-left-16 w-2/3 aspect-[3/2] bg-[#EBE9E0] border-[6px] border-white shadow-md z-20 -rotate-2">
              <img 
                src="src/assets/outdoors/horizontal-ship.jpg" 
                alt={o.spreadOne.altHorizontalShip} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* --- SPREAD TWO: The Coast (3 Images) --- */}
        <div className="relative mb-12 md:mb-12 border-t border-[#2B3028]/10 pt-16">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#EBE9E0] overflow-hidden mb-12">
            <img 
              src="src/assets/outdoors/fake-ass-beach.jpg" 
              alt={o.spreadTwo.altPanorama} 
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5 flex flex-col justify-center">
              <p className="font-serif italic text-3xl md:text-4xl text-[#85B2C9] leading-snug mb-6">
                {o.spreadTwo.quote}
              </p>
              <p className="font-sans text-sm md:text-lg text-[#2B3028]/90 max-w-sm">
                {o.spreadTwo.body}
              </p>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
              <div className="w-full aspect-square bg-[#EBE9E0] border-[6px] border-white shadow-sm mt-8 md:mt-12 rotate-1">
                <img 
                  src="src/assets/outdoors/terra-gate.jpg" 
                  alt={o.spreadTwo.altTerraGate} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-full aspect-[3/4] bg-[#EBE9E0] border-[6px] border-white shadow-sm -rotate-2">
                <img 
                  src="src/assets/outdoors/buddha-beach.jpg" 
                  alt={o.spreadTwo.altBuddhaBeach} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SPREAD THREE: Neighborhood Walks (Photo Strip) --- */}
        <div className="mb-12 md:mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-end mb-10">
            <h3 className="font-serif text-5xl md:text-6xl text-[#6B8E7B] leading-none shrink-0">
              {o.spreadThree.heading}
            </h3>
            <p className="font-sans text-lg font-bold uppercase tracking-[0.2em] text-[#2B3028]/90 pb-2">
              {o.spreadThree.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="w-full aspect-square bg-[#EBE9E0] border-[6px] border-white shadow-sm">
               <img 
                 src="src/assets/outdoors/currency.jpg" 
                 alt={o.spreadThree.altCurrency} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
            <div className="w-full aspect-square bg-[#EBE9E0] border-[6px] border-white shadow-sm sm:mt-12">
               <img 
                 src="src/assets/outdoors/goose.jpg" 
                 alt={o.spreadThree.altGoose} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
            <div className="w-full aspect-square bg-[#EBE9E0] border-[6px] border-white shadow-sm sm:mt-4">
               <img 
                 src="src/assets/outdoors/fireworks.jpg" 
                 alt={o.spreadThree.altFireworks} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
          </div>
        </div>

        {/* --- SPREAD FOUR: The Altitude (3 Images) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-12  items-center bg-[#F5F8F6] -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-12 md:py-12">
          
          <div className="md:col-span-5 relative">
            <div className="w-full aspect-[4/5] bg-[#EBE9E0] border-[8px] border-slate-700 shadow-sm -rotate-1">
               <img 
                 src="src/assets/outdoors/coffee-hill.jpg" 
                 alt={o.spreadFour.altCoffeeHill} 
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </div>
            <span className="absolute -bottom-8 -right-4 md:-right-16 font-serif italic text-3xl text-[#6B8E7B] rotate-3 drop-shadow-sm z-20">
              {o.spreadFour.note}
            </span>
          </div>

          <div className="md:col-span-7 flex flex-col">
            <p className="font-sans text-lg leading-relaxed text-[#2B3028]/80 font-medium max-w-md mb-12">
              {o.spreadFour.body}
            </p>
            
            <div className="flex gap-4 md:gap-6 items-start">
              <div className="w-1/2 aspect-[4/3] bg-[#EBE9E0] border-[4px] border-slate-700 shadow-sm mt-8">
                <img 
                  src="src/assets/outdoors/hill-top.jpg" 
                  alt={o.spreadFour.altHillTop} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="w-1/2 aspect-[4/3] bg-[#EBE9E0] border-[4px] border-slate-700 shadow-sm">
                <img 
                  src="src/assets/outdoors/hill-sea.jpg" 
                  alt={o.spreadFour.altHillSea} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SPREAD FIVE: The Cafe (4 Images) --- */}
        <div className="mb-12 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-6">
              <h3 className="font-serif text-5xl md:text-6xl text-[#E8C547] leading-none mb-6">
                {o.spreadFive.heading}
              </h3>
              <p className="font-sans text-xl text-[#2B3028]/80 max-w-md leading-relaxed">
                {o.spreadFive.body}
              </p>
            </div>
            
            <div className="lg:col-span-6">
              <div className="w-full aspect-[16/9] bg-[#EBE9E0] border-[6px] border-white shadow-sm rotate-1">
                <img 
                  src="src/assets/outdoors/rasp-cafe.jpe" 
                  alt={o.spreadFive.altRaspCafe} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <div className="w-full aspect-square bg-[#EBE9E0] border-[4px] border-white shadow-sm">
              <img 
                src="src/assets/outdoors/niu-fish.jpg" 
                alt={o.spreadFive.altNiuFish} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full aspect-square bg-[#EBE9E0] border-[4px] border-white shadow-sm mt-4 md:mt-8">
              <img 
                src="src/assets/outdoors/shiba.jpg" 
                alt={o.spreadFive.altShiba} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="w-full aspect-square bg-[#EBE9E0] border-[4px] border-white shadow-sm mt-8 md:mt-16 flex items-center justify-center text-center">
              <img 
                src="src/assets/outdoors/nckh.jpg" 
                alt={o.spreadFive.altNckh} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* --- SPREAD SIX: Sunset & Conclusion (2 Images) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center bg-[#FDFBF7]">
          
          <div className="lg:col-span-5 order-2 lg:order-1 relative z-10 -mt-12 lg:mt-0 mx-6 lg:mx-0">
            <div className="bg-[#E27D60] p-10 md:p-16 text-[#FDFBF7] shadow-sm relative">
              <div className="absolute -top-16 right-6 w-28 md:w-40 aspect-square bg-[#EBE9E0] border-[4px] border-white shadow-md rotate-6">
                <img 
                  src="src/assets/outdoors/rock-cactus.jpg" 
                  alt={o.spreadSix.altRockCactus} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-snug pt-8">
                {o.spreadSix.quote}
              </p>
              
              <div className="mt-12 pt-6 border-t border-[#FDFBF7]/30 flex justify-between items-end">
                <span className="font-sans text-[14px] uppercase tracking-[0.2em] font-bold">
                  {o.spreadSix.caption}
                </span>
                <span className="font-serif text-3xl text-[#E8C547]">☀</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="w-full h-full md:aspect-[16/10] bg-[#EBE9E0] overflow-hidden  border-[4px] border-slate-700">
              <img
                src="src/assets/outdoors/sanrio.jpg"
                alt={o.spreadSix.altSanrio}
                className="w-full h-full object-cover object-[50%_20%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}