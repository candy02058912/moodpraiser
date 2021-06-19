import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import HomePage from "../components/templates/Homepage/Homepage";
import Dashboard from "../components/templates/Dashboard/Dashboard";
import { Spinner } from "@chakra-ui/spinner";

const Main = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return (
      <Center height="50vh">
        <Spinner />
      </Center>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!user) {
    return <HomePage />;
  }
  return <Dashboard />;
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useUser();

  return (
    <Box>
      <Head>
        <title>Moodpraiser</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxW="container.lg">
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Text
            fontSize="xl"
            textTransform="uppercase"
            fontWeight="600"
            letterSpacing={2}
          >
            Moodpraiser
          </Text>
          <HStack>
            {!user ? (
              <LinkBox>
                <LinkOverlay href="/api/auth/login">
                  <Button>Login</Button>
                </LinkOverlay>
              </LinkBox>
            ) : (
              <LinkBox>
                <LinkOverlay href="/api/auth/logout">
                  <Button>Logout</Button>
                </LinkOverlay>
              </LinkBox>
            )}
            <IconButton
              aria-label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
            />
          </HStack>
        </Flex>
        <Main />
      </Container>
    </Box>
  );
}
