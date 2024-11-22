const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //check if installed
const validator = require('validator'); //check if installed

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.login = async function ( email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format');
    }
    
    const user = await this.findOne({ email });
    
      if (!user) {
        throw Error('No user found with this email');
      }
    
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        throw Error('Incorrect password, try again');
    }

    return user;

}
userSchema.statics.signUp = async function (email, password) {

    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password must include uppercase, lowercase, numbers and symbols')
    }
    
    const exists = await this.findOne({email});

    if(exists) {
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hashedPassword,
    });

    return user;

};

module.exports = mongoose.model('User', userSchema);