import { motion } from "framer-motion";
import { IMessage } from "../../interfaces/IMessage";
import "./MessageBubble.css";
import { useState } from "react";
import ImageModal from "../ImageModal/ImageModal";
import TextFileModal from "../TextFileModal/TextFileModal";

const MessageBubble = ({ message }: { message: IMessage }) => {
  let responseClass = message.response ? "message-response" : "";
  let messageClass = `message-bubble ${responseClass}`;

  let [showImageModal, setShowImageModal] = useState(false);
  let [showTextFileModal, setShowTextFileModal] = useState(false);

  const toggleShowImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  const toggleShowTextFileModal = () => {
    setShowTextFileModal(!showTextFileModal);
  };

  return (
    <motion.div
      initial={{ y: 15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={messageClass}
    >
      {message.imageSrc && (
        <>
          <img
            src={message.imageSrc}
            className="message-image"
            onClick={toggleShowImageModal}
          />
          <ImageModal
            imageSrc={message.imageSrc}
            showImageModal={showImageModal}
            toggleShowImageModal={toggleShowImageModal}
          />
        </>
      )}
      {message.textFileContent && (
        <>
          <button
            onClick={toggleShowTextFileModal}
            className="show-text-file-btn"
          >
            Show Text File
          </button>
          <TextFileModal
            textFileContent={message.textFileContent}
            showTextFileModal={showTextFileModal}
            toggleShowTextFileModal={toggleShowTextFileModal}
          />
        </>
      )}
      <p className="message-text">{message.message}</p>
    </motion.div>
  );
};

export default MessageBubble;
