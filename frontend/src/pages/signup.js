import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const toast = useToast()


  const handleSignup = () => {
    axios.post('http://localhost:1337/signup', {
      email:email,
      password:password,
      name:name,
    }).then((response) => {
      console.log(response);
      if(response.status == 200){
        toast({
          title: 'signup sucess',
          variant: "left-accent",
          status: 'success',
          isClosable: true,
        })
        router.push('/login');
      }
    }).catch((error) => {
      console.log(error);
      toast({
        title: error.response.data.message,
        variant: "left-accent",
        status: 'error',
        isClosable: true,
      })
    })
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundImage={"https://www.edelweiss.in/ewwebimages/WebImages/Insights/inside~abb80c51-ff28-42e8-a1e9-b956482d7daa.jpg"}
      // bg={useColorModeValue('purple.50', 'gray.800')}
      >
      
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Welcome to  your Expense Tracker ✍🏻
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
          
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" onChange={(e)=>setName(e.target.value)} />
                </FormControl>
           
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={3}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'purple.400'}
                color={'white'}
                onClick={handleSignup}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link href="/" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}