import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import Default from "../../layouts/Default/Default";

const RedirectAuth = () => {
  return (
    <Default>
      <Center h="50vh">
        <Spinner />
      </Center>
    </Default>
  );
};
export default RedirectAuth;
