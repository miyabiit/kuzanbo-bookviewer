import { memo, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const ReserveDetailModal = memo(props => {
  const {isOpen, onClose, reserve } = props;
  
  const [name, setName] = useState("");
    
  useEffect(() => {
    setName(reserve?.宿泊者.value ?? "");
  }, [reserve]);

  return(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInButton"
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>予約詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
        宿泊者：{name}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});