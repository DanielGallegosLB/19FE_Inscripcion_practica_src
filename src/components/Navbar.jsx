import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  }
  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] px-4  text-white">      
      <h1 className='w-full text-3xl font-bold text-[#000000] m-4'>Inscripción Practica</h1>
        <ul className='hidden md:flex'>
          <li className='p-4'>Inicio</li>
          <li className='p-4'>Compañia</li>
          <li className='p-4'>Recursos</li>
          <li className='p-4'>Acerca</li>
          <li className='p-4'>Contacto</li>
        </ul>
      <div  onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose  size={30}/> : <AiOutlineMenu size={30}/>}
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-100 bg-[#ff6200] ease-in-out duration-500' : 'fixed top-0 left-[-100%] ease-in-out duration-500'} >
        
        <ul className='uppercase p-4'>
          <li className='p-4 border-b border-white-100'>Inicio</li>
          <li className='p-4 border-b border-white-100'>Compañia</li>
          <li className='p-4 border-b border-white-100'>Recursos</li>
          <li className='p-4 border-b border-white-100'>Acerca</li>
          <li className='p-4'>Contacto</li>
        </ul>
      </div>
      
    </div>
  );
}

export default Navbar;
