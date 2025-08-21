import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../model/userModel.js'
import transporter from '../config/nodeMailer.js'

// REGISTER
export const register = async (req, res) => {
    //data entry
    const { name, email, password } = req.body

    //check the all data is correct
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    // is exist the user or not 
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }
       
        //hash the password
        const hashPassword = await bcrypt.hash(password, 10)

        //save the data on the database(mongoDB)
        const user = new userModel({ name, email, password: hashPassword })
        await user.save()
        
        //generating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        // Send Welcome Email
        try {
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to this website',
                text: `Welcome to this app: your account has been created with email id: ${email}`
            }
           const info = await transporter.sendMail(mailOptions)
            console.log("Message sent:", info.messageId)

        } catch (mailError) {
            console.error("Email sending failed:", mailError.message)
            // You can still return success here, don’t block registration
        }

        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {
        //is the user exist or not
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }
        //is the password matching or not
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        //generating token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// LOGOUT
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: 'Logged Out' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//sending OTP to verify
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body
        
        const user = await userModel.findById(userId)
        if (user.isAccountVerified) {
            return res.json({success: false, message: 'Account Already verified'})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()

        const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Account Verification OTP',
                text: `Welcome to this app: your account has been created with email id: ${user.email}`
        }
        await transporter.sendMail(mailOption)

        res.json({success: true, message: `Verification OTP sent on email ${user.email}`}) 
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
 
//verify email using the OTP
export const verifyEmail = async (req, res)=>{
    const { userId, otp } = req.body
    if (!userId || !otp) {
       return res.json({success: true, message: "Missing Details"}) 
    }
    try {
        const user = await userModel.findById( userId )
        if (!user) {
            return res.json({success: false, message: "User not found"})
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' })  
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP Expired'})
        }
        user.isAccountVerified = true
        user.verifyOtp = ''
        user.verifyOtpExpireAt = 0

        await user.save()
        return res.json({success: true, message: 'Email verified successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

//check if user is authonticated or not 
export const isAuthonticated = async (req, res) => {
    try {
        return res.json({success: true})
    } catch (error) {
      res.json({success: false, message: error.message})
    }
}

//send password reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.json({success: false, message: 'Email is required'})
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }
         const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000
        await user.save()

        const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Account Verification OTP',
                text: `Your OTP for resseting your password is ${otp} use this OTP to proceed with resseting your password`
        }
        await transporter.sendMail(mailOption)

        return res.json({success: true, message: 'OTP send to your email'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

//reseting the passowrd
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body
    
    if (!email || !otp || !newPassword) {
        return res.json({success: false, message: 'email, otp and new password are required'})
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        if (user.restOtp === "" || user.restOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'})
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message:'OTP Expired'})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword
        user.restOtp = ''
        user.resetOtpExpireAt = 0

        await user.save()
       return res.json({success: true, message: 'Password has been reset successfully'})
    } catch (error) {
       return res.json({success: false, message: error.message}) 
    }
}