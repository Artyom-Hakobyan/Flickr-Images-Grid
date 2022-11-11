import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import '../App.css';
// import ImageGallery from 'react-image-gallery'

const SearchForm = () => {
    const [input, setInput] = useState("")
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${input}&per_page=24&format=json&nojsoncallback=1`)
            .then(response => response.json())
            .then((response) => {
                let imgArray = response.photos.photo.map((img) => {
                    let srcPath = "https://farm" + img.farm + ".staticflickr.com/" + img.server + "/" + img.id + "_" + img.secret + ".jpg";
                    return (
                        <img alt="car" src={srcPath} key={uuidv4()} className="gallery__img"></img>
                    )
                })
                setImages(imgArray)
            })
    }

    console.log(images)

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} style={{ margin: "30px" }}>
                    <input
                        className='input'
                        type="text"
                        placeholder='Search for Images here . . . '
                        value={input}
                        name="text"
                        onChange={handleChange}
                    />
                    <button className="button-30">Search</button>
                </form>
            </div>
            <div className='gallery'>
                {images}
            </div>
        </>
    );
};

export default SearchForm;