const mongoose = require("mongoose");
const { Schema } = mongoose;
//schema
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
    required: true,
  },
  password: { type: String, minLength:  6, required: true },
  token: { type: String },
});

//model creation
exports.User = mongoose.model("User", userSchema);
