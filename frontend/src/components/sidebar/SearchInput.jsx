import { useRef, useState } from "react"
import Users from "../sidebar/Users"

function SearchInput() {
  const [showingUsers, setShowingUsers] = useState(false);
  const [searchUsers, setSearchUsers] = useState('');

  const input = useRef(null);
  

  function handleSearch() {
    if (input.current.value.length > 2) {
      setSearchUsers(input.current.value);
      setShowingUsers(true);
    }
  }

  return (
    <form onSubmit={ e => e.preventDefault() } className="relative">
      <input ref={input} type="text" placeholder="Search users " className="input w-full bg-accent" onChange={handleSearch}/>
      {showingUsers && <Users searchUsers={searchUsers} setShowingUsers={setShowingUsers}/>}
    </form>
  )
}

export default SearchInput