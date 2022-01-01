import React, { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';

function App() {
  const App_ID = "a4eb5686";
  const App_kEY = "878787ac51c8692ec963451680914045";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_kEY}`);
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  return (
    <div className='App'>
      <form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch}/>
        <button type='submit'>Search a recipe</button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         />
      ))}
    </div>
  );
}

export default App;
