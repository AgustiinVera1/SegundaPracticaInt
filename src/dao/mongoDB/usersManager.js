import { userModel } from "../models/user.model.js";

class UsersManager{
  async findById(id){
    const user = await userModel.findById(id);
    return user;
  }

  async findByEmail(email){
    const user = await userModel.findOne({email});
    return user;
  }

  async createOne(obj){
    const user = await userModel.create(obj);
    return user;
  }
}

export const usersManager = new UsersManager();