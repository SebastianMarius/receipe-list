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

    useEffect(() => {
        const storedLikedRecipes = JSON.parse(localStorage.getItem('likedRecipes'));
        if (storedLikedRecipes)   setLikedRecipes(storedLikedRecipes);

    }, []);

    useEffect(() => {
        if (likedRecipes.length > 0) {
            const storedLikedRecipes = JSON.parse(localStorage.getItem('likedRecipes')) || [];


            const updateRecipes = [...likedRecipes, ...storedLikedRecipes];
            const uniqueRecipes = Array.from(new Set(updateRecipes));

            localStorage.setItem('likedRecipes', JSON.stringify(uniqueRecipes));
            console.log(uniqueRecipes);
        }
    }, [likedRecipes]);


    return (
      <Router>
          <Routes>
              <Route path="/" element={<SearchPage setLikedRecipes={setLikedRecipes} likedRecipes={likedRecipes}/>} />
              <Route path="/recipe/:recipeName" element={<RecipeDetailPage   setLikedRecipes={setLikedRecipes} likedRecipes={likedRecipes}   />} />
          </Routes>
      </Router>


  );
}

export default App;
