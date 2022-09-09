export function getAllContratos() {
  return fetch('http://127.0.0.1:8000/api/doc-tecnica-all')
  .then( res => res.json() )
}

export function getAllTrabajos() {
  return fetch('http://127.0.0.1:8000/api/doc-tecnica-trabajosExtra')
  .then( res => res.json() )
}