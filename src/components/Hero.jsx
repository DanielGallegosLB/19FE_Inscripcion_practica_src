import React from "react";
import Section from "./Section";
import { curve, robot } from "../assets";
import { Button } from "./Button";
import Heroimg from "../assets/Hero.webp";

const Hero = () => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25] text-black"
      crosses
      
      id="hero"
    >
      <div className="container relative">
        <div
          className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] lg:mb-[6rem]"
        >
          <h1 className="h1 text-gray-800 mb-6">
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
          <p className="body-1 max-w-3xl mx-auto mv-6 text-n-5 lg:mb-8">
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

              <div>
                <img
                  src={Heroimg}
                  className="w-full"
                  width={1440}
                  height={1800}
                  alt="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
