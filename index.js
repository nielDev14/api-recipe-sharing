const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/recipeModel");
require("dotenv").config();

const app = express();
const Joi = require("joi");
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

//POST
app.post("/recipe", async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});

//GET
app.get("/recipe", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Recipe not found" });
  }
});

//GET by ID
app.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Recipe not found" });
  }
});

//PUT
app.put("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body);
    if (!recipe) {
      return res
        .status(404)
        .send({ message: `Cannot update Recipe with the given ID ${id}` });
    }
    const updatedRecipe = await Recipe.findById(id);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "an error occured" });
  }
});

//DELETE
app.delete("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res
        .status(404)
        .send({ message: `Cannot update Recipe with the given ID ${id}` });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    const port = process.env.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}...`);
    });

    console.log("Connected to database");
  })
  .catch(() => {
    console.log(error);
  });
