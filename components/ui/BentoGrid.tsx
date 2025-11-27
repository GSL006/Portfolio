import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie").then(mod => {
  // Wrapper to prevent unmount errors
  const LottieComponent = (props: any) => {
    try {
      return <mod.default {...props} />;
    } catch (e) {
      return null;
    }
  };
  return LottieComponent;
}), { ssr: false });

import { cn } from "@/lib/utils";


import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import { Skills } from "@/data";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  // Split skills into two columns - ensure we show all skills
  const midPoint = Math.ceil(Skills.length / 2);
  const leftLists = Skills.slice(0, midPoint);
  const rightLists = Skills.slice(midPoint);
  
  // Duplicate multiple times to ensure smooth infinite scroll
  const leftRepeated = [...leftLists, ...leftLists, ...leftLists];
  const rightRepeated = [...rightLists, ...rightLists, ...rightLists];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "gagansl62004@gmail.com";
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      // Reset after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            id === 1 && img.endsWith('.mp4') ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className={cn(imgClassName, "object-cover object-center")}
              >
                <source src={img} type="video/mp4" />
              </video>
            ) : (
              <img
                src={img}
                alt={img}
                className={cn(imgClassName, "object-cover object-center ")}
              />
            )
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
            id === 1 && "bg-black/40 backdrop-blur-md rounded-2xl -ml-2 -mr-2 md:-ml-4 md:-mr-4"
          )}
        >
          {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
          <div className={`font-sans z-10 ${
            id === 1 ? 'text-white font-semibold md:text-sm lg:text-lg text-base md:max-w-lg mb-3 drop-shadow-lg' : 'font-extralight text-[#C1C2D3] md:text-xs lg:text-base text-sm md:max-w-32'
          }`}>
            {description}
          </div>
          {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
          {/* remove mb-2 mt-2 */}
          <div
            className={`font-sans z-10 ${
              id === 1 
                ? 'text-2xl lg:text-5xl max-w-2xl font-black drop-shadow-2xl' 
                : 'font-bold text-lg lg:text-3xl max-w-96'
            }`}
          >
            {id === 1 && typeof title === 'string' ? (
              <>
                {title.split('communication and effective collaboration')[0]}
                <span className="text-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]">communication and effective collaboration</span>
              </>
            ) : (
              title
            )}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div className="flex gap-2 lg:gap-4 w-fit absolute -right-3 lg:-right-2 overflow-hidden max-h-full">
              {/* Left column - animate up to down */}
              <div className="flex flex-col gap-3 animate-scroll-down">
                {leftRepeated.map((skill, i) => (
                  <div
                    key={`left-${i}`}
                    className="lg:py-3 lg:px-3 py-2 px-2 text-xs lg:text-sm opacity-70 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E] border border-white/[0.1] flex items-center justify-center min-w-[80px] lg:min-w-[100px]"
                  >
                    <img 
                      src={skill.img} 
                      alt={skill.name}
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              {/* Right column - animate down to up */}
              <div className="flex flex-col gap-3 animate-scroll-up">
                {rightRepeated.map((skill, i) => (
                  <div
                    key={`right-${i}`}
                    className="lg:py-3 lg:px-3 py-2 px-2 text-xs lg:text-sm opacity-70 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E] border border-white/[0.1] flex items-center justify-center min-w-[80px] lg:min-w-[100px]"
                  >
                    <img 
                      src={skill.img} 
                      alt={skill.name}
                      className="w-6 h-6 lg:w-8 lg:h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}
              {copied && (
                <div className="absolute -bottom-5 right-0">
                  {/* <img src="/confetti.gif" alt="confetti" /> */}
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>
              )}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};