import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Hero from "./Hero";
import Benefits from "./Benefits";

const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
      </div>
      <ButtonGradient />
    </>
  );
};

export { LandingPage };
