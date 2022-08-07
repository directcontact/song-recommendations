import { Flex, Text, Heading } from "@chakra-ui/react";
import Image from "next/image";

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

    <Flex
      h={80}
      w={250}
      p={16}
      bg="white"
      borderRadius="md"
      alignItems="flex-start"
      justifyContent="center"
      position="absolute"
      left={150}
      top={300}
    >
      <Heading fontSize="xl" color="black">
        Login
      </Heading>
    </Flex>
  </Flex>
);

export default Index;
