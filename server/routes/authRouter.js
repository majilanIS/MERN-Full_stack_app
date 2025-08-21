import express from 'express'
import { isAuthonticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controller/authController.js'
import userAuth from '../middleware/userAuth.js'

const authRouter = express()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRouter.post('/send-account', userAuth, verifyEmail)
authRouter.post('/is-auth', userAuth, isAuthonticated)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)

export default authRouter;