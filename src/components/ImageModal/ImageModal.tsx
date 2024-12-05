import { motion } from "framer-motion";
import "./ImageModal.css";

type ImageModalProps = {
  imageSrc: string;
  showImageModal: boolean;
  toggleShowImageModal: () => void;
};

const ImageModal = ({
  imageSrc,
  showImageModal,
  toggleShowImageModal,
}: ImageModalProps) => {
  return (
    showImageModal && (
      <motion.div className="image-modal" onClick={toggleShowImageModal}>
        <img src={imageSrc} onClick={(e) => e.stopPropagation()} />
      </motion.div>
    )
  );
};

export default ImageModal;
