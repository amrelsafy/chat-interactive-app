import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
  useRef,
} from "react";
import { AppContext } from "../../contexts/AppContext";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import "./Chatpage.css";
import { useParams } from "react-router-dom";
import { IAppContext } from "../../interfaces/IAppContext";
import { IMessage } from "../../interfaces/IMessage";
import { IUser } from "../../interfaces/IUser";
import { FaRegFileImage, FaRegFileWord } from "react-icons/fa";

const Chatpage = () => {
  const { username } = useParams();
  const socketRef = useRef<WebSocket | null>(null);

  const [currentUser, setCurrentUser] = useState<IUser>({
    name: "",
    messages: [],
  });
  const [textValue, setTextValue] = useState("");
  const { getUsers, updateUsers } = useContext<IAppContext>(AppContext);

  const onTextValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") sendMessage();
  };

  const onSend = () => {
    sendMessage();
  };

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let newImageMessage: IMessage = {
          response: false,
          message: "",
          imageSrc: reader.result as string,
        };

        let newUser: IUser = {
          ...currentUser,
          messages: [...currentUser.messages, newImageMessage],
        };
        setCurrentUser(newUser);

        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        )
          socketRef.current.send(JSON.stringify(newUser));

        updateUsersContext(newUser);
      };

      reader.readAsDataURL(file);
    }
  };

  const onTextUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        let newTextMessage: IMessage = {
          response: false,
          message: "",
          textFileContent: reader.result as string,
        };

        let newUser: IUser = {
          ...currentUser,
          messages: [...currentUser.messages, newTextMessage],
        };
        setCurrentUser(newUser);

        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        )
          socketRef.current.send(JSON.stringify(newUser));

        updateUsersContext(newUser);
      };

      reader.readAsText(file);
    }
  };

  const sendMessage = () => {
    if (textValue.length > 0) {
      let newMyMessage: IMessage = {
        response: false,
        message: textValue,
      };

      let newUser = {
        ...currentUser,
        messages: [...currentUser.messages, newMyMessage],
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN)
        socketRef.current.send(JSON.stringify(newUser));

      setCurrentUser(newUser);
      updateUsersContext(newUser);
      setTextValue("");
    }
  };

  const updateUsersContext = (newUser: IUser) => {
    const oldUsers = getUsers();
    const newUsers = oldUsers.map((user) => {
      if (user.name === username) {
        return {
          ...newUser,
        };
      }

      return user;
    });

    updateUsers(newUsers);
  };

  useEffect(() => {
    const currentUsers = getUsers();
    const user = currentUsers.find((user) => user.name == username);
    if (user) setCurrentUser(user);

    setTextValue("");

    let socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const updatedUser: IUser = JSON.parse(event.data);

      setCurrentUser(updatedUser);
      updateUsersContext(updatedUser);
    };

    return () => {
      console.log("Closing WebSocket...");
      socket.close();
    };
  }, [username]);

  return (
    <div className="chat-view-container">
      <div className="chat-box-container">
        <div className="text-box-container">
          <input
            className="chat-box-text"
            type="text"
            placeholder="Enter message here..."
            value={textValue}
            onChange={onTextValueChange}
            onKeyDown={onEnter}
          />
          <button
            className="chat-box-button"
            disabled={textValue.length === 0}
            onClick={onSend}
          >
            Send
          </button>
        </div>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="image-input" className="image-upload">
          <FaRegFileImage />
        </label>

        <input
          type="file"
          id="text-file-input"
          accept=".txt"
          onChange={onTextUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="text-file-input" className="text-upload">
          <FaRegFileWord />
        </label>
      </div>
      <div className="messages-container">
        {currentUser.messages.length > 0 ? (
          currentUser.messages.map((message, index) => {
            return <MessageBubble message={message} key={index} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Chatpage;
