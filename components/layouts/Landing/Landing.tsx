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
        <meta
          property="og:description"
          content="MoodPraiser is a simple, useful and fun habit tracker that keeps you and your friends accountable for each other by giving priases y'all deserve to reach your goal!"
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/candy-tsai/image/upload/v1624694336/moodpraiser_favicon.png"
          }
        />
      </Head>
      <Container maxW="container.lg">
        <Header />
      </Container>
      {children}
    </Box>
  );
}
