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
  isGoogle:{
    type: Boolean,
    default: false,
  },
  role:{
    type:String,
    enum: ['ADMIN', 'PREMIUM','CLIENT'],
    default: 'CLIENT',
  }
});

export const userModel = mongoose.model('User',userSchema)