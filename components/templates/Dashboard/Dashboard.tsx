import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <Box>
      <Heading>Dashboard</Heading>
      <Flex>
        <div>User: {JSON.stringify(user)}</div>
      </Flex>
      <VStack align="stretch">
        <Button borderWidth="1px" borderRadius="lg" variant="ghost">
          <AddIcon /> <Text ml={1}>Add a new task</Text>
        </Button>
      </VStack>
    </Box>
  );
};
export default Dashboard;
