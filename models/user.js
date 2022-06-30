const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      verified: {
        type: Boolean,
        default: false
      },
      resetLink: {
        type: String,
        default: ''
      }
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);