import { useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    if (movies) {
      try { setSort(!sort) } catch (e) {
      }
    }
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>

      <header>
        <h1> Movies seeker</h1>
        <form className='from' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Matrix, etc...' />
          <button type='submit'>Buscar</button>
          <input className='check' type='checkbox' onChange={handleSort} checked={sort} alt='sort' />
          sort

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{
        loading ? <p>cargando...</p> : <Movies movies={movies} />
      }
      </main>

    </div>
  )
}

export default App
