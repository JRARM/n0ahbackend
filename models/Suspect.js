import { Schema, model } from "mongoose";

const suspectSchema = new Schema({
  course: { type: String, required: true, trim: true },
  sospechosos: [
    {
      username: { type: String, trim: true },
    },
  ],
});

export const Suspect = model("Suspect", suspectSchema);
