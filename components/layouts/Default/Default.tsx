import Head from "next/head";
import { Box, Container } from "@chakra-ui/layout";
import Header from "../../modules/Header/Header";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function Default({ children }: Props) {
  return (
    <Box>
      <Head>
        <title>Moodpraiser</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:description"
          content="Praise your buddy for doing their habbit today! You're the best praiser!"
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
        {children}
      </Container>
    </Box>
  );
}
