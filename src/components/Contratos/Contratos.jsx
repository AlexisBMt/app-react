import React, { useEffect, useState } from 'react'
import { contratos_data } from '../../helpers/contratos_data'
import PaginationData from '../Pagination/PaginationData'
import GetContratos from './GetContratos'
import { getAllContratos } from '../../services/Fetch_doc_tecnica'
import Filtro from '../Filtro/Filtro'
import Header from './Header'
import Spinner from '../Spinner/index'

const API_URL = 'http://127.0.0.1:8000/api/doc-tecnica-all';

export default function Contratos() {
  const [contratos, setContratos] = useState(contratos_data)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [contratosPerPage, setContratosPerPage] = useState(10)
  const [consulta, setConsulta] = useState(['recibido', '', 'proyecto', '', 'contratista', '', 'especialidad', '', 'contratista_objeto', '', 
                                            'registro_patronal', '', 'num_aprox_trabajadores', '', 'monto_obra', '', 'fecha_inicio', '',
                                            'fecha_termino', '', 'subcontrata', '', 'comentarios', '', 'estatus', '', 'archivo', ''])


  useEffect(() => {
    setLoading(true)   
    getAllContratos().then(res => {
      setContratos(res)
      setLoading(false)
    })
  }, [])

  const optionHandler = (event) => {
    parseInt(event.target.value) === 0 ? setContratosPerPage(contratos.length) : setContratosPerPage(parseInt(event.target.value))
  }

  //Get Current Contrato Page
  const indexOfLastContrato = currentPage * contratosPerPage
  const indexOfFirstContrato = indexOfLastContrato - contratosPerPage
  const currentContrato = contratos.slice(indexOfFirstContrato, indexOfLastContrato)

  //Filter Data
  const filterQuery = (dataQuery) => setContratos(dataQuery) //
  const consultaQuery = (consultaq) => setConsulta(consultaq) //

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  if(currentPage < 1) setCurrentPage(1)
  else if(currentPage >  Math.ceil( contratos.length / contratosPerPage )) setCurrentPage(Math.ceil( contratos.length / contratosPerPage ))

  return(
    <>
      <div className='mx-4'>
        {loading ? <Spinner className='d-flex align-self-end'/> : <div> </div>}
        <table className='table table-striped table-bordered text-secondary mt-3'>
          <thead>
            <Header />
            <tr className='bg-blue-table' >
              <th>{loading ? null : <Filtro datos={ contratos } query='recibido' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='proyecto' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='contratista' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='especialidad' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='contratista_objeto' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='registro_patronal' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='num_aprox_trabajadores' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='monto_obra' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='fecha_inicio' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='fecha_termino' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='subcontrata' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='comentarios' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='estatus' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
              <th>{loading ? null : <Filtro datos={ contratos } query='archivo' consultaQuery={consultaQuery} filterQuery={filterQuery} consulta={consulta} api_url={API_URL} />}</th>
            </tr>

          </thead>
          <tbody>
              <GetContratos contratos={currentContrato}/>
          </tbody>
        </table>
      </div>

      <section className='row mx-5 my-5'>
        <div className='col-md-5'>
          <select  className='form-select' style={{width: '5rem'}} onClick={optionHandler}>
            <option value='0'>All</option>
            <option value='10' selected>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
        </div>

        <div className='col-md-2 align-self-center'>
          <PaginationData  dataPerPage={contratosPerPage} totalData={contratos.length} currentPage={currentPage} paginate={paginate}/>            
        </div>
              
        <div className='col-md-5'>
          <p className='text-end'>Results {currentPage} - {Math.ceil( contratos.length / contratosPerPage )} of {Math.ceil( contratos.length / contratosPerPage )}</p>
        </div>
      </section>

    </>
  )
}