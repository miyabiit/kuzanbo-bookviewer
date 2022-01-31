import { memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  Stack,
  StackDivider
} from "@chakra-ui/react";

export const MenuDrawer = memo(props => {
  const {
    isOpen,
    onClose,
    onClickHome,
    onClickMenu
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg='gray.200'>
          KUZANBO
          </DrawerHeader>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Stack spacing={1} divider={<StackDivider borderColor='gray.300'/>}>
              <Button onClick={onClickHome}>
                予約
              </Button>
              <Button onClick={onClickMenu}>
                食事
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});