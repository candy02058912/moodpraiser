import { Box, Heading } from "@chakra-ui/layout";
import { Tooltip, useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { getPraiserLink } from "../../../common/utils/praiser";

type Props = {
  title: string;
  variant?: "habit";
  data?: any;
  children?: React.ReactNode;
};

const Card = ({ title, children, variant, data }: Props) => {
  const { hasCopied, onCopy } = useClipboard(
    getPraiserLink(window.location, data.id)
  );
  return (
    <Box borderWidth="1px" borderRadius="lg" p={2}>
      <Heading size="lg">
        {title}
        {variant === "habit" && (
          <Tooltip
            label={hasCopied ? "Copied!" : "Share praiser link"}
            aria-label={hasCopied ? "Copied!" : "Share praiser link"}
            closeDelay={500}
          >
            <CopyIcon ml={2} w={6} h={6} cursor="pointer" onClick={onCopy} />
          </Tooltip>
        )}
      </Heading>
      {children}
    </Box>
  );
};
export default Card;
