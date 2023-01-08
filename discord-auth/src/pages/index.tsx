import {
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaDiscord } from 'react-icons/fa'

export default function HomePage() {
  const router = useRouter()

  async function handleLogin() {
    router.push('/dashboard')
    return;
  }

  return (
    <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
            >
              Discord gaming schedule in
            </Text>
            <br />
            <Text as={'span'} color={'purple.400'}>
              app name
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'purple'}
              onClick={handleLogin}
            >
              <Icon mr={2} as={FaDiscord} />
              Get started with discord
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          align={'center'}>
          <Image
            padding='5rem'
            alt={'Logo'}
            src={
              '/home/logo.png'
            }
          />
        </Flex>
      </Stack>
    </Container>
  );
}