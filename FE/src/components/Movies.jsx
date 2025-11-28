import useFetch from "../useFetch"

const Movies = () => {
    
    const { data, loading, error } = useFetch('http://localhost:3001/movies')
    // console.log(data)

    return (
        <>
            {data?.map((movie) => (
                <div key={movie._id}>
                    <h2>{movie.title}</h2>
                </div>
            ))}
        </>
    )
}

export default Movies