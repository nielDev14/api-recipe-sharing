const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const recipes = [
    {
        id: 1,
        name: "Chicken Adobo",
        ingredients: [
            "1 kilogram chicken cut ups",
            "2 tbsp canola oil",
            "6 cloves garlic crushed",
            "1 pc onion, sliced",
            "2 tbsp vinegar",
            "1/4 cup soy sauce",
            "1 cup water",
            "2 pcs bay leaves",
            "1 tsp whole black peppercorns, slightly crushed",
            "2 pc Knorr chicken cubes",
            "1 tsp brown sugar packed",
        ],
        steps: [
            "1. Heat oil in pan and sauté garlic and onions. Then add chicken to the pan and sear on all sides, until you have a little browning in the chicken skin.",
            "2. Pour in vinegar, soy sauce and water. Add bay leaves, pepper and Knorr Chicken Cubes. Bring to a boil over high heat then reduce heat to simmer, but do not cover the pan. Continue to simmer for 10 mins.",
            "3. Remove chicken pieces from sauce and fry in another pan until nicely browned.",
            "4. Put back fried chicken pieces into sauce. Add sugar and let simmer again for another 10 minutes or until sauce has thickened. Serve warm.",
        ],
        tag: "Filipino",
    },
    {
        id: 2,
        name: "Tinola",
        ingredients: [
            "1 tbsp cooking oil",
            "1 pc onion, small -sized, chopped",
            "2 cloves garlic, chopped",
            "1 pc ginger, cut into strips",
            "1/2 kilo chicken, cut into 8 pcs",
            "4 cups water",
            "2 pcs Knorr chicken cubes",
            "1 pc chayote or 1 pc small - sized green papaya, sliced",
            "2 stalks moringa leaves",
        ],
        steps: [
            "1. Get a pot and bring it up to medium heat before pouring in the oil. Drop in the onions, garlic and ginger and sauté slowly for about 2 minutes or until you can smell the lovely aroma.",
            "2. It’s time to drop in the chicken pieces and stir until it turns white or light brown in color.",
            "3. Pour in the water and add your Knorr Chicken Broth cubes. Bring this to a simmer until chicken is tender and cooked through.",
            "4. You can now add your sayote or green papaya and cook until tender.",
            "5. Dahon ng sili is added at the last stage to ensure leaves (and nutrients) don’t dry up. Give this a minute then it is done. Malunggay is also another healthy alternative because it is packed with vitamins and minerals which are good for nursing moms and kids as well.",
            "6. Enjoy this with patis and calamansi on the side. See the faces of your whole family light up as you bring this to the table."
        ],
        tag: "Filipino",
    },
    {
        id: 3,
        name: "Buffalo Wings",
        ingredients: [
            "8 chicken wings or 16 drumettes and wing pieces",
            "4 cups canola, vegetable, or peanut oil, for frying",
            "2 tablespoons hot sauce, such as Frank's Red Hot or Louisiana",
            "1 1/2 tablespoons unsalted butter, plus more if needed",
            "1/2 teaspoon distilled vinegar",
            "Brown sugar, to taste",
            "Kosher salt, to taste",
            "Blue cheese dressing, ranch dressing, or garlic Parmesan dip, for serving",
        ],
        steps: [
            "1. Gather the ingredients.",
            "2. Remove the tips from the wings and reserve for making chicken stock.",
            "3. Cut the joint between the drumette and the flat portion of the wings. Pat the wings dry with paper towels—this will ensure they fry up crispy, and there will be less spatter from water hitting the hot oil.",
            "4. Heat 3 inches of oil in a deep pan to 375 F.",
            "5. Meanwhile, in a small separate saucepan, combine the hot sauce, butter, and vinegar over low heat until the butter melts.",
            "6. Taste the sauce to see if it's to your liking. If you'd like to reduce the heat of the sauce, feel free to add more butter, a little water, or some brown sugar. To increase the heat, add more hot sauce. Add salt if needed.",
            "7. Fry the wings in 2 to 3 batches for 12 to 15 minutes per batch, or until crispy and cooked through. Give the oil time to reheat before frying the next batch to ensure all of the wings are crispy.",
            "8. Toss the wings in a bowl with the warm sauce.",
            "9. Serve with blue cheese dressing, ranch dressing, or garlic Parmesan dip. Enjoy.",
        ],
        tag: "American",
    }
]

// GET /recipes - get all recipes
app.get('/', (req, res) => {
    res.send(recipes);
});

app.get('/api/recipes', (req, res) => {
    res.send(recipes);
});

//GET a certain recipe
app.get('/api/recipes/:id', (req, res) => {
    const schema = Joi.object({
        id: Joi.number().integer().required(),
    });

    const { error } = schema.validate(req.params);
    if (error)
    return res.status(404).send(error.details[0].message);

    const id = req.params.id;
    const recipe = recipes.find((c) => c.id === parseInt(id));
    if (!recipe) 
    return res.status(404).send({message: "Recipe not found"});

    res.send(recipe);
});

//POST Request
app.post('/api/recipes/create', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        steps: Joi.array().items(Joi.string()).required(),
        tag: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
    return res.status(404).send(error.details[0].message);

    const newRecipe = {
        id: recipes.length + 1,
        name: req.body.name,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        tag: req.body.tag,
    };

    recipes.push(newRecipe);
    res.send(newRecipe);
});

//PUT Request
app.put('/api/recipes/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find((c) => c.id === id);
    if (!recipe) 
    return res.status(404).send({message: "Recipe not found"});

    const schema = Joi.object({
        name: Joi.string().required(),
        ingredients: Joi.array().items(Joi.string()).required(),
        steps: Joi.array().items(Joi.string()).required(),
        tag: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
    return res.status(404).send(error.details[0].message);

    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    recipe.tag = req.body.tag

    res.send(recipe);
});

//DELETE Request
app.delete('/api/recipes/delete/:id' , (req,res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find((c)  => c.id === id);

    if (!recipe)
    return res.status(404).send({message: "Recipe not found"});

    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1)

    res.send(recipe);
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}...`);
});