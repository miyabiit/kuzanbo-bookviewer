import { memo, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Flex,
  Box,
  Checkbox,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const ReserveDetailModal = memo(props => {
  const {isOpen, onClose, isAdmin = false, reserve } = props;
  
  const [name, setName] = useState("");
  const [villa, setVilla] = useState("未決定");
  const [diamond, setDiamond] = useState(false);
  
  useEffect(() => {
    setName(reserve.宿泊者名?.value ?? "");
    setVilla(reserve.宿泊タイプ?.value ?? "未決定");
    setDiamond((reserve.ダイヤモンド会員?.value[0] ? true : false));
  }, [reserve]);
  
  const onChangeVilla = (e) => setVilla(e.target.value);
  
  const onClickUpdate = () => {
    console.log(villa);
  }
  
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
        <ModalBody mx={1}>
          <Stack spacing={4}>
            <FormControl>
              <Flex>
                <Box pr={2}>
                  <FormLabel>予約番号</FormLabel>
                  <Input
                    value={reserve.宿泊者名?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pl={2}>
                  <FormLabel>ダイヤモンド会員</FormLabel>
                  <Checkbox 
                    isChecked={ diamond }
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Box pt={2}>
                <FormLabel>宿泊者名</FormLabel>
                <Input
                  value={reserve.宿泊者名?.value ?? ""}
                  isReadOnly={!isAdmin}
                />
              </Box>
            </FormControl>
          </Stack>
          宿泊者：{name}
          <UnorderedList>
            {list}
          </UnorderedList>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
            <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});