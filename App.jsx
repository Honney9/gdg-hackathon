import Signin from "./components/Signin"
import Signup from "./components/Signup"
import { Button } from "./components/ui/Button"
import { useNavigate } from "react-router-dom"

function App() {

  const navigate= useNavigate();

  return (
    <>
      <h1>Landing Page</h1>
      <Button
        type="submit"
        onClick={()=>{
          navigate("/signin")
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mt-4"
      >
        Sign In
      </Button>
      <Button
        type="submit"
        onClick={()=>{
          navigate("/signup")
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mt-4"
      >
        Sign up
      </Button>
    </>
  )
}

export default App
