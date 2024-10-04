import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import '../styling/recipeCard.scss'
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

export const RecipeCard = (props) => {
    const { recipe, recipesPhoto, setLikedRecipes, likedRecipes, displayLikedReceipes } = props

    const navigate = useNavigate(); // Initialize navigate hook

    const handleCardClick = () => {
        localStorage.setItem('currentRecipe', JSON.stringify(recipe));
        localStorage.setItem('currentRecipePhoto', recipesPhoto);
        navigate(`/recipe/${recipe.recipeName}`);
    };


    const handleAddToFavorite = (recipe,e) => {
        e.stopPropagation();
        setLikedRecipes({...recipe});
    }

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

                {displayLikedReceipes.some(likedRecipe => likedRecipe.recipeName === recipe.recipeName) ? (
                    <IoMdHeart size={28} color="#65558F"/>
                ) : (
                    <CiHeart size={28} onClick={(e) => handleAddToFavorite(recipe, e)} />
                )}


            </div>

        </div>
    )

}