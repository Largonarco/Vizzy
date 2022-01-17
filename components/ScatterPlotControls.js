import {
  Flex,
  Box,
  Center,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Select,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const LineChartControls = ({
  attributes,
  fieldNames,
  fieldData,
  setAttribute,
  setBooleanAttribute,
  setFieldNames,
  setFieldData,
  submitData,
}) => {
  return (
    <Flex flexDirection="row" wrap="wrap" px="2em" textColor="gray.400">
      <Flex flexDirection="column" width={{ base: "85vw", lg: "30vw" }} p="1em">
        <Text py="1em" fontSize="1.4em" fontWeight={500} textColor="white">
          Data
        </Text>
        <FormControl as="fieldset">
          <FormLabel as="label">Datasets</FormLabel>
          <Accordion allowMultiple>
            {fieldNames.map((field, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Dataset {index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Input
                      mb="1em"
                      size="sm"
                      placeholder="Field name"
                      onChange={(e) => {
                        setFieldNames(
                          fieldNames.map((name, nIndex) =>
                            nIndex === index ? (name = e.target.value) : name
                          )
                        );
                      }}
                    />
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>X co-ordinates</Th>
                          <Th>Y co-ordinates</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {fieldData
                          .filter((input) => input.field === index)
                          .map((el) => {
                            return (
                              <Tr key={el.row}>
                                <Td>
                                  <Input
                                    size="sm"
                                    onChange={(e) => {
                                      setFieldData((fieldData) =>
                                        fieldData.map((input) =>
                                          input.field === index &&
                                          input.row === el.row
                                            ? { ...input, x: e.target.value }
                                            : { ...input }
                                        )
                                      );
                                    }}
                                  />
                                </Td>
                                <Td>
                                  <Input
                                    size="sm"
                                    onChange={(e) => {
                                      setFieldData((fieldData) =>
                                        fieldData.map((input) =>
                                          input.field === index &&
                                          input.row === el.row
                                            ? { ...input, y: e.target.value }
                                            : { ...input }
                                        )
                                      );
                                    }}
                                  />
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                    <Center>
                      <Button
                        my="1em"
                        size="sm"
                        colorScheme="orange"
                        _hover={{
                          backgroundColor: "hsla(38, 93%, 77%, 0.1)",
                        }}
                        _active={{
                          backgroundColor: "hsla(38, 93%, 77%, 0.1)",
                        }}
                        variant="outline"
                        onClick={() => {
                          setFieldData([
                            ...fieldData,
                            {
                              x: null,
                              y: null,
                              field: index,
                              row: fieldData.filter(
                                (input) => input.field === index
                              ).length,
                            },
                          ]);
                        }}
                      >
                        Add row
                      </Button>
                    </Center>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
          <Button
            my="1em"
            size="sm"
            colorScheme="orange"
            _hover={{
              backgroundColor: "hsla(38, 93%, 77%, 0.1)",
            }}
            _active={{
              backgroundColor: "hsla(38, 93%, 77%, 0.1)",
            }}
            variant="outline"
            onClick={() => {
              setFieldNames([...fieldNames, ""]);
            }}
          >
            <AddIcon w="0.75em" h="0.75em" />
          </Button>
          <Button
            my="1em"
            colorScheme="orange"
            variant="solid"
            onClick={submitData}
            isFullWidth
          >
            Insert
          </Button>
        </FormControl>
      </Flex>

      <Flex flexDirection="column" width={{ base: "85vw", lg: "30vw" }} p="1em">
        <Text py="1em" fontSize="1.4em" fontWeight={500} textColor="white">
          Customisation
        </Text>
        <FormControl as="fieldset">
          <FormLabel as="label">Color scheme</FormLabel>
          <Select
            color="grey"
            size="sm"
            mb="1em"
            onChange={(e) => setAttribute("colorScheme", e)}
          >
            <option value="nivo">Basic</option>
            <option value="accent">Accent</option>
            <option value="dark2">Dark</option>
          </Select>
          <FormLabel as="label">Dot size : {attributes.nodeSize}</FormLabel>
          <Slider
            mb="1em"
            defaultValue={8}
            min={2}
            max={16}
            step={1}
            aria-label="nodeSize"
            onChange={(e) => setAttribute("nodeSize", e)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      </Flex>

      <Flex flexDirection="column" width={{ base: "85vw", lg: "30vw" }} p="1em">
        <Text py="1em" fontSize="1.4em" fontWeight={500} textColor="white">
          Grid & Legends
        </Text>
        <FormControl>
          <FormLabel as="label">X axis legend</FormLabel>
          <Input
            mb="1em"
            size="sm"
            onChange={(e) => setAttribute("legendX", e)}
          />
          <FormLabel as="label">Y axis legend</FormLabel>
          <Input
            mb="1em"
            size="sm"
            onChange={(e) => setAttribute("legendY", e)}
          />
          <FormLabel as="label">Grid </FormLabel>
          <HStack gap="1em" mb="1em">
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("enableGridX")}
              defaultIsChecked
            >
              X grid
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("enableGridY")}
              defaultIsChecked
            >
              Y grid
            </Checkbox>
          </HStack>
          <FormLabel as="label">Axes</FormLabel>
          <HStack gap="1em">
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("axisBottom")}
              defaultIsChecked
            >
              X axis
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("axisLeft")}
              defaultIsChecked
            >
              Y axis
            </Checkbox>
          </HStack>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default LineChartControls;
