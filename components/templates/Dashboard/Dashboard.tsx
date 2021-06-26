import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import useSWR, { mutate } from "swr";
import Card from "../../elements/Card/Card";
import { Habit, Mood, Record } from "../../../common/types";
import EmojiGroup from "../../elements/EmojiGroup/EmojiGroup";
import { Collapse } from "@chakra-ui/transition";
import { useRef, useState } from "react";
import axios from "axios";
import TrackCalendar from "../../modules/TrackCalendar/TrackCalendar";
import fetcher from "../../../common/utils/fetcher";
import { Center, Spinner } from "@chakra-ui/react";
import Reward from "react-rewards";
import { isEmpty } from "lodash";

const TrackToday = ({ id }: { id: string }) => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(Mood.UNKNOWN);

  const rewardRef = useRef<any>(null);

  const handleSelect = async (mood: Mood) => {
    setMood(mood);
    setStep(1);
  };

  const handleFinish = async () => {
    const req: Record = {
      mood,
      habit_id: id,
    };
    // TODO: loading, error handling
    await axios.post("/api/records", req);
    setStep(2);
    await mutate("/api/habits");
    rewardRef.current!.rewardMe();
  };

  return (
    <VStack align="start">
      <Heading as="h4" size="md">
        Done for today?
      </Heading>
      <Collapse in={step < 2}>
        <Wrap align="center">
          <WrapItem>
            <Text>How are you feeling?</Text>
          </WrapItem>
          <WrapItem>
            <EmojiGroup handleSelect={handleSelect} />
          </WrapItem>
        </Wrap>
      </Collapse>
      <Collapse in={step === 1}>
        <Button onClick={handleFinish}>I'm Done!</Button>
      </Collapse>
      <Collapse in={step === 2}>
        <Reward ref={rewardRef} type="confetti">
          <Text>Job well done!</Text>
        </Reward>
      </Collapse>
    </VStack>
  );
};

const HabitList = () => {
  const { data, error } = useSWR("/api/habits", fetcher);
  if (error) return <div>oops... {error.message}</div>;
  if (!data)
    return (
      <Center h="50vh">
        <VStack>
          <Spinner />
        </VStack>
      </Center>
    );
  if (isEmpty(data.habits)) {
    return <Center>No Habits. Let's create one above!</Center>;
  }
  return data.habits.map((habit: Habit) => (
    <Card key={habit.id} title={habit.name} data={habit} variant="habit">
      <VStack align="start" mt={4}>
        <TrackToday id={habit.id} />
        <Heading as="h4" size="md">
          This week
        </Heading>
        <TrackCalendar records={habit.records} />
      </VStack>
    </Card>
  ));
};

const Dashboard = () => {
  const { user } = useUser();
  return (
    <Box>
      <Heading>Hi {user!.name}</Heading>
      <LinkBox my={4}>
        <Link href="/habits/new" passHref>
          <LinkOverlay>
            <Button
              borderWidth="1px"
              borderRadius="lg"
              variant="ghost"
              isFullWidth
            >
              <AddIcon /> <Text ml={1}>Add a new habit</Text>
            </Button>
          </LinkOverlay>
        </Link>
      </LinkBox>
      <VStack align="stretch">
        <HabitList />
      </VStack>
    </Box>
  );
};
export default Dashboard;
