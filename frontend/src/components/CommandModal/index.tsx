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
  Flex,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../redux/hooks";
import { handleClose } from "./commandModalSlice";
import React from "react";
import { AiOutlineSearch, AiOutlineFileText } from "react-icons/ai";

type CommandItemProps = {
  name: string;
};

const CommandItem = ({ name }: CommandItemProps) => {
  return (
    <ListItem
      cursor="pointer"
      display="flex"
      alignItems="center"
      _hover={{ backgroundColor: "gray.700" }}
      py={1}
    >
      <ListIcon as={AiOutlineFileText} color="gray.500" />
      <Text fontWeight="medium" fontSize="sm">
        {name}
      </Text>
    </ListItem>
  );
};

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
          <VStack px={3} align="start" spacing={2}>
            <Text fontWeight="bold" color="gray.500" fontSize="sm">
              Recent
            </Text>
            <List>
              <CommandItem name="Note 1" />
              <CommandItem name="Note 2" />
              <CommandItem name="Note 2" />
            </List>
            <Text fontWeight="bold" color="gray.500" fontSize="sm">
              Actions
            </Text>
          </VStack>
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
