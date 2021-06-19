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
} from "@chakra-ui/layout";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Card from "../../elements/Card/Card";
import { Habit } from "../../../common/types";

const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  return response.json();
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
          data.habits.map((habit: Habit) => <Card title={habit.name} />)
        ) : (
          <Text>No Habits</Text>
        )}
      </VStack>
    </Box>
  );
};
export default withPageAuthRequired(Dashboard);
