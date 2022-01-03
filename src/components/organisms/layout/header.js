import { memo, useCallback } from "react";
import {
  Flex,
  Box,
  Link,
  useDisclosure,
  Heading,
  Drawer,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerBody
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";

export const Header = memo(() => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/home"), []);
  const onClickMenu = useCallback(() => navigate("/menus"), []);
  const onClickGuests = useCallback(() => navigate("/guests"), []);
  const onClickGuest = useCallback(() => navigate("/guest"), []);
  const onClickLogiout = useCallback(() => navigate("/"), []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex as="nav" bg="cyan.500" color="gray.50" aling="center">
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            KUZANBO
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box pr={4}>
            <Link onClick={onClickMenu}>食事</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickGuests}>ゲスト</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickGuest}>詳細</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogiout}>ログアウト</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button onClick={onClickHome} w="100%">
                HOME
              </Button>
              <Button onClick={onClickMenu} w="100%">
                食事
              </Button>
              <Button onClick={onClickGuest} w="100%">
                ゲスト
              </Button>
              <Button onClick={onClickLogiout} w="100%">
                ログアウト
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});
