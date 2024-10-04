import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import '../styling/recipeCard.scss'
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

export const RecipeCard = (props) => {
    const { recipe, recipesPhoto, setLikedRecipes, likedRecipes } = props

    const navigate = useNavigate(); // Initialize navigate hook


    const handleCardClick = () => {

        localStorage.setItem('currentRecipe', JSON.stringify(recipe));
        localStorage.setItem('currentRecipePhoto', recipesPhoto);
        navigate(`/recipe/${recipe.recipeName}`);
    };

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
        const likedRecipes = localStorage.getItem('likedReceipes');
    }, []);

    return(
        <div className="container recipe-card" onClick={handleCardClick}>
            <div className="recipe-photo">
                <img src={recipesPhoto} height={88}/>
            </div>
            <div className="recipe-details">
                <h4>{recipe.recipeName}</h4>
                <p>{recipe.cookingTime}</p>
            </div>
            <div className="recipe-favorite-btn">
                {likedRecipes?.includes(recipe.recipeName) ? <IoMdHeart size={28}/> : <CiHeart size={28} onClick={(e) => handleLikeRecipe(recipe.recipeName, e)}/>}
            </div>

        </div>
    )

}