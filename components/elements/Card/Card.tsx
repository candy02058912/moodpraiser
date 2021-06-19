import { Box, Heading } from "@chakra-ui/layout";

type Props = {
  title: string;
};

const Card = ({ title }: Props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={2}>
      <Heading size="lg">{title}</Heading>
    </Box>
  );
};
export default Card;
