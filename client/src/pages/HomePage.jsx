import logo from '../assets/IPUC_COLOR para fondo oscuro (1).png'
import imagen1 from '../assets/grupo1.jpeg'
import imagen2 from '../assets/grupo2.jpeg'
import imagen3 from '../assets/grupo3.jpeg'
import biblia from '../assets/biblia.jpg'
import imagen4 from '../assets/grupo4.jpeg'
import imagen5 from '../assets/grupo5.jpeg'
import imagen6 from '../assets/grupo6.jpeg'
import imagen7 from '../assets/grupo7.jpeg'
import encuentro1 from '../assets/encuentro1.jpeg'
import encuentro2 from '../assets/encuentro2.jpeg'
import encuentro3 from '../assets/encuentro3.jpeg'
import clase from '../assets/clase1.jpeg'
import clase1 from '../assets/clase2.jpeg'
import clase2 from '../assets/clase3.jpeg'
import clase3 from '../assets/clase4.jpeg'
import clase4 from '../assets/clase5.jpeg'
import clase5 from '../assets/clase6.jpeg'
import clase6 from '../assets/clase7.jpeg'
import clase7 from '../assets/clase8.jpeg'
import clase8 from '../assets/clase9.jpeg'
import clase9 from '../assets/clase10.jpeg'
import clase10 from '../assets/clase11.jpeg'
import clase11 from '../assets/clase12.jpeg'
import clase12 from '../assets/clase13.jpeg'
import clase13 from '../assets/clase14.jpeg'
import clase14 from '../assets/clase15.jpeg'
import material1 from '../assets/manualidad1.jpeg'
import material2 from '../assets/manualidad2.jpeg'
import material3 from '../assets/manualidad3.jpeg'
import material4 from '../assets/manualidad4.jpeg'
import material5 from '../assets/manualidad5.jpeg'

import { FiAlignJustify } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGooglePlus } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import React, { useState, useEffect } from 'react';
import Slider from "react-slick";


