import { RepeatClockIcon, StarIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Center,
  Container,
  SimpleGrid,
  Text,
  useColorMode,
  VStack,
  Icon,
  Image,
  Link,
  Wrap,
  WrapItem,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import TextLoop from "react-text-loop";
import { FaTheaterMasks } from "react-icons/fa";
import Landing from "../../layouts/Landing/Landing";

const HomePage = () => {
  const { colorMode } = useColorMode();

  return (
    <Landing>
      <Box
        py={["12vh", "24vh"]}
        backgroundColor={colorMode === "light" ? "#FFC554" : ""}
      >
        <Container>
          <VStack spacing={8}>
            <Box>
              <Heading
                as="h2"
                size="4xl"
                textAlign="center"
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                pb={2}
              >
                Keep track of your
              </Heading>
              <Heading
                as="h2"
                size="3xl"
                textAlign="center"
                color={colorMode === "light" ? "blue.700" : "#FFC554"}
                mt={[2, 4]}
              >
                <TextLoop>
                  <Center w="50vw">habits</Center>
                  <Center w="50vw">moods</Center>
                  <Center w="50vw">praises</Center>
                </TextLoop>
              </Heading>
            </Box>
            <Heading
              as="h3"
              size="md"
              fontWeight="500"
              textAlign="center"
              lineHeight={1.5}
            >
              MoodPraiser is a simple, useful and fun habit tracker that keeps
              you and your friends accountable for each other by giving priases
              y'all deserve to{" "}
              <Text
                as="span"
                color={colorMode === "light" ? "blue.700" : "#FFC554"}
              >
                reach your goal!
              </Text>
            </Heading>
            <LinkBox>
              <LinkOverlay href="/dashboard">
                <Button size="lg" colorScheme="facebook">
                  Get Started!
                </Button>
              </LinkOverlay>
            </LinkBox>
          </VStack>
        </Container>
      </Box>
      <Box py="12vh">
        <Container>
          <Heading as="h2" size="2xl" textAlign="center">
            Three wishes at once
          </Heading>
        </Container>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} mt={20}>
            <SimpleGrid columns={1} spacingX="40px" spacingY="20px">
              <Box p={4} display={{ md: "flex" }}>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                  <VStack align={{ base: "center", md: "start" }}>
                    <RepeatClockIcon w={8} h={8} />
                    <Text
                      mt={1}
                      display="block"
                      fontSize="2xl"
                      lineHeight="normal"
                      fontWeight="semibold"
                    >
                      Habbit
                    </Text>

                    <Text mt={2} color="gray.500">
                      Make sure you complete the habbit you want to obtain.
                    </Text>
                  </VStack>
                </Box>
              </Box>
              <Box p={4} display={{ md: "flex" }}>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                  <VStack align={{ base: "center", md: "start" }}>
                    <Icon as={FaTheaterMasks} w={8} h={8} />
                    <Text
                      mt={1}
                      display="block"
                      fontSize="2xl"
                      lineHeight="normal"
                      fontWeight="semibold"
                    >
                      Mood
                    </Text>
                    <Text mt={2} color="gray.500">
                      Track your ups and downs during the process.
                    </Text>
                  </VStack>
                </Box>
              </Box>
              <Box p={4} display={{ md: "flex" }}>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                  <VStack align={{ base: "center", md: "start" }}>
                    <StarIcon w={8} h={8} />
                    <Text
                      mt={1}
                      display="block"
                      fontSize="2xl"
                      lineHeight="normal"
                      fontWeight="semibold"
                    >
                      Praise
                    </Text>
                    <Text mt={2} color="gray.500">
                      Ask for praises and keep you and your friends motivated!
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </SimpleGrid>
            <Center mt={{ base: 4, md: 0 }}>
              <Center boxSize="md">
                <Image shadow="lg" src="/landing.jpg" />
              </Center>
            </Center>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py={["12vh", "24vh"]} backgroundColor="#FFC554">
        <Container>
          <Heading as="h2" size="2xl" textAlign="center" color="black">
            Built with
          </Heading>
          <Wrap mt={20} spacing={["30px", "60px"]} justify="center">
            <WrapItem>
              <Center w="150px" h="50px">
                <Image src="https://res.cloudinary.com/candy-tsai/image/upload/v1624780492/icons/414px-Nextjs-logo.svg.png" />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w="150px" h="50px">
                <Image src="https://res.cloudinary.com/candy-tsai/image/upload/v1624782122/icons/vercel-inc-logo-vector.svg" />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w="150px" h="50px">
                <Image src="https://res.cloudinary.com/candy-tsai/image/upload/v1624780212/icons/logo-colored.svg" />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w="150px" h="50px">
                <Image src="https://res.cloudinary.com/candy-tsai/image/upload/v1624781071/icons/logo-dark.png" />
              </Center>
            </WrapItem>
          </Wrap>
        </Container>
      </Box>
      <Center py={12}>
        Made with lots of ♥️ from&nbsp;
        <Link href="https://candys.page">candys.page</Link>.
      </Center>
    </Landing>
  );
};
export default HomePage;
