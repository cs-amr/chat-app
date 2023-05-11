import Chat from "../components/Chat";
import Tap from "../components/Tap";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [currentTap, setCurrentTap] = useState("CHATS");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`${
        darkMode ? "dark" : ""
      } flex lg:flex-row flex-col-reverse h-screen`}
    >
      <Sidebar
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setCurrentTap={setCurrentTap}
      />
      <Tap currentTap={currentTap} />
      <Chat />
    </main>
  );
}
