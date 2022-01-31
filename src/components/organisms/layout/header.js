import { memo, useCallback } from "react";
import {
  Flex,
  Spacer,
  Box,
  Link,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { LogoutIconButton } from "../../atoms/button/LogoutIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header = memo(() => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), []);
  const onClickMenu = useCallback(() => navigate("/menus"), []);
  const onClickLogout = useCallback(() => navigate("/"), []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{base:3, md:5}}>
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" p={4} fontSize={{ base: "md", md: "lg" }}>
            KUZANBO
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box p={4}>
            <Link onClick={onClickHome}>予約</Link>
          </Box>
          <Box p={4}>
            <Link onClick={onClickMenu}>食事</Link>
          </Box>
          <Box p={4}>
            <Link onClick={onClickLogout}>ログアウト</Link>
          </Box>
        </Flex>
        <Spacer />
        <LogoutIconButton onClick={onClickLogout} />
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickMenu={onClickMenu}
      />
    </>
  );
});
