import { useUser } from "@auth0/nextjs-auth0";
import { Heading } from "@chakra-ui/layout";
import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Reward from "react-rewards";
import fetcher from "../../../common/utils/fetcher";
import withCustomAuth from "../../../components/hoc/with-custom-auth";
import Default from "../../../components/layouts/Default/Default";
import { useRef } from "react";

const Praise = () => {
  const [isPraising, setIsPraising] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const rewardsRef = useRef<any>(null);
  const { data: habit, error } = useSWR(
    `/api/habits/${router.query.id}/praise`,
    fetcher
  );
  const { data: praise } = useSWR(() =>
    user ? `/api/praises/${habit.id}` : null
  );
  if (error) return <div>oops... {error.message}</div>;

  const handleClick = async () => {
    setIsPraising(true);
    await axios.post(`/api/habits/${router.query.id}/praise`);
    await mutate(`/api/praises/${habit.id}`);
    setIsPraising(false);
    rewardsRef.current!.rewardMe();
  };

  return (
    <Default>
      <VStack>
        <Heading>Praise</Heading>
        {!praise ? (
          <>
            <Spinner />
            <Text>Preparing fresh data</Text>
          </>
        ) : (
          <>
            <Heading as="h2" size="lg">
              {habit.owner_name}
            </Heading>
            <Text>for completing</Text>
            <Heading as="h3" size="md">
              {habit.name}
            </Heading>
            <Reward ref={rewardsRef} type="confetti">
              <Button
                isLoading={isPraising}
                loadingText="Praising"
                onClick={handleClick}
                disabled={praise.length > 0}
              >
                {praise.length > 0 ? "Praised" : "Praise!"}
              </Button>
            </Reward>
          </>
        )}
      </VStack>
    </Default>
  );
};
export default withCustomAuth(Praise);
