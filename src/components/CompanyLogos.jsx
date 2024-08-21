import React from "react";
import { companyLogos } from "../constans";
const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className=" tagline mb-6 text-center text-n-1/50">
        Ayudando a Profesores y Estudiantes a tener una mejor experiencia de
        Práctica
      </h5>
      <ul className="flex  rounded-full">
        {companyLogos.map((logo, index) => (
          <li className="flex items-center justify-center flex-1 h-[8.5rem]" key={index}>
            <img src={logo} width={134} height={28} alt={logo} className="" />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
