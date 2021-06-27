import { useUser } from "@auth0/nextjs-auth0";
import { Center } from "@chakra-ui/layout";
import HomePage from "../components/templates/Homepage/Homepage";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return <HomePage />;
}
