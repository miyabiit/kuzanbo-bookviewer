import { IconButton, Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

export const LogoutIconButton = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      icon={<Icon as={BiLogOut} />}
      variant="unstyled"
      display={{ base: "block", md: "none" }}
      //display={{ base: "block"}}
      onClick={onClick}
    />
  );
};
