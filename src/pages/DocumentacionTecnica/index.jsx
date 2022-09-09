import React, { useState } from 'react'
import './docTecnica.css'
import { Link } from 'wouter'
import Contratos from '../../components/Contratos/Contratos'
import TrabajosExtra from '../../components/TrabajosExtra/TrabajosExtra'

export default function DocumentacionTecnica (){
  const [status, setStatus] = useState(true)
  const [btnStatus, setBtnStatus] = useState([1, 0])
  const stylesBtn = ['btn mx-2 navbtn', 'btn mx-2 navbtn-active']

  const handlerClickContratos = () => {
    setStatus(true)
    setBtnStatus([1, 0])
  }

  const handlerClickTrabajos = () => {
    setStatus(false)
    setBtnStatus([0, 1])
  }
  
  return(
   <>
      <h1 className='paginas-titulo'>Documentacion Técnica</h1>
      <nav aria-label='breadcrumb' style={{backgroundColor: '#EAE3E1'}}>
        <ol className='breadcrumb px-5 py-3'>
          <li className='breadcrumb-item'><Link to='/'>Home</Link></li>
          <li className='breadcrumb-item' active aria-current='page'>Documentacion Tecnica</li>
        </ol>
      </nav>

      <ul className='nav nav-tabs'>
        <li className="nav-item">  
          <button className={stylesBtn[btnStatus[0]]} onClick={handlerClickContratos}>Contratos</button>
        </li>
        <li className="nav-item">
          <button className={stylesBtn[btnStatus[1]]} onClick={handlerClickTrabajos}>Trabajos Extra</button>
        </li>
      </ul>

      <div className='bg-light py-5 '>
        { status ? <Contratos /> : <TrabajosExtra /> }
      </div>
   </> 
  )
}