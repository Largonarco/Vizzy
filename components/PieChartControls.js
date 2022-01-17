import {
  Flex,
  HStack,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const BarChartControls = ({
  attributes,
  tableInputs,
  setAttribute,
  setBooleanAttribute,
  setTableInputs,
  submitData,
}) => {
  return (
    <Flex flexDirection="row" wrap="wrap" px="2em">
      <Flex
        flexDirection="column"
        width={{ base: "85vw", lg: "30vw" }}
        p="1em"
        color="white"
      >
        <Text py="1em" fontSize="1.4em" fontWeight={500}>
          Data
        </Text>
        <FormControl as="fieldset">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Element</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableInputs.map((el) => {
                return (
                  <Tr key={el.row}>
                    <Td>
                      <Input
                        size="sm"
                        onChange={(e) => {
                          setTableInputs((tableInputs) =>
                            tableInputs.map((input) =>
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
                    row: tableInputs.length,
                  },
                ]);
              }}
            >
              Add row
            </Button>
          </Center>
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

      <Flex
        flexDirection="column"
        width={{ base: "85vw", lg: "30vw" }}
        p="1em"
        color="white"
      >
        <Text py="1em" fontSize="1.4em" fontWeight={500}>
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
           <option value="set1">Set</option>
            <option value="nivo">Basic</option>
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
          <FormLabel as="label">
            Inner radius : {attributes.innerRadius}
          </FormLabel>
          <Slider
            mb="1em"
            defaultValue={0.5}
            min={0}
            max={0.9}
            step={0.05}
            aria-label="inner-radius"
            onChange={(e) => setAttribute("innerRadius", e)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <FormLabel as="label">Pad angle : {attributes.padAngle}</FormLabel>
          <Slider
            mb="1em"
            defaultValue={0}
            min={0}
            max={6}
            step={1}
            aria-label="pad-angle"
            onChange={(e) => setAttribute("padAngle", e)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      </Flex>

      <Flex
        flexDirection="column"
        width={{ base: "85vw", lg: "30vw" }}
        p="1em"
        color="white"
      >
        <Text py="1em" fontSize="1.4em" fontWeight={500}>
          Labels
        </Text>
        <FormControl>
          <FormLabel as="label">Labels </FormLabel>
          <HStack gap="1em">
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("arcLabels")}
              defaultIsChecked
            >
              Show Arc labels
            </Checkbox>
            <Checkbox
              colorScheme="green"
              size="lg"
              onChange={() => setBooleanAttribute("arcLinkLabels")}
              defaultIsChecked
            >
              Show Arc link labels
            </Checkbox>
          </HStack>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default BarChartControls;
