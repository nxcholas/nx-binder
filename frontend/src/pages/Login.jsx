import Navbar from "../components/Navbar"
import MainContent from "../components/MainContent"
import LoginForm from "../components/LoginForm"

function Login() {
  return (
    <div>
      <Navbar />
      <MainContent>
        <LoginForm />
      </MainContent>
      </div>
  )
}
export default Login