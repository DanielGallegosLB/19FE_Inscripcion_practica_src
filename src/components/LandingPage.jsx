import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";
import ButtonGradient from "../assets/svg/ButtonGradient";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Collaboration from "./Collaboration";
import Services from "./Services";
import Pricing from "./Pricing";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export { LandingPage };
