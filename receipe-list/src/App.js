import logo from './logo.svg';
import './App.css';
import { apiKey } from "./apiConfig";
import {pexelKey} from "./apiConfig";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {content} from "./content";
import './styling/general.scss'
import {SearchPage} from "./pages/SearchPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {RecipeDetailPage} from "./pages/RecipeDetailPage";

function App() {
const [likedRecipes, setLikedRecipes] = useState([]);
const [displayLikedReceipes, setdisplayLikedReceipes] = useState();

    useEffect(() => {
        const storedLikedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
        if(Object.keys(storedLikedRecipes).length > 0)
         setLikedRecipes(...storedLikedRecipes);
    }, []);

    useEffect(() => {
        if (Object.keys(likedRecipes).length > 0) {
            const storedLikedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];
            const recipesArray = Array.isArray(storedLikedRecipes) ? storedLikedRecipes : [storedLikedRecipes];
            const updatedRecipes = [...recipesArray, likedRecipes];

            const uniqueRecipes = updatedRecipes.reduce((acc, recipe) => {
                if (!acc.some(existingRecipe => existingRecipe.recipeName === recipe.recipeName)) {
                    acc.push(recipe);
                }
                return acc;
            }, []);

            localStorage.setItem('likedRecipes', JSON.stringify(uniqueRecipes));
            setdisplayLikedReceipes(uniqueRecipes);
        }
    }, [likedRecipes]);

    return (
      <Router>
          <Routes>
              <Route path="/" element={<SearchPage setLikedRecipes={setLikedRecipes} likedRecipes={likedRecipes}  displayLikedReceipes={displayLikedReceipes}/>} />
              <Route path="/recipe/:recipeName" element={<RecipeDetailPage   setLikedRecipes={setLikedRecipes} likedRecipes={likedRecipes}  displayLikedReceipes={displayLikedReceipes}  />} />
          </Routes>
      </Router>


  );
}

export default App;
