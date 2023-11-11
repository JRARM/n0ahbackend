import { Schema, model,mongoose } from "mongoose";

const recordSchema = new Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    answers: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    session: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    unit: {
      type: Number,
      required: true
    },
    date_time: {
      type: Date,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    subsection: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    },
    seccion: {
      type: String,
      required: true
    },
    sub_seccion: {
      type: String,
      required: true
    }
  });

export const Record = model("Records", recordSchema);
