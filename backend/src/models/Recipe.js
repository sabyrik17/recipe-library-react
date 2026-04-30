const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
      validate: [(value) => value.length > 0, "At least one ingredient is required."],
    },
    steps: {
      type: [String],
      required: true,
      validate: [(value) => value.length > 0, "At least one step is required."],
    },
    isCustom: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.createdAt = returnedObject.createdAt;
        delete returnedObject._id;
        delete returnedObject.__v;
        return returnedObject;
      },
    },
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
