import Conversations from "./sidebar/Conversations"
import LogoutButton from "./sidebar/LogoutButton"
import SearchInput from "./sidebar/SearchInput"

function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <SearchInput />
      <div className="divider  divider-accent"></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}

export default Sidebar