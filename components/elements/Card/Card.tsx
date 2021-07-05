import { Box, Heading } from "@chakra-ui/layout";
import {
  PopoverBody,
  HStack,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useClipboard,
  Button,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { getPraiserLink } from "../../../common/utils/praiser";

type Props = {
  title: string;
  variant?: "habit";
  data?: any;
  children?: React.ReactNode;
  onDelete?: (id: string) => () => void;
};

const Card = ({ title, children, variant, data, onDelete }: Props) => {
  const { hasCopied, onCopy } = useClipboard(
    getPraiserLink(window.location, data.id)
  );
  return (
    <Box borderWidth="1px" borderRadius="lg" p={2}>
      <HStack>
        <Heading width="80%" size="lg">
          {title}
        </Heading>
        {variant === "habit" && (
          <>
            <Tooltip
              label={hasCopied ? "Copied!" : "Share praiser link"}
              aria-label={hasCopied ? "Copied!" : "Share praiser link"}
              closeDelay={500}
            >
              <CopyIcon ml={2} w={6} h={6} cursor="pointer" onClick={onCopy} />
            </Tooltip>
            <Popover>
              <PopoverTrigger>
                <DeleteIcon
                  ml={2}
                  w={6}
                  h={6}
                  cursor="pointer"
                  onClick={onCopy}
                />
              </PopoverTrigger>
              <PopoverContent width="100%">
                <PopoverArrow />
                <PopoverBody>
                  <Button colorScheme="red" onClick={onDelete!(data.id)}>
                    Delete
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        )}
      </HStack>
      {children}
    </Box>
  );
};
export default Card;
