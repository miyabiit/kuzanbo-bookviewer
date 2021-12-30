import { memo, ChangeEvent, useState } from "react";
import { Box, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";


export const Login = memo(() => {
  /*
  const {login, loading} = useAuth();
  const [ login, setUserId] = useState("");
  const onClickLogin = () => {
    login(userId);
  };
  const onChangeUserId = e => setUserId(e.targt.value);
  */
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box
        bg="white"
        w="sm"
        p={4}
        borderRadius="md"
        shadow="md"
      >
        <Heading as="h1" size="lg" textAlign="center">
          KUZANBO BOOK VIEW
        </Heading>
        <Divider my={4} />
        <Stack
          spacing={6} py={4} px={10}>
          <Input
            placeholder="User Mail"
            //value={userId}
            //onChange={onChangeUserId}
          />
          <PrimaryButton
            isFullWidth
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});
