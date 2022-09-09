import React from 'react'

export default function GetContratos ( {contratos} ) {

  return(
    <>
      {contratos.map(contrato => (
        <tr>
            <td>{contrato.recibido}</td>
            <td>{contrato.proyecto}</td>
            <td>{contrato.contratista === 'NUll' ? contrato.contratista_name : contrato.contratista}</td>
            <td>{contrato.especialidad}</td>
            <td>{contrato.contratista_objeto}</td>
            <td>{contrato.registro_patronal}</td>
            <td>{contrato.num_aprox_trabajadores}</td>
            <td>{contrato.monto_obra}</td>
            <td>{contrato.fecha_inicio}</td>
            <td>{contrato.fecha_termino}</td>
            <td>{contrato.subcontrata === 0 ? 'NO' : 'SI' }</td>
            <td>{contrato.comentarios}</td>
            <td>{contrato.estatus}</td>
            <td>{contrato.archivo}</td>
        </tr>
       ))}
    </>
  )
}