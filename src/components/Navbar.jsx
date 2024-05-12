import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    console.log(nav);
    console.log('click');
    setNav(!nav);
  }
  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] px-4 text-white">

      <div className='' onClick={handleNav}>
        {!nav ? <AiOutlineClose  size={30}/> : <AiOutlineMenu size={30}/>}
      </div>
      
      <div className='fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900' >
        
        <h1 className='w-full text-3xl font-bold text-[#000000] m-4'>Inscripción Practica</h1>
        

        <ul className='uppercase p-4'>
        <li className='p-4 border-b border-gray-600'>Inicio</li>
        <li className='p-4 border-b border-gray-600'>Compañia</li>
        <li className='p-4 border-b border-gray-600'>Recursos</li>
        <li className='p-4 border-b border-gray-600'>Acerca</li>
        <li className='p-4'>Contacto</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
