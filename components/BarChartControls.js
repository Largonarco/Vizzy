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
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
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

const BarChartControls = ({
  groups,
  tableInputs,
  setGroups,
  setTableInputs,
  setAttribute,
  setBooleanAttribute,
  submitData,
}) => {
  return (
    <Flex flexDirection="row" wrap="wrap" px="2em" textColor="gray.400">
      <Flex flexDirection="column" width={{ base: "85vw", lg: "30vw" }} p="1em">
        <Text py="1em" fontSize="1.4em" fontWeight={500} textColor="white">
          Data
        </Text>
        <FormControl as="fieldset">
          <FormHelperText mb="1em">
            The first element will be used for indexing.
          </FormHelperText>
          <FormLabel as="label">Groups</FormLabel>
          <Accordion allowMultiple>
            {groups.map((group, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Group {index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Element</Th>
                          <Th>Value</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tableInputs
                          .filter((input) => input.field === index)
                          .map((el) => {
                            return (
                              <Tr key={el.row}>
                                <Td>
                                  <Input
                                    size="sm"
                                    onChange={(e) => {
                                      setTableInputs((tableInputs) =>
                                        tableInputs.map((input) =>
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
                                      setTableInputs((tableInputs) =>
                                        tableInputs.map((input) =>
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
                          setTableInputs([
                            ...tableInputs,
                            {
                              x: null,
                              y: null,
                              field: index,
                              row: tableInputs.filter(
                                (input) => input.field === index
                              ).length,
                            },
                          ]);

                          setGroups((groups) =>
                            groups.map((group, gIndex) => {
                              gIndex === index
                                ? { ...group, "": null }
                                : { ...group };
                            })
                          );
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
              setGroups([...groups, []]);
            }}
          >
            &#43;
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
            <option value="set1">Set</option>
            <option value="accent">Accent</option>
            <option value="dark2">Dark</option>
            <option value="spectral">Spectral</option>
            <option value="pastel1">Pastel</option>
            <option value="pastel1">More pastel</option>
            <option value="blue_green">Blue &#8594; Green</option>
            <option value="orange_red">Orange &#8594; Red</option>
            <option value="yellow_green">Yellow &#8594; Green</option>
            <option value="red_purple">Red &#8594; Purple</option>
            <option value="yellow_green_blue">
              Yellow &#8594; Green &#8594; Blue
            </option>
            <option value="yellow_orange_red">
              Yellow &#8594; Orange &#8594; Red
            </option>
          </Select>
          <FormLabel as="label">Orientation</FormLabel>
          <RadioGroup
            mb="1em"
            onChange={(val) => setAttribute("orientation", val)}
          >
            <HStack>
              <Radio value="horizontal">Horizontal</Radio>
              <Radio value="vertical">Vertical</Radio>
            </HStack>
          </RadioGroup>
          <FormLabel as="label">Grouping</FormLabel>
          <RadioGroup
            mb="1em"
            onChange={(val) => setAttribute("grouping", val)}
          >
            <HStack>
              <Radio value="stacked">Stacked</Radio>
              <Radio value="grouped">Grouped</Radio>
            </HStack>
          </RadioGroup>
          <HStack>
            <Text fontSize="1em">Bar padding: </Text>
            <NumberInput
              size="sm"
              maxW={20}
              defaultValue={0.7}
              min={0.1}
              max={0.9}
              precision={1}
              step={0.1}
              onChange={(val) => setAttribute("barPadding", 1 - val)}
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

      <Flex
        flexDirection="column"
        width={{ base: "85vw", lg: "30vw" }}
        p="1em"
        textColor="white"
      >
        <Text py="1em" fontSize="1.4em" fontWeight={500}>
          Grid and Labels
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
          <HStack gap="1em" mb="1em">
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
          <FormLabel as="label">Labels</FormLabel>
          <Checkbox
            colorScheme="green"
            size="lg"
            onChange={() => setBooleanAttribute("labels")}
            defaultIsChecked
          >
            Show labels
          </Checkbox>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default BarChartControls;
