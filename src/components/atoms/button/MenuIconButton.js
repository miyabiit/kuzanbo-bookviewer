import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const MenuIconButton = (props) => {
  const { onOpen } = props;
  return (
    <IconButton
      size="sm"
      icon={<HamburgerIcon />}
      p="4"
      variant="unstyled"
      //display={{ base: "block", md: "none" }}
      display={{ base: "block" }}
      onClick={onOpen}
    />
  );
};