import ImageSlider from '../components/ImageSlider';
function HomePage() {

    const redirectToLink = () => {
      // Redirigir al usuario a la URL deseada
      window.location.href = 'https://ipuc.org.co/';
    };


    const encuentros = [
      {url:encuentro1},
      {url:imagen6},
      {url:imagen7},
      {url:imagen3},
      {url:encuentro2},
      {url:encuentro3},
      {url:imagen5},
    ]

    const clases=[
      {url:clase},
      {url:clase1},
      {url:clase2},
      {url:clase3},
      {url:clase4},
      {url:clase5},
      {url:clase6},
      {url:clase7},
      {url:clase8},
      {url:clase9},
      {url:clase10},
      {url:clase11},
      {url:clase12},
      {url:clase13},
      {url:clase14},
    ]
    const materiales=[
      {url:material1},
      {url:material2},
      {url:material3},
      {url:material4},
      {url:material5},
    ]

    const containerStyles = {
      width: "400px",
      height: "220px",
      margin: "0 auto",
    };

   //pendiente de quitar
    const [valorArchivo, setValorArchivo] = useState('');
    const archivo = "../contador.php";

    useEffect(() => {
      fetch(archivo)
        .then(response => response.text())
        .then(data => {
          setValorArchivo(data);
        })
        .catch(error => {
          console.error('Error al obtener el valor del archivo:', error);
        });

    }, []); //igual aca 

  


    return(
        <>
        <header className="flex place-content-between items-center px-2 pt-6">
      <img className="w-32" src={logo} alt="logo" />

     <ul className={`sm:flex text-[18px] sm:w-[438px] sm:place-content-around sm:text-[16px] sm:items-center hidden`}>
      <div className='w-10 h-10 cursor-pointer sm:hidden' > <IoCloseSharp size={42}/></div>
      <li className="overflow-hidden whitespace-nowrap">
    <a href="#">INICIO</a>
      </li>
      <li className="overflow-hidden whitespace-nowrap"> 
    <a href="#quehacemos">¿QUÉ HACEMOS?</a>
      </li>
     <li className="overflow-hidden whitespace-nowrap">
     <a href="#quienesSomos">¿QUIÉNES SOMOS?</a>
      </li>
      <li className="overflow-hidden whitespace-nowrap">
    <a href="/login"><FaUserCircle className="w-8 h-8" /></a>
      </li>
      </ul>
  
      <div  className='w-10 h-10 cursor-pointer sm:hidden' ><FiAlignJustify size={42} /></div>
    </header>


        <section className='flex flex-col lg:flex-row items-center bg-blue-900 h-auto lg:h-96'>
  <div className='w-full lg:w-1/2 text-white px-8 lg:pr-4 lg:pl-0 lg:py-0 py-4'>
    <h1 className='text-white text-center font-bold text-[28px] pl-4'>Cada momento dedicado a la lectura y estudio de la Biblia es una inversión eterna en nuestro crecimiento espiritual.</h1>
  </div>
  <div className='w-full lg:w-1/2 flex justify-center lg:pl-4 lg:pr-0 lg:py-0 py-4'>
    <img className="w-full lg:w-96 rounded-lg" src={imagen1} alt="grupo" />
  </div>
</section>

<div className='mt-24 mb-12 text-center text-blue-900 font-bold text-[28px]'>DATOS IMPORTANTES</div>
<div className="flex flex-col lg:flex-row lg:justify-evenly items-center">
  <div className='bg-yellow-900 text-white w-32 h-32 rounded-lg justify-around items-center shadow-xl mb-4 lg:mb-0'>
    <div className="text-center mt-4 text-[26px] font-bold">
      </div>  
    <div className="text-center text-[16px] font-thin">Visitantes a la pagina</div>
  </div>
  <div className='bg-yellow-900 text-white w-32 h-32 rounded-lg justify-around items-center shadow-xl mb-4 lg:mb-0'>
    <div className="text-center mt-4 text-[26px] font-bold">9</div>  
    <div className="text-center text-[16px] font-thin">Distritos</div>
  </div>
  <div className='bg-yellow-900 text-white w-32 h-32 rounded-lg justify-around items-center shadow-xl'>
    <div className="text-center mt-4 text-[26px] font-bold">13</div>  
    <div className="text-center text-[16px] font-thin">Obras Misioneras nacionales</div>
  </div>
</div>



<section id="quehacemos" className='flex flex-col lg:flex-row items-center  h-auto lg:h-80 mt-24'>
  <div className='w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0'>
    <img className="w-96 rounded-lg" src={imagen2} alt="grupo" />
  </div>
  <div className='w-full lg:w-1/2  px-8'>
    <h1  className='text-center font-bold text-[22px] mb-2'>¿QUÉ HACEMOS?</h1>
    <h2 className=' text-center text-[18px]'>Formamos parte de la Iglesia Pentecostal Unida de Colombia y nos dedicamos con pasión a impartir clases bíblicas exclusivamente a niños. Nuestra labor busca proporcionar una guía espiritual sólida y significativa a esta etapa crucial de la vida.</h2>
  </div>
</section>

<section className='flex flex-col lg:flex-row items-center mt-24 bg-blue-900 text-white h-auto lg:h-96'>
  <div className='w-full lg:w-1/2 px-8 lg:px-12 py-8 lg:py-0'>
    <h1 className='text-center font-bold text-[22px] mb-2 lg:mb-4'>¿CUÁL ES NUESTRO OBJETIVO?</h1>
    <h2 className='text-center text-[18px]'>En nuestras clases, abordamos diversos temas bíblicos adaptados a sus necesidades y niveles de comprensión, fomentando no solo el conocimiento sino también el crecimiento espiritual y la comunión entre los jóvenes.</h2>
  </div>
  <div className='w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0'>
    <img className="w-full lg:w-96 rounded-lg" src={imagen3} alt="grupo" />
  </div>
</section>

<div className='flex flex-col items-center mt-24 mb-24'>
  <h1 className="text-center text-[22px] font-bold m-12">Creemos firmemente que esta educación basada en la Palabra de Dios es esencial para fortalecer su fe y orientarlos en su camino hacia la salvación</h1>
  <img className="w-96 rounded-lg" src={biblia} alt="grupo" />
</div>

<section id="quienesSomos" className='flex flex-col lg:flex-row items-center h-auto lg:h-80 mt-24'>
  <div className='w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0'>
  <img className="w-full lg:w-96 rounded-lg" src={imagen4} alt="grupo" />
  </div>
  <div className='w-full lg:w-1/2 px-8 flex flex-col items-center'>
  <h1 className='text-center font-bold text-[22px] mb-2'>¿QUIÉNES SOMOS?</h1>
  <h2 className='text-center text-[18px] mb-6'>La Iglesia Pentecostal Unida de Colombia (IPUC) es una denominación cristiana pentecostal unicitaria en Colombia, completamente autónoma (dirigida netamente por colombianos).</h2>
  <button className="bg-blue-500 py-2 px-4 rounded-lg hover:text-white" onClick={redirectToLink}>Conoce más</button>
</div>
</section>

<div class='bg-blue-900 mt-24 justify-around h-auto lg:h-96 flex flex-col lg:flex-row items-center text-white'>

  <div class="mb-8 lg:mb-0">
    <h1 class='text-center font-bold text-[22px] '>CLASES</h1>
    <div class="lg:w-96" style={containerStyles}> <ImageSlider slides={clases} /> </div>
  </div>

  <div class="mb-8 lg:mb-0">
    <h1 class='text-center font-bold text-[22px] '>ENCUENTROS</h1>
    <div class="lg:w-96" style={containerStyles}> <ImageSlider slides={encuentros} /> </div>
  </div>

  <div class="mb-8 lg:mb-0">
    <h1 class='text-center font-bold text-[22px] '>MANUALIDADES</h1>
    <div class="lg:w-96" style={containerStyles}> <ImageSlider slides={materiales} /> </div>
  </div>

</div>



<section className='flex flex-col lg:flex-row items-center h-auto lg:h-80 mt-6 lg:mt-0'>
  <div className='w-full lg:w-1/2 px-8 lg:px-4 lg:mb-4'>
    <h1 className='text-center font-bold text-[16px] mb-2'>ENCUENTRANOS</h1>
    <div className='flex justify-center space-x-4 lg:space-x-8'>
      <FaFacebook size={36} className="mx-2"/>
      <RiInstagramFill size={36} className="mx-2"/>
      <FaGooglePlus size={36} className="mx-2"/>
      <FaMapMarkedAlt size={36} className="mx-2"/>
    </div>
  </div>
  <div className='w-full lg:w-1/2 px-8 lg:px-4 lg:mb-4'>
    <h1 className='text-center font-bold text-[22px] mb-2'>SE PARTE DE NUESTRA GRAN COMUNIDAD</h1>
  </div>
  <div className='w-full lg:w-1/2 px-8 flex justify-center'>
    <img className="w-52 mx-auto" src={logo} alt="logo" />
  </div>
</section>

        </>
    )
}

export default HomePage