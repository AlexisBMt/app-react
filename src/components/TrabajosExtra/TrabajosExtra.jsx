import React, { useEffect, useState } from 'react'
import { trabajosExtra_data } from '../../helpers/trabajos_extra_data'
import PaginationData from '../Pagination/PaginationData'
import GetTrabajosExtra from './GetTrabajosExtra'
import { getAllTrabajos } from '../../services/Fetch_doc_tecnica'
import Filtro from '../Filtro/Filtro'
import Header from './Header'
import Spinner from '../Spinner'

const API_URL = 'http://127.0.0.1:8000/api/doc-tecnica-trabajosExtra'

export default function TrabajosExtra() {
  const [trabajosExtra, setTrabajosExtra] = useState(trabajosExtra_data)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [trabajosPerPage, setTrabajosPerPage] = useState(10)
  const [consulta, setConsulta] = useState(['recibido', '', 'zona', '', 'proyecto', '', 'contratista', '', 'especialidad', '', 'estatus', '', 'archivo', ''])

  useEffect(() => {
    setLoading(true)
    getAllTrabajos().then(res => {
      setTrabajosExtra(res)
      setLoading(false)
    })
  }, [])

  const optionHandler = (event) => {
    parseInt(event.target.value) === 0 ? setTrabajosPerPage(trabajosExtra.length) : setTrabajosPerPage(parseInt(event.target.value))
  }

  //Get Current Contrato Page
  const indexOfLastTrabajo = currentPage * trabajosPerPage
  const indexOfFirstTrabajo = indexOfLastTrabajo - trabajosPerPage
  const currentTrabajo = trabajosExtra.slice(indexOfFirstTrabajo, indexOfLastTrabajo)

  //Filter Data
  const filterQuery = (dataQuery) => setTrabajosExtra(dataQuery) //
  const consultaQuery = (consultaq) => setConsulta(consultaq) //

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  if(currentPage < 1) setCurrentPage(1)
  else if(currentPage >  Math.ceil( trabajosExtra.length / trabajosPerPage )) setCurrentPage(Math.ceil( trabajosExtra.length / trabajosPerPage ))

  return(
    <>
      <div className='mx-4'>
        {loading ? <Spinner className='d-flex align-self-end'/> : <div> </div>}
        <table className='table table-striped table-bordered text-secondary mt-3'>
          <thead>
            <Header /> 
            <tr className='bg-blue-table'>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='recibido' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='zona' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta}  api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='proyecto' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='contratista' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='especialidad'consultaQuery={consultaQuery} filterQuery={filterQuery}  consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='estatus' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ trabajosExtra } query='archivo' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
            </tr>
          </thead>
          <tbody>
           <GetTrabajosExtra trabajos={ currentTrabajo } />
          </tbody>
        </table>
      </div>

      <section className='row mx-5 my-5'>
        <div className='col-md-5'>
          <select  className='form-select' style={{width: '5rem'}} onClick={optionHandler}>
            <option value='0'>All</option>
            <option value='10' selected >10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>

        <div className='col-md-2 align-self-center'>
          <PaginationData  dataPerPage={trabajosPerPage} totalData={trabajosExtra.length} currentPage={currentPage} paginate={paginate}/>            
        </div>

        <div className='col-md-5'>
          <p className='text-end'>Results {currentPage} - {Math.ceil( trabajosExtra.length / trabajosPerPage )} of {Math.ceil( trabajosExtra.length / trabajosPerPage )}</p>
        </div>
      </section>

    </>
  )
  
}