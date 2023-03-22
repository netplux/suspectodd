import { Component } from "react";
import SendIcon from "@material-ui/icons/Send";
import "./chat.css";

function detectURL(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
}

class InputMessage extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleSendMessage(event) {
    event.preventDefault();
    if (this.messageInput.value.length > 0) {
      this.props.sendMessageLoading(
        this.ownerInput.value,
        this.messageInput.value
      );
      this.messageInput.value = "";
    }
  }
  render() {
    var loadingClass = this.props.isLoading
      ? "chatApp__convButton--loading"
      : "";

    return (
      <form onSubmit={this.handleSendMessage}>
        <input
          type="hidden"
          ref={(owner) => (this.ownerInput = owner)}
          value={this.props.owner}
        />
        <input
          type="text"
          ref={(message) => (this.messageInput = message)}
          className={"chatApp__convInput"}
          placeholder="Text message"
          tabIndex="0"
        />
        <div
          className={"chatApp__convButton " + loadingClass}
          onClick={this.handleSendMessage}
        >
          <SendIcon />
        </div>
      </form>
    );
  }
}

/* MessageList component - contains all messages */
class MessageList extends Component {
  render() {
    return (
      <div className={"chatApp__convTimeline"}>
        {this.props.messages
          .slice(0)
          .reverse()
          .map((messageItem, index) => (
            <MessageItem
              key={index}
              owner={this.props.owner}
              sender={messageItem.sender}
              message={messageItem.message}
            />
          ))}
      </div>
    );
  }
}
class MessageItem extends Component {
  render() {
    /* message position formatting - right if I'm the author */
    let messagePosition =
      this.props.owner === this.props.sender
        ? "chatApp__convMessageItem--right"
        : "chatApp__convMessageItem--left";
    return (
      <div
        className={"chatApp__convMessageItem " + messagePosition + " clearfix"}
      >
        <div
          className="chatApp__convMessageValue"
          dangerouslySetInnerHTML={{ __html: this.props.message }}
        ></div>
      </div>
    );
  }
}
class ChatBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
  }
  sendMessageLoading(sender, senderAvatar, message) {
    this.props.sendMessage(sender, senderAvatar, message);
  }

  render() {
    return (
      <div className={"chatApp__conv"}>
        <MessageList owner={this.props.owner} messages={this.props.messages} />
        <div className={"chatApp__convSendMessage clearfix"}>
          <InputMessage
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
          />
        </div>
      </div>
    );
  }
}
/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.sendMessage = this.sendMessage.bind(this);
  }
  /* adds a new message to the chatroom */
  sendMessage(sender, message) {
    let messageFormat = detectURL(message);
    let newMessageItem = {
      sender: sender,
      message: messageFormat,
    };
    this.props.setMessages([...this.props.messages, newMessageItem]);
    this.props.sendMessage({ chat: newMessageItem, gameId: this.props.gameId });
  }

  render() {
    let messages = this.props.messages;
    let sendMessage = this.sendMessage;

    return (
      <div className={"chatApp__room"}>
        <ChatBox
          owner={this.props.owner}
          sendMessage={sendMessage}
          messages={messages}
        />
      </div>
    );
  }
}
export default ChatRoom;
