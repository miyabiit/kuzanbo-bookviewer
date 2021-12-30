import { memo, ChangeEvent, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

import { useAuth } from "../../../hooks/useAuth";

export const Login = memo(() => {
  const {login, loading} = useAuth();
  const [ userId, setUserId] = useState("");
  const onClickLogin = () => {
    login(userId);
  };
  const onChangeUserId = e => setUserId(e.target.value);

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
            value={userId}
            onChange = {onChangeUserId}
          />
          <PrimaryButton
            isFullWidth
            disabled={false}
            isLoading={loading}
            onClick = {onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});
