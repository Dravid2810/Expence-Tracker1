import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Welcome() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'row', md: 'row' }} bg={""}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text color={'purple.400'} as={'span'}>
               Welcome to 
              <br />{' '}
              </Text>{' '}
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple.200',
                zIndex: -1,
              }}>
             Expense Tracker ✍🏻
            </Text>
          </Heading>
          
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'purple.400'}
              color={'white'}
              _hover={{
                bg: 'purple.500',
                color:"white",
              }}>
                <Link href="/login" className='welcomelink'
              >Get Started 👉🏻</Link>
            
            </Button>
            
          </Stack>
        </Stack>
      </Flex>
      {/* <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'contain'}
          src={
            "https://learn.g2.com/hubfs/iStock-1058690454.jpg"}
        />
      </Flex> */}
    </Stack>
  );
}