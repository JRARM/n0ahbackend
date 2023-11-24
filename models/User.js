import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema({
  name: {type:String},
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },role:{
    type: Boolean
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);
