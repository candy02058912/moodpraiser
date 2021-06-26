import { Box, Heading } from "@chakra-ui/layout";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const Card = ({ title, children }: Props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={2}>
      <Heading size="lg">{title}</Heading>
      {children}
    </Box>
  );
};
export default Card;
