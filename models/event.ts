import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location: string;
  createdAt?: Date;
  imageUrl: string;
  startDateTime?: Date;
  endDateTime?: Date;
  price?: string;
  isFree?: boolean;
  url?: string;
  category?: Types.ObjectId;
  organizer?: Types.ObjectId;
}

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    default: Date.now,
  },
  endDateTime: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
  category: {
    type: Types.ObjectId,
    ref: "category",
  },
  organizer: {
    type: Types.ObjectId,
    ref: "users",
  },
});

const eventModel = models.events || model("events", schema);

export default eventModel;
