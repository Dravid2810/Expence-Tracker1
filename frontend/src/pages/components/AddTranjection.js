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
  Select,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";

function AddTranjection({ accId, fetchSignleAcc }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState();
  const [transfer, setTransfer] = useState("");
  const [category, setCategory] = useState("");
  const [catlist, setCatlist] = useState();
  const [isIncome, setIsIncome] = useState(true);
  const toast = useToast();
  const handleCreateTrans = () => {
    const user = localStorage.getItem("userInfo");
    const { token } = JSON.parse(user);
    const options = {
      method: "POST",
      url: `http://localhost:1337/addTransaction/${accId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: text,
        amount: amount,
        transfer: transfer,
        category: category,
        isIncome: isIncome,
      },
    };
    axios
      .request(options)
      .then((response) => {
        fetchSignleAcc();
        if (response.status == 201) {
          fetchSignleAcc();
          toast({
            title: "Transaction created successfully",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          onClose();
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `${error.response.data.message}`,
          status: "error",
          duration: 1000,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/category")
      .then((res) => {
        setCatlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Button
        bg={useColorModeValue("purple.300", "purple.900")}
        color={"white"}
        className="addbtn"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        onClick={onOpen}
      >
        <AddIcon />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        color={useColorModeValue("black", "white")}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={useColorModeValue("black", "white")}>
            Create new Transaction
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color={useColorModeValue("black", "white")}>
            <Stack direction={"column"}>
              <FormControl isRequired>
                <FormLabel>Type</FormLabel>

                <Select
                  placeholder="type"
                  onChange={(e) => setIsIncome(e.target.value)}
                >
                  <option value={true}>Income</option>
                  <option value={false}>Expenses</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Transaction text</FormLabel>
                <Input
                  required
                  placeholder="Enter transaction text"
                  onChange={(e) => setText(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <Input
                  required
                  placeholder="Enter amount in digit"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>
                  {isIncome === "true" ? "Get" : "Transfer"}
                </FormLabel>
                <Input onChange={(e) => setTransfer(e.target.value)} required />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>

                <Select
                  placeholder="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {catlist &&
                    catlist.map((v) => {
                      return <option value={v.id}>{v.name}</option>;
                    })}
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="purple" onClick={handleCreateTrans}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTranjection;
