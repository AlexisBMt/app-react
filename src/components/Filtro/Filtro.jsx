import React, { useEffect, useState } from 'react'

export default function Filtro ( {datos, query, consultaQuery, filterQuery, consulta, api_url} ) {
 const filtro = []
  datos.map( dato => {
    filtro.push(dato[query])
  })
  const dataArr = new Set(filtro);
  let result = [...dataArr]
  const [filter, setFilter] = useState(result)
  const [flag, setFlag] = useState(false)

  const handlerClick = (event) => {
    if(event.target.value === 'None'){
      consulta[consulta.indexOf(query) + 1] = ''
      for(let i = 0; i < consulta.length-1; i++){
        if( (i % 2) === 0 && consulta[i+1] !== '' ){
          setFlag(true)
        }
      }
      consultaQuery(consulta)
      if(!flag){
        fetch(`${api_url}`)
          .then(res => res.json())
          .then(data => filterQuery(data))
      } 
    }

    if(event.target.value !== 'None'){
      let search = '' 
      consulta[consulta.indexOf(query) + 1] = event.target.value;
      for(let i = 0; i < consulta.length-1; i++){
        if( (i % 2) === 0 && consulta[i+1] !== '' ){
          search += `${consulta[i]},${consulta[i+1]},`
        }
      }
      console.log(search)
      fetch(`${api_url}/q=${search}`)
        .then(res => res.json())
        .then(data => filterQuery(data))
      consultaQuery(consulta)  
    }
  }
  
  return(
    <select className='form-select form-select-sm mb-3' onClick={handlerClick}>
      <option value='None'>None</option>
      {filter.map(element => (
        <option value={element}>{element}</option>
      ))}
    </select>
  )
}