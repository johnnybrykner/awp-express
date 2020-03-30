/**** External libraries ****/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const models = require("./db");

/**** Configuration ****/
const appName = "Otack Sverflow";
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());

(async (_) => {
  try {
    const url = process.env.CONNECTION_STRING;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Success!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
})();

/**** Routes ****/
app.get("/posts", async (req, res) => res.json(await models.Question.find({})));

app.post("/posts", async (req, res) => {
  try {
    const newPost = new models.Question({
      ...req.body,
    });
    await newPost.save();
  } catch (error) {
    console.error(error);
  }
  res.json(await models.Question.find({}));
});

app.put("/posts/:id", async (req, res) => {
  try {
    let toBeUpdated = await models.Question.findByIdAndUpdate(
      req.params.id,
      new models.Question({
        ...req.body,
      })
    );
    await toBeUpdated.save();
  } catch (error) {
    console.error(error);
  }
  res.json(await models.Question.find({}));
});

app.listen(port, () =>
  console.log(`${appName} API launching on port ${port}!`)
);
