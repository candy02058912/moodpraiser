import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { useState } from "react";
import { Mood } from "../../../common/types";
import MoodIcon from "./MoodIcon";

type Props = {
  handleSelect: (mood: Mood) => {};
};

const EmojiGroup = ({ handleSelect }: Props) => {
  const [mood, setMood] = useState(Mood.UNKNOWN);
  const handleClick = (mood: Mood) => () => {
    setMood(mood);
    handleSelect(mood);
  };
  const getActiveValue = (option: Mood) =>
    mood === option ? "yellow" : "gray";
  return (
    <ButtonGroup size="md" isAttached>
      <IconButton
        aria-label="great"
        icon={<MoodIcon mood={Mood.GREAT} />}
        onClick={handleClick(Mood.GREAT)}
        colorScheme={getActiveValue(Mood.GREAT)}
      />
      <IconButton
        aria-label="good"
        icon={<MoodIcon mood={Mood.GOOD} />}
        onClick={handleClick(Mood.GOOD)}
        colorScheme={getActiveValue(Mood.GOOD)}
      />
      <IconButton
        aria-label="fine"
        icon={<MoodIcon mood={Mood.FINE} />}
        onClick={handleClick(Mood.FINE)}
        colorScheme={getActiveValue(Mood.FINE)}
      />
      <IconButton
        aria-label="meh"
        icon={<MoodIcon mood={Mood.MEH} />}
        onClick={handleClick(Mood.MEH)}
        colorScheme={getActiveValue(Mood.MEH)}
      />
      <IconButton
        aria-label="bad"
        icon={<MoodIcon mood={Mood.BAD} />}
        onClick={handleClick(Mood.BAD)}
        colorScheme={getActiveValue(Mood.BAD)}
      />
    </ButtonGroup>
  );
};
export default EmojiGroup;
