import ChatList from "@components/ChatList"
import Contacts from "@components/Contacts"
// import TopBar from  "@components/TopBar"
const Chats = () => {
  return (
    <div className="main-container">
      {/* <TopBar/> */}
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList />
      </div>
      <div className="w-1/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  )
}

export default Chats