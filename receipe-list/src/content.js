export const content = {
    beforeInputPrompt : 'Please provide the following: ',
    afterInputPrompt : ' in the following JSON format without any additional text, remove ```json from response if exists',
    jsonResponseFormat :  ` [
        {
            "recipeName": "String",
            "recipeInstructions": "String",
            "recipeIngredients": ["String"],
            "cookingTime": "String",
            "receipePhoto" : "null"
        }
    ] `,
    searchInputPlaceholder : 'What do you feel like eating?'
}