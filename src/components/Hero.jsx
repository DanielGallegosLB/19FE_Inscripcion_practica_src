import React from "react";
import Section from "./Section";
import { curve, heroBackground, robot } from "../assets";
import  Button  from "./Button";
import Heroimg from "../assets/Hero.webp";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constans";
import { ScrollParallax } from "react-just-parallax";

const Hero = () => {
  const parallaxRef = React.useRef(null);
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] text-black"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}> 
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 text-n-1 mb-6">
            Facilita el Manejo de Prácticas con Inscripción Práctica
            <span className="inline-block relative">
              Inscripción Práctica
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              ></img>
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Moderniza y optimiza las prácticas universitarias con nuestra
            plataforma automatizada.
          </p>
          <Button href="/pricing" white>
            {" "}
            get started
          </Button>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={Heroimg}
                  className="w-full scale-[2.2] translate-y-[60%] translate-x-[-4%] md:scale-[1.3] md:translate-y-[13%] lg:scale[2] "
                  width={1024}
                  height={490}
                  alt="hero"
                />

                <ScrollParallax isAbsolutelyPositioned> 
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img
                          src={icon}
                          width={24}
                          height={25}
                          alt={icon}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
              </div>
              
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
          <img 
            src={heroBackground}
            className="w-full"
            width={1440}
            height={1800}
            alt="hero"
            />
          </div>
          <BackgroundCircles />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
