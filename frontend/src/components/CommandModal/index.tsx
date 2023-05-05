import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../redux/hooks";
import { handleClose } from "./commandModalSlice";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const CommandModal = () => {
  const isOpen = useReduxSelector(
    (state) => state.commandModal.isOpen
  );
  const dispatch = useReduxDispatch();

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={() => dispatch(handleClose())}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor="gray.900"
        color="white"
        borderRadius="2xl"
      >
        <ModalBody px={1}>
          <Box borderBottomWidth="1px" mb={5}>
            <InputGroup>
              <Input
                placeholder="Search note or type command..."
                border="none"
                width="full"
                shadow="none"
                _focus={{ shadow: "none", border: "none" }}
              />
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineSearch} color="gray.300" />
              </InputLeftElement>
            </InputGroup>
          </Box>
          <VStack align="start" spacing={2}></VStack>
        </ModalBody>
        <ModalFooter px={1} py={0}>
          <HStack
            px={3}
            py={3}
            borderTopWidth="1px"
            width="full"
            spacing={5}
            justifyContent="space-between"
          >
            <Text fontWeight="medium" color="gray.500" fontSize="sm">
              Suggestions <Kbd>TAB</Kbd>
            </Text>
            <Text fontWeight="medium" color="gray.500" fontSize="sm">
              Open <Kbd>↵</Kbd>
            </Text>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default React.memo(CommandModal);
