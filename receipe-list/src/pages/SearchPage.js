import {content} from "../content";
import {IoIosSearch} from "react-icons/io";
import {RecipeCard} from "../components/RecipeCard";
import {useState} from "react";
import {apiKey, pexelKey} from "../apiConfig";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { IoMdClose } from "react-icons/io";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const fetchPhotosForRecipes = async (recipes) => {

    const photoPromises = recipes.map(async (recipe) => {
        const apiResponse = await fetch(`https://api.pexels.com/v1/search?query=${recipe}&per_page=1`, {
            headers: {
                'Authorization': pexelKey
            }
        });
        const jsonResp = await apiResponse.json();
        return jsonResp.photos[0]?.src.medium;
    });

    const photos = await Promise.all(photoPromises);
    return photos;
}

const getReceipes = async (getReceipes) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = content.beforeInputPrompt + '5 cake recipes' + content.afterInputPrompt + content.jsonResponseFormat;


    const result = await model.generateContent(prompt);
    return result.response.text();
};

const searchBtnClick = async (userSearch, setReceipes, setRecipesPhoto, setLoading) => {
    if (userSearch.length <= 5) return;
    console.log(userSearch);
    setLoading(true);

    const receipeDetails = await getReceipes(userSearch);

    console.log(receipeDetails)
    const recipesName = JSON.parse(receipeDetails).map((e) => e.recipeName);

    let recipesPhotos;
    if (recipesName) {
        recipesPhotos = await fetchPhotosForRecipes(recipesName);
        setRecipesPhoto(recipesPhotos);
    }


    setReceipes(JSON.parse(receipeDetails));

};

export const SearchPage = (props) => {
    const [receipes, setReceipes] = useState("");
    const [recipesPhoto, setRecipesPhoto] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const { setLikedRecipes, likedRecipes } = props;

    const handleKeyDown = (e) => {
        if(e.key === 'Enter')
            searchBtnClick(userSearch, setReceipes, setRecipesPhoto, setLoading)

    }

    const handleInputReset = () => {
        setUserSearch('');
    }

    return(
        <div className="App">
            <div className="container input-container">
                <input placeholder={content.searchInputPlaceholder} className="search-input"
                       value={userSearch}
                       onKeyDown={(e) => handleKeyDown(e)}
                       onChange={(e) => setUserSearch(e.target.value)}/>

                <button className="search-button"
                        onClick={() => searchBtnClick(userSearch, setReceipes, setRecipesPhoto, setLoading)}>
                    {userSearch ? <IoMdClose onClick={handleInputReset} color="#1E1E1E" size={20} style={{marginTop:'6px'}}/> : <IoIosSearch size={20} width={16} height={16} color="#1E1E1E"/>}
                </button>

            </div>


            { receipes && <h1 className="suggested-receipes">Suggested receipes</h1>}

            <div>{receipes ? receipes.map((e, index) => <RecipeCard recipe={e}
                                                                    likedRecipes={likedRecipes}
                                                                    setLikedRecipes = {setLikedRecipes}
                                                                    recipesPhoto={recipesPhoto[index]}/>) : loading && <Skeleton count={5} className="skeleton-styling" />}</div>

            { receipes && <button className="other-results-btn">I don't like these</button>}
        </div>
    )


}