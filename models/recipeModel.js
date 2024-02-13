const { string } = require('joi');
const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a recipe']
        },
        ingredients: {
            type: Array,
            required: [true, 'Enter the ingredients']
        },
        steps: {
            type: Array,
            required: [true, 'Enter the steps']
        },
        tag: {
            type: String,
            required: [true, "Enter tag"]
        }
    },
    {
        timestamps: true
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;