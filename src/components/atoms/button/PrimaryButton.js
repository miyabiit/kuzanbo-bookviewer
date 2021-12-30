import { Button } from "@chakra-ui/react";

export const PrimaryButton = props => {
    const {
        children,
        isFullWidth = false,
        disabled = false,
        isLoading = false,
        onClick
    } = props;
    
    return (
      <Button
        bg="teal.400"
        color="white"
        isFullWidth={isFullWidth}
        disabled={disabled || isLoading}
        _hover={{ opacity: 0.8}}
        onClick={onClick}
      >
      {children}
      </Button>
    );
}