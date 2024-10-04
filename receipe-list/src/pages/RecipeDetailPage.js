import React, { useState, useEffect } from 'react';
import '../styling/recipeDetailsPage.scss'
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

export const RecipeDetailPage = (props) => {
    const [recipe, setRecipe] = useState(null); // State to store the recipe
    const [recipePhoto, setRecipePhoto] = useState(null);

    const {setLikedRecipes, likedRecipes} = props;

    const handleLikeRecipe = (newLikedRecipe, e) => {
        e.stopPropagation();

        setLikedRecipes(prevLikedRecipes => {

            if (prevLikedRecipes.includes(newLikedRecipe)) {
                const updatedRecipes = prevLikedRecipes.filter(recipe => recipe !== newLikedRecipe);
                return updatedRecipes;
            } else {
                const updatedRecipes = [...prevLikedRecipes, newLikedRecipe];
                return updatedRecipes;
            }
        });
    };

    useEffect(() => {
        // Retrieve the stored recipe data from localStorage
        const storedRecipe = localStorage.getItem('currentRecipe');
        const storedPhoto = localStorage.getItem('currentRecipePhoto');

        console.log(storedPhoto, ' stored photo')

        if (storedRecipe) {
            setRecipe(JSON.parse(storedRecipe));
            setRecipePhoto(storedPhoto);
        }
    }, []);

    if (!recipe) {
        return <div>Loading recipe details...</div>;
    }

    return (
        <div>
          <div className="main-details">
              <div className="container photo-container">
                  <img src={recipePhoto} height={300} width={300}/>
              </div>
              <div className="container description">
                  <div className="general-data">
                      <h4>{recipe.recipeName}</h4>
                      <p>{recipe.cookingTime}</p>
                  </div>
                  <div className="recipe-favorite-btn">
                      {  likedRecipes?.includes(recipe.recipeName)  ? <IoMdHeart  size={28} /> :  <CiHeart size={28} onClick={(e)=> handleLikeRecipe(recipe.recipeName, e)}/> }
                  </div>

              </div>
          </div>

            <div className="description-details ">
                <div className="incredients container">
                    <div className="ingredients-text">Ingredients: </div>
                    <ul>
                        {recipe.recipeIngredients.map((ingredient) =>
                            <li>{ingredient}</li>
                        )}
                    </ul>

                </div>
                <div className="instructions container ">
                    <div className="ingredients-text"> Instructions</div>
                    <div className="container preparation-instructions">{recipe.recipeInstructions.split('\n').map((instruction)=> <div>{instruction}</div>)}</div>
                </div>
            </div>
        </div>
    );
};
