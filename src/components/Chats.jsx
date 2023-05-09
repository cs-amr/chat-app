import ChatLink from "./ChatLink";

export default function Chats() {
  return (
    <div>
    <div className="p-6  border ">
        <div className="flex justify-between ">
            <h2 className="font-semibold text-2xl text-light-h dark:text-dark-h ">Chats</h2>
            <div></div>
        </div>
        </div>
        <div className="py-4 flex flex-col  justify-between border-b text-light-p dark:text-dark-p">
            <h3 className="p-6 py-3 text-sm font-semibold">Favourite</h3>
            <ChatLink/>
            <ChatLink/>
            <ChatLink/>
        </div>        
        
        <div className="py-4 flex flex-col  justify-between border-b text-light-p dark:text-dark-p">
            <h3 className="p-6 py-3 text-sm font-semibold">Direct Messages</h3>
            <ChatLink/>
            <ChatLink/>
            <ChatLink/>
        </div>   
</div>
  )
}
