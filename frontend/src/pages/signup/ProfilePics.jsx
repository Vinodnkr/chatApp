import { useRef } from "react";
import useOutsideAlerter from "../../utils/useOutsideAlerter"

function ProfilePics({setProfilePic, setShowingProfilePics}) {
  const wrapper = useRef(null);
  useOutsideAlerter(wrapper, () => { setShowingProfilePics(false) });

  
  return (
    <div ref={wrapper} className="absolute z-40 flex flex-col flex-wrap h-56 w-56 bg-accent p-2 gap-2 rounded-lg">
      {
        Array.from(Array(9).keys()).map((index) =>
          <img key={index} src={`/users/profilePics/profilePic${index + 1}.jpg`} className="w-16 rounded-full"
            onClick={() => {
              setProfilePic(`profilePic${index + 1}.jpg`);
              setShowingProfilePics('false');
            }} />
        )
      }
    </div>
  )
}

export default ProfilePics