import { useState } from "react";
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }

  
  return (
    <div className="flex flex-col items-center justify-center w-screen sm:w-96 sm:mx-auto">
      <div className="w-full p-6 sm:rounded-lg bg-secondary">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Login <span className="text-info">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

          <input type="text" name="username" id="username" className="input w-full bg-accent" placeholder="Username"
          onChange={(e)=>{ setUsername(e.target.value) }} />

          <input type="password" name="password" id="password" className="input w-full bg-accent" placeholder="Password"
          onChange={(e)=>{ setPassword(e.target.value) }} />

          <Link to='/signup' className="link link-info">
            Or create a new account
          </Link>
          <button type="submit" className="btn btn-info text-white w-32 m-auto" disabled={loading}>
            {
              loading?
              <span className="loading loading-spinner"></span>
              :
              "Login"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login