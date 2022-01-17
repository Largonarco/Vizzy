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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const LineChartControls = ({
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
          <FormLabel as="label">Lines</FormLabel>
          <Accordion allowMultiple>
            {fieldNames.map((field, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Line {index + 1}
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
          <FormLabel as="label">Curve style</FormLabel>
          <Select
            color="grey"
            size="sm"
            mb="0.75em"
            onChange={(e) => setAttribute("curveStyle", e)}
          >
            <option value="cardinal">Cardinal</option>
            <option value="linear">Linear</option>
            <option value="catmullRom">CatmullRom</option>
            <option value="monotoneX">Monotone X</option>
            <option value="monotoneY">Monotone Y</option>
            <option value="natural">Natural</option>
            <option value="step">Step</option>
          </Select>
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
          <FormLabel as="label">Area</FormLabel>
          <HStack mb="1em">
            <Checkbox
              colorScheme="green"
              size="md"
              pr="1em"
              onChange={() => setBooleanAttribute("enableArea")}
            >
              Enable
            </Checkbox>
            <Text fontSize="1em">Opacity :</Text>
            <NumberInput
              size="sm"
              maxW={20}
              defaultValue={0.1}
              min={0}
              max={1}
              precision={1}
              step={0.1}
              onChange={(val) => setAttribute("areaOpacity", val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <FormLabel as="label">Line</FormLabel>
          <HStack mb="1em">
            <Text fontSize="1em">Width : </Text>
            <NumberInput
              size="sm"
              maxW={20}
              defaultValue={2}
              min={1}
              max={15}
              onChange={(val) => setAttribute("lineWidth", val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <FormLabel as="label">Points</FormLabel>
          <HStack mb="1em">
            <Checkbox
              colorScheme="green"
              size="md"
              pr="1em"
              onChange={() => setBooleanAttribute("enablePoints")}
            >
              Enable
            </Checkbox>
            <Text fontSize="1em">Point size: </Text>
            <NumberInput
              size="sm"
              maxW={20}
              defaultValue={6}
              min={1}
              max={15}
              onChange={(val) => setAttribute("pointSize", val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
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
