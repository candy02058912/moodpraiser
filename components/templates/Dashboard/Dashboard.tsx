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
import format from "date-fns/format";

const TrackToday = ({ id, isDone }: { id: string; isDone: boolean }) => {
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
    await mutate("/api/habits");
    setStep(0);
    rewardRef.current!.rewardMe();
  };

  return (
    <Reward ref={rewardRef} type="confetti">
      <VStack align="start">
        {isDone ? (
          <Text>You're on track!</Text>
        ) : (
          <>
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
          </>
        )}
      </VStack>
    </Reward>
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

  return data.habits.map((habit: Habit) => {
    const formattedRecords: any = {};
    for (const [key, value] of Object.entries(habit.records)) {
      formattedRecords[format(Number(key), "MM/dd")] = value;
    }
    const isDone = format(new Date(), "MM/dd") in formattedRecords;
    return (
      <Card key={habit.id} title={habit.name} data={habit} variant="habit">
        <VStack align="start" mt={2}>
          <TrackToday id={habit.id} isDone={isDone} />
          <Heading as="h4" size="md">
            This week
          </Heading>
          <TrackCalendar records={habit.records} />
        </VStack>
      </Card>
    );
  });
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
