import { useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import useStartConversation from "../../hooks/useStartConversation";

function Users({ setShowingUsers, searchUsers }) {
  const wrapper = useRef(null);
  useOutsideAlerter(wrapper, () => { setShowingUsers(false) });

  const [users, setUsers] = useState([]);

  const { loading, createConversation } = useStartConversation();

  const startConversation = (user) => {
    createConversation(user, true);
  }

  useEffect(() => {
    fetch(`/api/users?searchUsers=${searchUsers}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [searchUsers]);

  return (
    <div ref={wrapper} className="absolute max-h-80 w-64 mt-1 overflow-auto bg-accent scrollbar rounded-lg z-50">
      {users && users.map((user) => {
        return (
          <div key={user._id} className="flex gap-4  p-4 items-center cursor-pointer hover:bg-info"
          onClick={() => {
            startConversation(user);
            setShowingUsers(false);
          }}>
            {
              loading?
              <span className="loading loading-spinner"></span>
              :
              <>
                <img src={`/users/profilePics/${user.profilePic}`} className="w-8 rounded-full" />
                <div className="text-center text-white text-sm overflow-hidden">{user.username}</div>
              </>
            }
          </div>
        )
      })}
    </div>
  )
}

export default Users