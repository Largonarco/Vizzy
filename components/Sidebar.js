import { useRef } from "react";
import NextLink from "next/link";
import Link from "next/link";
import { useDisclosure } from "@chakra-ui/react";

import {
  VStack,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="blackAlpha"
        marginLeft="auto"
        variant="outline"
        onClick={onOpen}
        textColor="white"
      >
        <ArrowBackIcon /> Charts
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="gray.900">
          <DrawerCloseButton color="white" />
          <DrawerHeader textColor="white">Chart types</DrawerHeader>

          <DrawerBody>
            <VStack spacing="1em" align="stretch">
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/lineChart" passHref>
                  <Link>Line Chart</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/barChart" passHref>
                  <Link href="/barChart">Bar Chart</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/pieChart" passHref>
                  <Link>Pie Chart</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/heatMap" passHref>
                  <Link>Heat Map</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/bumpChart" passHref>
                  <Link>Bump Chart</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/scatterPlot" passHref>
                  <Link>Scatter plot</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="orange"
                variant="ghost"
                _hover={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
                _active={{
                  backgroundColor: "hsla(38, 93%, 77%, 0.2)",
                }}
              >
                <NextLink href="/radialBarChart" passHref>
                  <Link>Radial Bar Chart</Link>
                </NextLink>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
