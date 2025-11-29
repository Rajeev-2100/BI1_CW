import useFetch from "../useFetch"

const MovieByTitle = ({ title }) => {

    const { data, loading, error } = useFetch(`http://localhost:3001/movies/${title}`)
    
    return (
        <>
            {data ? (
                <div>
                    <h4>{data.title}</h4>
                    <p>Director: {data.director}</p>
                    <p>Country: {data.country}</p>
                    <p>ReleaseYear: {data.releaseYear}</p>
                    <p>Rating: {data.rating}</p>
                    <p>Actors: {data.actors.join(', ')}</p>
                    <p>Awards: {data.awards}</p>
                    <p>Plot: {data.plot}</p>
                    <img src={data.posterUrl} alt="Poster Image" />
                </div>
            ) : (
                loading && <p>Loading...</p>
            )}
        </>
    )
}

export default MovieByTitle