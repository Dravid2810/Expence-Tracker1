import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { dataState } from "../../../context";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
const AddBalanceModal = ({ accId }) => {
  const [balance, setBalance] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchHomepageData } = dataState();
  const toast = useToast();
  const updateAccData = () => {
    const user = localStorage.getItem("userInfo");
    const { token } = JSON.parse(user);
    const options = {
      method: "PUT",
      url: `http://localhost:1337/editAccount/${accId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        balance: balance,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response);
        fetchHomepageData();
        toast({
          title: "Account updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return onClose();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.response.data.message,
          variant: "left-accent",
          status: "error",
          duration: 2000,
        });
      });
  };
  return (
    <>
     
      <Button
                            // w={"full"}
                            mt={8}
                            bg={useColorModeValue("purple.400", "purple.900")}
                            color={"white"}
                            className="addbtn"
                            onClick={onOpen}
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "lg",
                            }}
                          >
                           <AddIcon color="white" />
                                        
                            </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add balance</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <Stack direction={"column"}>
                <FormControl isRequired>
                  <FormLabel>Balance</FormLabel>
                  <Input
                    required
                    placeholder="Enter balance"
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={updateAccData}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddBalanceModal