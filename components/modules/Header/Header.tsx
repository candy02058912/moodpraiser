import { useUser } from "@auth0/nextjs-auth0";
import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useUser();
  return (
    <Flex alignItems="center" justifyContent="space-between" my={4}>
      <Text
        fontSize="xl"
        textTransform="uppercase"
        fontWeight="600"
        letterSpacing={2}
      >
        Moodpraiser
      </Text>
      <HStack>
        {!user ? (
          <LinkBox>
            <LinkOverlay href="/api/auth/login">
              <Button>Login</Button>
            </LinkOverlay>
          </LinkBox>
        ) : (
          <LinkBox>
            <LinkOverlay href="/api/auth/logout">
              <Button>Logout</Button>
            </LinkOverlay>
          </LinkBox>
        )}
        <IconButton
          aria-label={`Switch to ${
            colorMode === "light" ? "dark" : "light"
          } mode`}
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
};

export default Header;
