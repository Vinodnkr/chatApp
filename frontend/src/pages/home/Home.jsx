import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"
import useListenMessages from "../../hooks/useListenMessages.js";

function Home() {
  const [showingMenu, setShowingMenu] = useState(false);
  useListenMessages();

  
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 w-screen h-[40rem] sm:w-5/6 px-6 sm:p-6 rounded-lg sm:mx-auto bg-secondary relative">
      <div className="sm:hidden active:bg-accent w-fit h-fit rounded-lg p-2 mb-3"
        onClick={() => { showingMenu ? setShowingMenu(false) : setShowingMenu(true) }}>
        {
          showingMenu ?
            <i className="fa-solid fa-chevron-left text-5xl"></i>
            :
            <i className="fa-solid fa-bars text-5xl"></i>
        }
      </div>
      <div className={`custom-sidebar ${showingMenu ? "showing" : ""} 
        absolute sm:static sm:block top-[4rem] h-[36rem] sm:h-full pr-4 py-4 sm:p-0 sm:w-2/6 bg-secondary z-50`}>
        <Sidebar />
      </div>
      <div className="w-full sm:w-4/6 bg-primary rounded-lg">
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home