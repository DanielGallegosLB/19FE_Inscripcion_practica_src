import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Header from "./Header";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="pt-[3.3rem] items-center flex flex-col lb:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
      </div>
      <ButtonGradient />

      {/* Main Headline */}

      {/* Hero Image */}
      <section className="w-full max-w-2xl text-center mb-8">
        <img
          src="path_to_hero_image.jpg"
          alt="Hero"
          className="rounded-lg shadow-lg w-full"
        />
      </section>
      {/* Benefits */}

      {/* Social Proof */}

      {/* Call to Action */}
    </div>
  );
};

export { LandingPage };
