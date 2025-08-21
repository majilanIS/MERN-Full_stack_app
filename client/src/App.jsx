import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home/> } />
          <Route path='/login' element={<Login/> } />
          <Route path='/email-verify' element={<EmailVerify/> } />
          <Route path='/reset-password' element={<ResetPassword/> } />
       </Routes>
    </div>
  )
}

export default App


// import { ToastContainer } from 'react-toastify';

// function App() {
//   return (
//     <>
//       {/* Your Routes or Components */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000} // closes after 3s
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// }

// export default App;
