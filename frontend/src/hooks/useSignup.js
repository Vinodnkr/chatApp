import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  
  const signup = async (inputs) => {
    const success = handleInputErrors(inputs);
    if (!success) { return }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0]);
      }
      //localstorage
      localStorage.setItem("chat-auth-user", JSON.stringify(data));
      //context
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup }

}

export default useSignup

function handleInputErrors(inputs) {
  if (inputs.username.length < 4 || inputs.username.length > 16) {
    toast.error("Username must be 4 to 16 characters long");
    return false;
  }
  if (inputs.password.length < 4 || inputs.password.length > 16) {
    toast.error("Password must be 6 to 24 characters long");
    return false;
  }
  if (inputs.password !== inputs.confirmPassword) {
    toast.error("Passwords must match");
    return false;
  }

  return true;
}