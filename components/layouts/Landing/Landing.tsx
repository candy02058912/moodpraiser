import Head from "next/head";
import { Box, Container } from "@chakra-ui/layout";
import Header from "../../modules/Header/Header";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Landing({ children }: Props) {
  return (
    <Box>
      <Head>
        <title>Moodpraiser</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxW="container.lg">
        <Header />
      </Container>
      {children}
    </Box>
  );
}
