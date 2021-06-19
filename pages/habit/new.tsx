import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, VStack } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { useState } from "react";
import Default from "../../components/layouts/Default/Default";

const CreateHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Default>
      <Center>
        <Box boxSize="md">
          <Heading>Create Habit</Heading>
          <VStack mt={8} spacing={4} align="flex-start">
            <Heading as="h3" size="md">
              Step 1
            </Heading>
            <Heading as="h2" size="lg">
              Write down your habit
            </Heading>
            <FormControl id="habit">
              <Input />
            </FormControl>
            <Button onClick={() => setIsOpen(true)}>Add habit</Button>
          </VStack>
          <Collapse in={isOpen}>
            <VStack mt={8} spacing={4} align="flex-start">
              <Heading as="h3" size="md">
                Step 2
              </Heading>
              <Heading as="h2" size="lg">
                Invite praiser
              </Heading>
              <Input value="https://hi" />
              <Button>Copy invite link</Button>
            </VStack>
          </Collapse>
        </Box>
      </Center>
    </Default>
  );
};
export default CreateHabit;
