import { Flex, Box, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex bgColor="gray.900">
        <Flex height="30vh">
          <Box width="40vw" >
            <Heading
              as="h1"
              size="4xl"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              Visualise your data however you like
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
