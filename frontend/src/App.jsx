import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"
import { ConversationContextProvider } from "./context/ConversationContext.jsx"

function App() {
  const { authUser } = useAuthContext();

  
  return (
    <div className="min-h-screen bg-secondary sm:bg-transparent flex items-center justify-center text-white">
      <Routes>
        <Route path="/" element={
          authUser?
          <ConversationContextProvider>
            <Home />
          </ConversationContextProvider>
          : 
          <Navigate to={"/login"} />
          } />
        <Route path="/login" element={authUser? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={authUser? <Navigate to={"/"} /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
