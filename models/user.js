const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Email is Invalid, Try Again");
          }
        }
    },
    contact: {
      type: Number,
      validate: {
          validator: function(v) {
              return /^[7-9][0-9]{9}$/.test(v);
          },
          message: '{VALUE} is not a valid 10 digit number!'
      }
  }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);
