import Icon from "@chakra-ui/icon";
import React from "react";
import {
  FaRegSadTear,
  FaRegSmileBeam,
  FaRegGrinBeam,
  FaRegMehBlank,
  FaRegMeh,
} from "react-icons/fa";
import { Mood } from "../../../common/types";

type Props = {
  mood: Mood;
};

const MoodIcon = ({ mood }: Props) => {
  let icon;
  switch (mood) {
    case Mood.GREAT:
      icon = FaRegGrinBeam;
      break;
    case Mood.GOOD:
      icon = FaRegSmileBeam;
      break;
    case Mood.FINE:
      icon = FaRegMehBlank;
      break;
    case Mood.MEH:
      icon = FaRegMeh;
      break;
    case Mood.BAD:
      icon = FaRegSadTear;
      break;
  }
  return <Icon as={icon} w={6} h={6} />;
};
export default MoodIcon;
