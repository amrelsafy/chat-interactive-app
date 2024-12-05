import { motion } from "framer-motion";
import "./TextFileModal.css";

type TextFileModalProps = {
  textFileContent: string;
  showTextFileModal: boolean;
  toggleShowTextFileModal: () => void;
};

const TextFileModal = ({
  textFileContent,
  showTextFileModal,
  toggleShowTextFileModal,
}: TextFileModalProps) => {
  return (
    showTextFileModal && (
      <motion.div className="text-modal" onClick={toggleShowTextFileModal}>
        <textarea
          value={textFileContent}
          className="text-content-area"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    )
  );
};

export default TextFileModal;
