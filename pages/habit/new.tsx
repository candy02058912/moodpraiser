import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  VStack,
} from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import Link from "next/link";
import { useRef, useState } from "react";
import Default from "../../components/layouts/Default/Default";

const CreateHabit = () => {
  const [step, setStep] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);
  const copyToClipboard = () => {
    linkRef.current!.select();
    document.execCommand("copy");
    setIsCopied(true);
    setStep(step + 1);
  };
  const handleAddHabit = () => {
    setStep(step + 1);
  };
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
            <Button onClick={handleAddHabit}>Add habit</Button>
          </VStack>
          <Collapse in={step >= 2}>
            <VStack mt={8} spacing={4} align="flex-start">
              <Heading as="h3" size="md">
                Step 2
              </Heading>
              <Heading as="h2" size="lg">
                Invite praiser
              </Heading>
              <Input ref={linkRef} value="https://hi" readOnly />
              <Button onClick={copyToClipboard}>
                {isCopied ? "Link copied" : "Copy invite link"}
              </Button>
            </VStack>
          </Collapse>
          <Collapse in={step >= 3}>
            <LinkBox mt={8}>
              <Link href="/" passHref>
                <LinkOverlay>
                  <Button>Back to dashboard</Button>
                </LinkOverlay>
              </Link>
            </LinkBox>
          </Collapse>
        </Box>
      </Center>
    </Default>
  );
};
export default CreateHabit;
