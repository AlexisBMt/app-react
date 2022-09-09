import React, { useEffect, useState } from 'react'
import { contratos_data } from '../../helpers/contratos_data';
import ShowDatos from './ShowDatos';

export default function PruebaFetch() {
  const [datos, setDatos] = useState([]);

  useEffect( () => {
    fetch('http://127.0.0.1:8000/api/doc-tecnica-all')
      .then( res => res.json() )
      .then( result => setDatos(result) )
  }, [])

  console.log(datos.length)

  return (
    <>
      { datos.length == 0 ? <h2>Loading...</h2> : (<ShowDatos datos={datos}/>) }
    </>
  )
}