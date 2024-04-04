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

const LineChartControls = ({
	data,
	update,
	options,
	setData,
	setUpdate,
	setOptions,
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
						{data.map((group, i) => {
							return (
								<AccordionItem key={i}>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Line {i + 1}
										</Box>
										<AccordionIcon />
									</AccordionButton>
									<AccordionPanel pb={4}>
										<Input
											mb="1em"
											size="sm"
											placeholder="Field name"
											value={group.id}
											onChange={(e) => {
												let newData = data;
												newData.splice(i, 1, {
													...newData[i],
													id: e.target.value,
												});

												setData(newData);
												setUpdate(!update);
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
												{group.data.map((row, j) => {
													return (
														<Tr key={j}>
															<Td>
																<Input
																	size="sm"
																	value={row.x}
																	onChange={(e) => {
																		let newData = data;
																		newData[i].data.splice(j, 1, {
																			...newData[i].data[j],
																			x: e.target.value,
																		});

																		setData(newData);
																		setUpdate(!update);
																	}}
																/>
															</Td>
															<Td>
																<Input
																	size="sm"
																	value={row.y}
																	onChange={(e) => {
																		let newData = data;
																		newData[i].data.splice(j, 1, {
																			...newData[i].data[j],
																			y: e.target.value,
																		});

																		setData(newData);
																		setUpdate(!update);
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
													let newData = data;
													newData[i].data.push({
														x: null,
														y: null,
													});

													setData(newData);
													setUpdate(!update);
												}}>
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
							setData([...data, { name: null, data: [] }]);
							setUpdate(!update);
						}}>
						&#43;
					</Button>
					<Button
						my="1em"
						colorScheme="orange"
						variant="solid"
						onClick={submitData}
						width="full">
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
						onChange={(e) =>
							setOptions({
								...options,
								curveStyle: e.target.value,
							})
						}>
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
						onChange={(e) =>
							setOptions({
								...options,
								colorScheme: e.target.value,
							})
						}>
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
					<FormLabel as="label">Area</FormLabel>
					<HStack mb="1em">
						<Checkbox
							colorScheme="green"
							size="md"
							pr="1em"
							onChange={() =>
								setOptions({
									...options,
									enableArea: !options.enableArea,
								})
							}>
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
							onChange={(val) =>
								setOptions({
									...options,
									areaOpacity: val,
								})
							}>
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
							onChange={(val) =>
								setOptions({
									...options,
									lineWidth: val,
								})
							}>
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
							onChange={() =>
								setOptions({
									...options,
									enablePoints: !options.enablePoints,
								})
							}>
							Enable
						</Checkbox>
						<Text fontSize="1em">Point size: </Text>
						<NumberInput
							size="sm"
							maxW={20}
							defaultValue={6}
							min={1}
							max={15}
							onChange={(val) =>
								setOptions({
									...options,
									pointSize: val,
								})
							}>
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
						onChange={(e) =>
							setOptions({
								...options,
								legendX: e.target.value,
							})
						}
					/>
					<FormLabel as="label">Y axis legend</FormLabel>
					<Input
						mb="1em"
						size="sm"
						onChange={(e) =>
							setOptions({
								...options,
								legendY: e.target.value,
							})
						}
					/>
					<FormLabel as="label">Grid </FormLabel>
					<HStack gap="1em" mb="1em">
						<Checkbox
							colorScheme="green"
							size="lg"
							onChange={() =>
								setOptions({
									...options,
									enableGridX: !options.enableGridX,
								})
							}
							defaultChecked>
							X grid
						</Checkbox>
						<Checkbox
							colorScheme="green"
							size="lg"
							onChange={() =>
								setOptions({
									...options,
									enableGridY: !options.enableGridY,
								})
							}
							defaultChecked>
							Y grid
						</Checkbox>
					</HStack>
					<FormLabel as="label">Axes</FormLabel>
					<HStack gap="1em">
						<Checkbox
							colorScheme="green"
							size="lg"
							onChange={() =>
								setOptions({
									...options,
									axisBottom: !options.axisBottom,
								})
							}
							defaultChecked>
							X axis
						</Checkbox>
						<Checkbox
							colorScheme="green"
							size="lg"
							onChange={() =>
								setOptions({
									...options,
									axisLeft: !options.axisLeft,
								})
							}
							defaultChecked>
							Y axis
						</Checkbox>
					</HStack>
				</FormControl>
			</Flex>
		</Flex>
	);
};

export default LineChartControls;
