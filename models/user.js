const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");


const user = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  {versionKey: false, timestamps: true},
);

const Model = mongoose.model("user", user);

const registerJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  Model,
  registerJoiSchema,
  loginJoiSchema,
};
