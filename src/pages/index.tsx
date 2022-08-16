import { Flex, Heading, Input, VStack, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
      position="relative"
      overflow="hidden"
    >
      <Flex
        h="full"
        w="full"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <video
          autoPlay
          muted
          loop
          style={{
            objectFit: "fill",
          }}
        >
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
        <Heading fontSize="3xl" color="white">
          /spotify-recommendations
        </Heading>
      </Flex>

      <Flex
        h={60}
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
            login via spotify
          </Heading>
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
            login.
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};
export default Index;
