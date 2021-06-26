import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
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
import axios from "axios";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { getPraiserLink } from "../../common/utils/praiser";
import Default from "../../components/layouts/Default/Default";
import RedirectAuth from "../../components/templates/RedirectAuth/RedirectAuth";

const CreateHabit = () => {
  const [step, setStep] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [name, setName] = useState("");
  const [habitID, setHabitID] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocation(window.location);
  }, []);

  const copyToClipboard = () => {
    linkRef.current!.select();
    document.execCommand("copy");
    setIsCopied(true);
    setStep(step + 1);
  };
  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleAddHabit = async () => {
    setLoadingStep(1);
    const resp = await axios.post("/api/habits", {
      name,
    });
    setHabitID(resp.data.id);
    setLoadingStep(0);
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
              <Input value={name} onChange={handleNameChange} />
            </FormControl>
            <Button
              onClick={handleAddHabit}
              isLoading={loadingStep === 1}
              disabled={step > 1}
            >
              Add habit
            </Button>
          </VStack>
          <Collapse in={step >= 2}>
            <VStack mt={8} spacing={4} align="flex-start">
              <Heading as="h3" size="md">
                Step 2
              </Heading>
              <Heading as="h2" size="lg">
                Invite praiser
              </Heading>
              <Input
                ref={linkRef}
                value={location ? getPraiserLink(location, habitID) : ""}
                readOnly
              />
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
export default withPageAuthRequired(CreateHabit, {
  onRedirecting: () => <RedirectAuth />,
});
