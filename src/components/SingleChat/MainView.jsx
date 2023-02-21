import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

function MainView() {
  return (
    <div className="main-view d-flex flex-column justify-content-between">
      <ChatHeader />
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default MainView;
