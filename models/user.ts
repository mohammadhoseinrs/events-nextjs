import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  image: string;
  password:string
}

type UserModelType = Model<IUser>;
const schema = new Schema<IUser>(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    password:{
      type:String
    }
  },
  { timestamps: true, versionKey: false }
);

const UserModel: UserModelType = models.users || model<IUser>("users", schema);

export default UserModel;
