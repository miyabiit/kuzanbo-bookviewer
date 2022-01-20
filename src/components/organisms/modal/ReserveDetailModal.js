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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const ReserveDetailModal = memo(props => {
  const {isOpen, onClose, reserve } = props;
  
  const [name, setName] = useState("");
  console.log("reserve:",reserve);
  useEffect(() => {
    setName(reserve.宿泊者名?.value ?? "");
  }, [reserve]);

  const list = [];
  let obj = {};
  for(const key in reserve){
    obj = reserve[key];
    list.push(<ListItem key={key}>{key}:{JSON.stringify(obj.value)}</ListItem>)
  };
  
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
        <UnorderedList>
          {list}
        </UnorderedList>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});