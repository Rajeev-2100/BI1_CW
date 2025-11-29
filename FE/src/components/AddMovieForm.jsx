import { useState } from "react";

const AddMovieForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        releaseYear: '',
        genre: '',
        director: '',
        actors: '',
        language: '',
        country: '',
        rating: '',
        plot: '',
        awards: '',
        posterUrl: '',
        trailerUrl: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState, [name]: name === 'releaseYear' || name === 'rating' ? parseInt(value) : value,
        }))
    }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        const response = await fetch('http://localhost:3001/movies', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw error
        }

        const data = await response.json()

        console.log("Added Movies Data", data)
    } catch (error) {
        throw error
    }
  }

  return (
    <>
      <h2>Add New Movie</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title: </label>
        <br />
        <input type="text" name="title" value={formData.title} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Release Year: </label>
        <br />
        <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Genre: </label>
        <br />
        <input type="text" name="genre" value={formData.genre} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Director: </label>
        <br />
        <input type="text" name="director" value={formData.director} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Actors: </label>
        <br />
        <input type="text" name="actors" value={formData.actors} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Language: </label>
        <br />
        <input type="text" name="language" value={formData.language} onChange={handleChange}/>
        <br />
        <br />
        <label htmlFor="">Country: </label>
        <br />
        <input type="text" onChange={handleChange} value={formData.country} name="country"/>
        <br />
        <br />
        <label htmlFor="">Rating: </label>
        <br />
        <input type="number" onChange={handleChange} value={formData.rating} name="rating"/>
        <br />
        <br />
        <label htmlFor="">Plot: </label>
        <br />
        <input type="text" onChange={handleChange} value={formData.plot} name="plot"/>
        <br />
        <br />
        <label htmlFor="">Awards: </label>
        <br />
        <input type="text" onChange={handleChange} value={formData.awards} name="awards"/>
        <br />
        <br />
        <label htmlFor="">Poster URL: </label>
        <br />
        <input type="text" onChange={handleChange} value={formData.posterUrl} name="posterUrl"/>
        <br />
        <br />
         <label htmlFor="">Trailer URL: </label>
        <br />
        <input type="text" onChange={handleChange} value={formData.trailerUrl} name="trailerUrl"/>
        <br />
        <br />
        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default AddMovieForm;
