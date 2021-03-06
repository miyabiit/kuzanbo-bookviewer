import { IconButton, Icon } from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";

export const MenuIconButton = (props) => {
  const { onOpen } = props;
  return (
    <IconButton
      //size="sm"
      icon={<Icon as={BiMenu} />}
      variant="unstyled"
      display={{ base: "block", md: "none" }}
      //display={{ base: "block"}}
      onClick={onOpen}
    />
  );
};
