import { Schema } from 'mongoose';

const newsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default newsSchema;
