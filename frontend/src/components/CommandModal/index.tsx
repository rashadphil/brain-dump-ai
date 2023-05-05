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
import { handleClose, handleOpen } from "./commandModalSlice";
import React, { useEffect } from "react";
import { AiOutlineSearch, AiOutlineFileText } from "react-icons/ai";
import { FiFilePlus, FiFileText } from "react-icons/fi";

type CommandItemProps = {
  name: string;
  icon: React.ElementType;
  rightElement?: React.ReactNode;
};

const CommandItem = ({
  name,
  icon,
  rightElement,
}: CommandItemProps) => {
  return (
    <ListItem
      cursor="pointer"
      display="flex"
      alignItems="center"
      _hover={{ backgroundColor: "gray.700" }}
      py={1}
      px={2}
      borderRadius="md"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <ListIcon as={icon} color="gray.500" />
        <Text fontWeight="medium" fontSize="sm">
          {name}
        </Text>
      </Flex>
      {rightElement}
    </ListItem>
  );
};

export type ModalSectionProps = {
  title: string;
  children: React.ReactNode;
};
const ModalSection = ({ title, children }: ModalSectionProps) => {
  return (
    <>
      <Text fontWeight="bold" color="gray.500" fontSize="sm">
        {title}
      </Text>
      <List width="full">{children}</List>
    </>
  );
};

const CommandModal = () => {
  const isOpen = useReduxSelector(
    (state) => state.commandModal.isOpen
  );
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey && e.key === "k")) return;

      if (isOpen) dispatch(handleClose());
      else dispatch(handleOpen());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={() => dispatch(handleClose())}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(2px)" />
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
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineSearch} color="gray.300" />
              </InputLeftElement>
              <InputRightElement mx={2} pointerEvents="none">
                <Text fontSize="md" color="gray.500">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </Text>
              </InputRightElement>
            </InputGroup>
          </Box>
          <VStack px={3} align="start" spacing={2}>
            <ModalSection title="Recent">
              <CommandItem icon={FiFileText} name="Note 1" />
              <CommandItem icon={FiFileText} name="Note 2" />
              <CommandItem icon={FiFileText} name="Note 3" />
            </ModalSection>
            <ModalSection title="Actions">
              <CommandItem
                icon={FiFilePlus}
                name="Create New Note..."
                rightElement={
                  <Text fontSize="md" color="gray.500">
                    <Kbd>⌘</Kbd> + <Kbd>N</Kbd>
                  </Text>
                }
              />
            </ModalSection>
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
