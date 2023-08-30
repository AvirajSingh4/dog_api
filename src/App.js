import React, { useState, useEffect } from 'react';
import './App.css';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [dogImages, setDogImages] = useState([]);
  const [dogSearch, setDogSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
 

  useEffect(() => {
    fetch('https://dog.ceo/api/breed/hound/images')
      .then(response => response.json())
      .then(data => {
        const imagesUrl=data.message.splice(1,10)
        const searchUrl=data.message
        setDogImages(imagesUrl);
        setFilteredImages(imagesUrl);
        setDogSearch(searchUrl)
      });
  }, []);

  const handleSearch = () => {
    const filtered = dogSearch.filter(searchUrl =>
      searchUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered.splice(1,10));
  };  

  const addToFavorites = imageUrl => {
    if (!favorites.includes(imageUrl)) {
      setFavorites([...favorites, imageUrl]);
    }
    
  };

  const removeFromFavorites = imageUrl => {
    const updatedFavorites = favorites.filter(favUrl => favUrl !== imageUrl);
    setFavorites(updatedFavorites);
    
  };

    const [favoriteClickedStates, setFavoriteClickedStates] = useState([]); 
    
    const toggleFavoriteClicked = index => {
    const updatedClickedStates = [...favoriteClickedStates];
    updatedClickedStates[index] = !updatedClickedStates[index];
    setFavoriteClickedStates(updatedClickedStates);
  };
  
  return (
    <div className="App">
      <div className='header'>
      <h1>Dog Breeds</h1>
      <FavoriteOutlinedIcon style={{height:"15px",width:"16.73px",color:"red",margin:"10px 4px 0px 0px"}} />
      </div><br/>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchIcon className='searchicon'/>
        <button className='btn btn-primary' onClick={handleSearch}>Search</button>
      </div>

      <div className="container1">
        {filteredImages.map((imageUrl, index) => (
            <div key={index} className="image-item">
            <img className='img' src={imageUrl} alt={`Dog ${index}`} />
            <FavoriteOutlinedIcon style={{height:"15px",width:"16.73px",color: favoriteClickedStates[index] ? "red" : "white",margin:"0px 20px 6px -20px"}}  
             onClick={() => {
                addToFavorites(imageUrl);
                toggleFavoriteClicked(index);
              }}/>
          </div>
        ))}
      </div>
          <hr/>
          <div className='header'>
          <FavoriteOutlinedIcon style={{height:"15px",width:"16.73px",color:"red",margin:"10px 20px 0px 0px"}} />
          <h1>Favorites</h1>
          </div>
          
          <div className="container1">
       
        {favorites.map((imageUrl, index) => (
          <div key={index} className="image-item">
          <img className='img' key={index} src={imageUrl} alt={`Favorite Dog ${index}`} />
          <FavoriteOutlinedIcon style={{height:"15px",width:"16.73px",color:"red",margin:"0px 20px 6px -20px"}} onClick={() => removeFromFavorites(imageUrl)}/>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
