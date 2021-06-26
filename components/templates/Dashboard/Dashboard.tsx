import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Card from "../../elements/Card/Card";
import { Habit, Mood, Record } from "../../../common/types";
import EmojiGroup from "../../elements/EmojiGroup/EmojiGroup";
import { eachDayOfInterval, startOfWeek, endOfWeek, format } from "date-fns";
import { Collapse } from "@chakra-ui/transition";
import { useState } from "react";
import axios from "axios";
import MoodIcon from "../../elements/EmojiGroup/MoodIcon";

const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  return response.json();
};

const TrackCalendarDay = ({ day, mood }) => {
  return (
    <Box borderRadius="lg" borderWidth="1px" p={2}>
      <VStack>
        <Text size="md">{day}</Text>
        {mood ? (
          <MoodIcon mood={mood} />
        ) : (
          <Box w={6} h={6}>
            <Center>-</Center>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

const TrackCalendar = ({ records }: { records: Record[] }) => {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfWeek(now),
    end: endOfWeek(now),
  });
  const formattedRecords: any = {};
  for (const [key, value] of Object.entries(records)) {
    formattedRecords[format(Number(key), "MM/dd")] = value;
  }
  return (
    <Wrap>
      {days.map((day) => {
        const key = format(day, "MM/dd");
        return (
          <TrackCalendarDay
            key={day.getTime()}
            day={key}
            mood={formattedRecords[key] && formattedRecords[key].mood}
          />
        );
      })}
    </Wrap>
  );
};

const TrackToday = ({ id }: { id: string }) => {
  const [step, setStep] = useState(0);
  const handleSelect = async (mood: Mood) => {
    const req: Record = {
      mood,
      habit_id: id,
    };
    const resp = await axios.post("/api/records", req);
    setStep(step + 1);
  };
  const goToNextStep = () => {
    setStep(step + 1);
  };
  return (
    <VStack align="start">
      <Heading as="h4" size="md">
        Done for today?
      </Heading>
      <Collapse in={step < 2}>
        <Button onClick={goToNextStep}>I'm Done!</Button>
      </Collapse>
      <Collapse in={step === 1}>
        <Wrap align="center">
          <WrapItem>
            <Text>How are you feeling?</Text>
          </WrapItem>
          <WrapItem>
            <EmojiGroup handleSelect={handleSelect} />
          </WrapItem>
        </Wrap>
      </Collapse>
      <Collapse in={step === 2}>
        <Text>Job well done!</Text>
      </Collapse>
    </VStack>
  );
};

const Dashboard = () => {
  const { user } = useUser();
  const { data, error } = useSWR("/api/habits", fetcher);
  if (error) return <div>oops... {error.message}</div>;
  if (data === undefined) return <div>Loading...</div>;
  return (
    <Box>
      <Heading>Hi {user!.name}</Heading>
      <LinkBox my={4}>
        <Link href="/habit/new" passHref>
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
        {data.habits.length > 0 ? (
          data.habits.map((habit: Habit) => (
            <Card key={habit.id} title={habit.name}>
              <VStack align="start" mt={4}>
                <TrackToday id={habit.id} />
                <Heading as="h4" size="md">
                  This week
                </Heading>
                <TrackCalendar records={habit.records} />
              </VStack>
            </Card>
          ))
        ) : (
          <Text>No Habits</Text>
        )}
      </VStack>
    </Box>
  );
};
export default withPageAuthRequired(Dashboard);
