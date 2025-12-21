import { format } from "date-fns";
import { useRouter } from "next/navigation";

const ChatBox = ({ chat, currentUser, currentChatId }) => {
  const router = useRouter();

  const otherMembers = chat?.members?.filter(
    (member) => member._id !== currentUser._id
  );

  const lastMessage =
    chat?.messages?.length > 0 &&
    chat?.messages[chat.messages.length - 1];

  const seen = lastMessage?.seenBy?.find(
    (member) => member._id === currentUser._id
  );

  const isActive = chat._id === currentChatId;

  return (
    <div
      className={`chat-item ${isActive ? "chat-item-active" : ""}`}
      onClick={() => router.push(`/chats/${chat._id}`)}
    >
      {/* Avatar */}
      <img
        src={
          chat?.isGroup
            ? chat?.groupPhoto || "/assets/group.png"
            : otherMembers[0]?.profileImage || "/assets/person.jpg"
        }
        alt="chat avatar"
        className="chat-avatar"
      />

      {/* Chat Text */}
      <div className="chat-text">
        <p className="chat-name">
          {chat?.isGroup ? chat?.name : otherMembers[0]?.username}
        </p>

        {!lastMessage && (
          <p className="chat-preview">Started a chat</p>
        )}

        {lastMessage?.photo ? (
          <p className={seen ? "chat-preview" : "chat-preview-unread"}>
            {lastMessage.sender._id === currentUser._id
              ? "You sent a photo"
              : "Received a photo"}
          </p>
        ) : (
          <p className={seen ? "chat-preview" : "chat-preview-unread"}>
            {lastMessage?.text}
          </p>
        )}
      </div>

      {/* Time + Unread */}
      <div className="chat-meta">
        <span>
          {format(
            new Date(
              lastMessage ? chat.lastMessageAt : chat.createdAt
            ),
            "p"
          )}
        </span>

        {!seen && lastMessage?.sender?._id !== currentUser._id && (
          <span className="unread-dot" />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
