import { useUser } from "@auth0/nextjs-auth0";
import { Center } from "@chakra-ui/layout";
import HomePage from "../components/templates/Homepage/Homepage";
import Dashboard from "../components/templates/Dashboard/Dashboard";
import { Spinner } from "@chakra-ui/spinner";

const Main = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return (
      <Center height="50vh">
        <Spinner />
      </Center>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!user) {
    return <HomePage />;
  }
  return <Dashboard />;
};

export default function Home() {
  return <Main />;
}
