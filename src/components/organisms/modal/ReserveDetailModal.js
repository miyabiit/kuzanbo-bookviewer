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
  VStack,
  Flex,
  Box,
  Checkbox,
  Divider
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

export const ReserveDetailModal = memo(props => {
  const {isOpen, onClose, isAdmin = false, reserve } = props;
  
  const [name, setName] = useState("");
  const [villa, setVilla] = useState("未決定");
  const [diamond, setDiamond] = useState(false);
  const [repeater, setRepeater] = useState(false);
  const [noDogfee, setNoDogfee] = useState(false);
  
  useEffect(() => {
    setName(reserve.宿泊者名?.value ?? "");
    setVilla(reserve.宿泊タイプ?.value ?? "未決定");
    setDiamond((reserve.ダイヤモンド会員?.value[0] ? true : false));
    setRepeater((reserve.リピーター?.value[0] ? true : false));
    setNoDogfee((reserve.犬料金?.value[0] ? true : false));
  }, [reserve]);
  
  const onChangeVilla = (e) => setVilla(e.target.value);
  
  const onClickUpdate = () => {
    console.log(villa);
  }
  
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
              <Flex align = "center">
                <Box pr={2}>
                  <FormLabel>予約番号</FormLabel>
                  <Input
                    value={reserve.予約番号?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pl={2}>
                  <VStack align="left">
                  <Checkbox 
                    isChecked={ diamond }
                    isReadOnly={!isAdmin}
                  >
                  ダイヤモンド
                  </Checkbox>
                  <Checkbox 
                    isChecked={ repeater }
                    isReadOnly={!isAdmin}
                  >
                    リピーター
                  </Checkbox>
                  </VStack>
                </Box>
              </Flex>
              <Box pt={2}>
                <FormLabel>宿泊者名</FormLabel>
                <Input
                  value={name}
                  isReadOnly={!isAdmin}
                />
              </Box>
              <Box pt={2}>
                <FormLabel>電話番号</FormLabel>
                <Input
                  value={reserve.tel?.value ?? ""}
                  isReadOnly={!isAdmin}
                />
              </Box>
              <Flex>
                <Box pr={2}>
                  <FormLabel>チェックイン</FormLabel>
                  <Input
                    value={reserve.チェックイン?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>&nbsp;</FormLabel>
                  <Input
                    value={reserve.チェックイン時刻?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>チェックアウト</FormLabel>
                  <Input
                    value={reserve.チェックアウト?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>&nbsp;</FormLabel>
                  <Input
                    value={reserve.チェックアウト時刻?.value ?? "不明"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>部屋タイプ</FormLabel>
                  <Input
                    value={reserve.宿泊タイプ?.value ?? "未定"}
                    isReadOnly={!isAdmin}
                    onChange={onChangeVilla}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>合計人数</FormLabel>
                  <Input
                    value={reserve.合計人数?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>寝具</FormLabel>
                  <Input
                    value={reserve.寝具?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Divider my={4} />
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>大人 男</FormLabel>
                  <Input
                    value={reserve.男?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>女</FormLabel>
                  <Input
                    value={reserve.女?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>高学年</FormLabel>
                  <Input
                    value={reserve.高学年?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>低学年</FormLabel>
                  <Input
                    value={reserve.低学年?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>幼児　食事・寝具あり</FormLabel>
                  <Input
                    value={reserve.幼児_食事_寝具あり?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>幼児　食事なし・寝具あり</FormLabel>
                  <Input
                    value={reserve.幼児_食事なし_寝具あり?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>幼児　食事あり・寝具なし</FormLabel>
                  <Input
                    value={reserve.幼児_食事あり_寝具なし?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>幼児　食事・寝具なし</FormLabel>
                  <Input
                    value={reserve.幼児_食事_寝具なし?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>犬</FormLabel>
                  <Input
                    value={reserve.犬?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>犬種</FormLabel>
                  <Input
                    value={reserve.犬種?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>犬料金未徴収か</FormLabel>
                  <Checkbox
                    isChecked={noDogfee}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Divider my={4} />
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>夕食</FormLabel>
                  <Input
                    value={reserve.dinner_name_0?.value ?? "未定"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>&nbsp;</FormLabel>
                  <Input
                    value={reserve.dinner_qty?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Divider my={4} />
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>朝食</FormLabel>
                  <Input
                    value={reserve.breakfast_name1?.value ?? "未定"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>&nbsp;</FormLabel>
                  <Input
                    value={reserve.breakfast_qty1?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <Input
                    value={reserve.breakfast_name2?.value ?? ""}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <Input
                    value={reserve.breakfast_qty2?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Flex align="center">
                <Box pr={2}>
                  <Input
                    value={reserve.breakfast_name3?.value ?? ""}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <Input
                    value={reserve.breakfast_qty3?.value ?? "0"}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
              <Divider my={4} />
              <Box pr={2}>
                <FormLabel>アレルギー</FormLabel>
                <Input
                  value={reserve.アレルギー?.value ?? ""}
                  isReadOnly={!isAdmin}
                />
              </Box>
              <Box pr={2}>
                <FormLabel>苦手</FormLabel>
                <Input
                  value={reserve.苦手?.value ?? ""}
                  isReadOnly={!isAdmin}
                />
              </Box>
              <Flex align="center">
                <Box pr={2}>
                  <FormLabel>交通手段</FormLabel>
                  <Input
                    value={reserve.交通手段?.value ?? ""}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>きっかけ</FormLabel>
                  <Input
                    value={reserve.きっかけ?.value ?? ""}
                    isReadOnly={!isAdmin}
                  />
                </Box>
                <Box pr={2}>
                  <FormLabel>コメント</FormLabel>
                  <Input
                    value={reserve.コメント?.value ?? ""}
                    isReadOnly={!isAdmin}
                  />
                </Box>
              </Flex>
            </FormControl>
          </Stack>
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