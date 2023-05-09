import Chats from "./Chats";
import Profile from "./Profile";
import Settings from "./Settings";
import { useUser } from "../context/AuthContext";

export default function Tap({ currentTap }) {
  const { authUser } = useUser();

  return (
    <div className="bg-light-bg min-w-[300px] h-full dark:bg-dark-bg ">
      {currentTap === "PROFILE" && <Profile />}
      {currentTap === "CHATS" && <Chats />}
      {currentTap === "SETTINGS" && <Settings />}
    </div>
  );
}
