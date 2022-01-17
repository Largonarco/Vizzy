import { useRef } from "react";
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
                <Link href="/lineChart">Line Chart</Link>
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
                <Link href="/barChart">Bar Chart</Link>
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
                <Link href="/pieChart">Pie Chart</Link>
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
                <Link href="/heatMap">Heat Map</Link>
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
                <Link href="/bumpChart">Bump Chart</Link>
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
                <Link href="/scatterPlot">Scatter plot</Link>
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
                <Link href="/radialBarChart">Radial Bar Chart</Link>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
