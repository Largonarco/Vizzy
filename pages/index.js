import { Flex, Center, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Flex bgColor="gray.900" flexDirection="column">
        <Heading
          as="h1"
          marginX="auto"
          marginTop="2em"
          paddingX="0.5em"
          textAlign="center"
          size="4xl"
          bgGradient="linear(to-l, #fe5858, #ee9617)"
          bgClip="text"
        >
          Visualise your data, the way you like
        </Heading>
        <Text
          marginX="auto"
          marginTop="1em"
          fontSize="1.5em"
          textAlign="center"
          textColor="gray.500"
        >
          Vizzy provides you with highly customizable charts drawn from your own
          data
        </Text>

        <Heading
          as="h2"
          marginX="auto"
          marginTop="4em"
          marginBottom="1em"
          size="2xl"
          textColor="white"
        >
          Features
        </Heading>
        <Flex flexDirection="row" justifyContent="center" wrap="wrap">
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Free of cost
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              We charge you no money for any service that we provide.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Variety
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              There are a variety of charts available and new ones coming.
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="row" justifyContent="center" wrap="wrap">
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Quality
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              Every chart is meant to be exported in the highest quality SVG,
              PNG or PDF format.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Comfort
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              With a user-friendly editor, visualising your data is easier than
              ever.
            </Text>
          </Flex>
        </Flex>

        <Heading
          as="h2"
          marginX="auto"
          marginTop="4em"
          marginBottom="1em"
          size="2xl"
          textColor="white"
        >
          How to use
        </Heading>
        <Flex flexDirection="row" justifyContent="center" wrap="wrap">
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Ingest data
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              Depending on the chart, create required fields, then add as many
              rows as your inputs and insert data.
            </Text>
          </Flex>
          <Center
            display={{ base: "none", md: "flex" }}
            color="orange"
            fontSize="3em"
          >
            &#8680;
          </Center>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Customise
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              Every chart comes with it &apos; s own set of customisations.
              Customise as much as you like.
            </Text>
          </Flex>
          <Center
            display={{ base: "none", md: "flex" }}
            color="orange"
            fontSize="3em"
          >
            &#8680;
          </Center>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Export
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              All the charts could be exported by choosing the format to export
              in. Enjoy data vizing.
            </Text>
          </Flex>
        </Flex>

        <Heading
          as="h2"
          marginX="auto"
          marginTop="4em"
          marginBottom="1em"
          size="2xl"
          textColor="white"
        >
          Chart types
        </Heading>
        <Flex flexDirection="row" justifyContent="center" wrap="wrap">
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Line Chart
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              A line chart is a great way to visualise the correlation between
              two parameters.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Bar Chart
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              For side by side comparison of how multiple parameters correlate
              can be better visualised with a bar chart.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Pie Chart
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              Visualise how a set of data is divided in different sets in an
              beautiful manner.
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="row" justifyContent="center" wrap="wrap">
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Heat Map
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              A heat map shows magnitude of a property as color in two
              dimensions which allows 3D interpretation of data.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Radial Bar Chart
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              Very similar to bar chart but uses polar co-ordinate system rather
              than cartesian system.
            </Text>
          </Flex>
          <Flex
            width={300}
            borderRadius={5}
            border="1px"
            borderColor="white"
            m="1em"
            padding="1em"
            flexDirection="column"
          >
            <Text fontSize="1.75em" fontWeight={500} textColor="white">
              Scatter Plot
            </Text>
            <Text fontSize="1em" textColor="gray.400">
              A graph of plotted points that show the relationship between two
              sets of data.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
