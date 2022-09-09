import React from 'react'
import '../../App.css'
import { Link } from 'wouter'
import PruebaFetch from '../../components/PruebaFetch'

export default function Home () {

  return ( 
    <>
      <h1 className='paginas-titulo'>BMTools Home</h1>
      <Link to='/doumentacion-tecnica'  className='btn btn-secondary mx-5 my-4'>Next</Link>
      
    </>
  )
}