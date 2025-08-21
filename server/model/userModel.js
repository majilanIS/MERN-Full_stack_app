import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //the user data
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    
    //user verification
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    
    //is account is verify or not 
    isAccountVerified: { type: Boolean, default: false },
    
    //reset account
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: {type: Number, default: 0}
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;