import {Schema, model} from "mongoose"

const userModel = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
})

export default model('User', userModel)