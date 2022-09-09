import React, { useState } from 'react'

export default function ShowDatos ({ datos}) {
  const [ documentacion, setDocumentacion ] = useState(datos)

  return( 
    <>
      {documentacion.map(dato => (
        <ul>
          <li>{dato.recibido}</li>
          <li>{dato.especialidad}</li>
          <li>{dato.proyecto}</li>
        </ul>
      ))}
    </>
  )

}