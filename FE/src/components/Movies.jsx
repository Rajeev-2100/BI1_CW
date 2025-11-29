import { useState } from "react"
import useFetch from "../useFetch"

const Movies = () => {
    const [successMessage, setSuccessMessage] = useState('')
    const { data, loading } = useFetch('http://localhost:3001/movies')
    // console.log(data)

    const handleDelete = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:3001/movies/${movieId}`,{
                method: 'DELETE',
            })
            if(!response.ok){
                throw "Failed to delete Movie"
            }

            const data = await response.json()
            if(data){
                setSuccessMessage('Movie Delete successfully')
                window.location.reload()
            }

        } catch (error) {
           console.log(error)
        }
    }

    return (
        <>
        {loading && <p>Loading...</p>}
        {data?.error && <p>{data?.error}</p>}
        <ul>
       {data?.map((movie) => (
           <li key={movie._id}>
                    <h2>{movie.title} <button onClick={() => handleDelete(movie._id)}>Delete</button></h2> 
           </li>
       ))}
       </ul>
        <p>{successMessage}</p>
        
        </>
    )
}

export default Movies