import { useState } from "react";
import ProfilePics from "./ProfilePics"
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";


function Signup() {
  const [profilePic, setProfilePic] = useState('profilePic1.jpg');
  const [showingProfilePics, setShowingProfilePics] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await signup({...inputs, profilePic: profilePic})
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen sm:w-96 sm:mx-auto">
      <div className="w-full p-6 sm:rounded-lg bg-secondary">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Sign Up <span className="text-info">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex gap-x-4 ">
            <div className="relative" style={{ cursor: "pointer" }}>
              <img src={`/users/profilePics/${profilePic}`} className="w-16 rounded-full" onClick={()=>{setShowingProfilePics(true)}} />
              {showingProfilePics && <ProfilePics setProfilePic={setProfilePic} setShowingProfilePics={setShowingProfilePics}/>}
              <i className="fa-solid fa-paintbrush absolute bottom-0 left-9 sm:left-11 text-info"></i>
            </div>

            <input type="text" name="username" id="username" className="input w-full bg-accent" placeholder="Username"
            onChange={(e) => { setInputs({ ...inputs, username: e.target.value.trim() }) }} />
          </div>

          <input type="password" name="password" id="password" className="input w-full bg-accent" placeholder="Password"
          onChange={(e) => { setInputs({ ...inputs, password: e.target.value.trim() }) }} />

          <input type="password" name="confirmPassword" id="confirmPassword" className="input w-full bg-accent" placeholder="Confirm Password"
          onChange={(e) => { setInputs({ ...inputs, confirmPassword: e.target.value.trim() }) }} />

          <Link to='/login' className="link link-info">
            Or login to an existing account
          </Link>
          

          <button type="submit" className="btn btn-info text-white w-32 m-auto" disabled={loading}>
            {
              loading?
              <span className="loading loading-spinner"></span>
              :
              "Sign Up"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup