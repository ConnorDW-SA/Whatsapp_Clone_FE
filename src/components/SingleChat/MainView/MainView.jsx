import MainHeader from "./MainHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

function MainView() {
  return (
    <div className="main-view d-flex flex-column justify-content-between">
      <MainHeader />
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default MainView;
