import { Flex, Heading, Input, VStack, Button } from "@chakra-ui/react";

const Index = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    h="1080px"
    w="1920px"
    position="relative"
  >
    <Flex
      h="full"
      w="full"
      alignItems="center"
      justifyContent="center"
      position="absolute"
    >
      <video autoPlay muted loop style={{ height: "1080px", width: "1920px" }}>
        <source src="/images/bg.mp4" />
      </video>
    </Flex>

    <Flex
      bgImage="/images/wave-haikei.svg"
      aspectRatio="960/300"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      h="full"
      w="full"
      alignItems="center"
      justifyContent="center"
      position="absolute"
    ></Flex>

    <Flex position="absolute" left="70px" top={200}>
      <Heading color="white">/spotify-recommendations</Heading>
    </Flex>

    <Flex
      h={80}
      w={250}
      p={6}
      bg="white"
      borderRadius="md"
      alignItems="flex-start"
      justifyContent="center"
      position="absolute"
      left={150}
      top={300}
    >
      <VStack spacing={3}>
        <Heading fontSize="2xl" color="black" mb={6} mt={10}>
          login.
        </Heading>

        <Input placeholder="username" focusBorderColor="green" />
        <Input placeholder="password" focusBorderColor="green" />
        <Button
          mt={3}
          bg="white"
          borderColor="green"
          borderStyle="solid"
          borderWidth="1px"
          _hover={{
            bg: "black",
            borderWidth: "0",
            color: "white",
          }}
          _active={{
            bg: "white",
            borderWidth: "1px",
            color: "black",
          }}
        >
          done
        </Button>
      </VStack>
    </Flex>
  </Flex>
);

export default Index;
