import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import Default from "../../layouts/Default/Default";

const RedirectAuth = () => {
  return (
    <Default>
      <Center h="30vh">
        <Spinner size="xl" />
      </Center>
    </Default>
  );
};
export default RedirectAuth;
