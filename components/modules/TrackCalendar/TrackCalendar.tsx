import { Box, Center, Text, VStack, Wrap } from "@chakra-ui/react";
import { endOfWeek, eachDayOfInterval, startOfWeek } from "date-fns";
import format from "date-fns/format";
import { Mood, Record } from "../../../common/types";
import MoodIcon from "../../elements/EmojiGroup/MoodIcon";

type TrackCalendarDayProps = {
  day: string;
  mood: Mood;
};

const TrackCalendarDay = ({ day, mood }: TrackCalendarDayProps) => {
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

type Props = {
  records: Record[];
};

const TrackCalendar = ({ records }: Props) => {
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

export default TrackCalendar;
