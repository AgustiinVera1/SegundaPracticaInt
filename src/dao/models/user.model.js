import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true,
  },
  last_name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
  },
  Administrador:{
    type: String,
  },
  isGithub:{
    type: Boolean,
    default: false,
  },
});

export const userModel = mongoose.model('User',userSchema)