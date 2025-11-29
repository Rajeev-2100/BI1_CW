import Movies from './components/Movies.jsx'
import MovieByTitle from './components/MovieByTitle.jsx'
import AddMovieForm from './components/AddMovieForm.jsx'

function App() {

  return (
   <>
      <AddMovieForm />
      <Movies/>    
      <MovieByTitle title='Lagaan'/> 
   </>
  )
}

export default App
