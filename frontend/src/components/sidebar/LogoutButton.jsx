import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {
      !loading ? 
        <i className="fa-solid  fa-right-from-bracket cursor-pointer text-xl" onClick={logout}></i> 
        :
        <span className="loading loading-spinner"></span>
      }
    </div>
  )
}

export default LogoutButton