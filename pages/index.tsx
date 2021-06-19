import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, Center, Container } from "@chakra-ui/layout";
import HomePage from "../components/templates/Homepage/Homepage";
import Dashboard from "../components/templates/Dashboard/Dashboard";
import { Spinner } from "@chakra-ui/spinner";
import Header from "../components/modules/Header/Header";

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
  return (
    <Box>
      <Head>
        <title>Moodpraiser</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxW="container.lg">
        <Header />
        <Main />
      </Container>
    </Box>
  );
}
