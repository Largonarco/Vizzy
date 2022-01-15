import NextLink from "next/link";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex bg="tomato" px="1em" align="center" height="10vh" shadow="dark-lg">
      <Text
        px="1em"
        fontSize="1.5em"
        fontWeight="bold"
        letterSpacing={2}
        textColor="white"
      >
        <NextLink href="/" passHref>
          <Link href="/">Vizzy</Link>
        </NextLink>
      </Text>
      <Sidebar />
    </Flex>
  );
};

export default Navbar;
