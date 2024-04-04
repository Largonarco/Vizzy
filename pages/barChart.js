import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import BarChartControls from "../components/BarChartControls";
import { ResponsiveBar } from "@nivo/bar";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const BarChart = () => {
	const chartRef = useRef(null);
	const [update, setUpdate] = useState(false);
	const [data, setData] = useState([{}]);
	const [options, setOptions] = useState({
		colorScheme: "nivo",
		orientation: "vertical",
		grouping: "stacked",
		barPadding: 0.3,
		labels: true,
		enableGridX: true,
		enableGridY: true,
		axisBottom: true,
		axisLeft: true,
		legendX: "",
		legendY: "",
	});
	const [finalData, setFinalData] = useState([
		{
			country: "AD",
			"hot dog": 132,
		},
		{
			country: "AE",
			"hot dog": 31,
		},
		{
			country: "AF",
			"hot dog": 150,
		},
		{
			country: "AG",
			"hot dog": 5,
		},
		{
			country: "AI",
			"hot dog": 89,
		},
		{
			country: "AL",
			"hot dog": 122,
		},
		{
			country: "AM",
			"hot dog": 7,
		},
	]);

	const setAttribute = (attr, e) => {
		if (e.target) {
			setAttributes({
				...attributes,
				[attr]: e.target.value,
			});
		} else {
			setAttributes({
				...attributes,
				[attr]: e,
			});
		}
	};

	const setBooleanAttribute = (attr) => {
		setAttributes({
			...attributes,
			[attr]: !attributes[attr],
		});
	};

	const submitData = () => {
		setFinalData(data);
	};

	const generateSVG = () => {
		const htmlNode = chartRef.current;
		htmlToImage
			.toSvg(htmlNode)
			.then((data) => {
				download(data, "Chart.svg");
			})
			.catch((error) => {
				console.error("Something went wrong", error);
			});
	};

	const generatePNG = () => {
		const htmlNode = chartRef.current;
		htmlToImage
			.toPng(htmlNode)
			.then((data) => {
				download(data, "Chart.png");
			})
			.catch((error) => {
				console.error("Something went wrong", error);
			});
	};

	return (
		<Flex flexDirection="column" bgColor="gray.900" color="white">
			<HStack mx="2em" mt="2em" justify="space-between">
				<Text fontSize="1.5em" fontWeight={500}>
					Bar Chart
				</Text>
				<HStack>
					<Text fontSize="1em">Export : </Text>
					<Select
						width="6em"
						color="grey"
						placeholder="Format"
						variant="outline"
						onChange={(e) => {
							switch (e.target.value) {
								case "svg":
									generateSVG();
									break;
								case "png":
									generatePNG();
									break;
							}
						}}>
						<option value="svg">SVG</option>
						<option value="png">PNG</option>
					</Select>
				</HStack>
			</HStack>

			<Flex width="98vw" overflowX="auto">
				<div ref={chartRef}>
					<Flex
						height="60vh"
						width={{ base: 1450, lg: "95vw" }}
						alignSelf="center">
						<ResponsiveBar
							key={counter}
							data={finalData}
							keys={keys}
							indexBy={indexingKey}
							groupMode={attributes.grouping}
							layout={attributes.orientation}
							margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
							padding={attributes.barPadding}
							valueScale={{ type: "linear" }}
							indexScale={{ type: "band", round: true }}
							colors={{ scheme: attributes.colorScheme }}
							theme={{ textColor: "#ffffff" }}
							defs={[]}
							fill={[]}
							borderColor={{ from: "color", modifiers: [["darker", 2]] }}
							axisTop={null}
							axisRight={null}
							axisBottom={
								attributes.axisBottom
									? {
											tickSize: 5,
											tickPadding: 5,
											tickRotation: 0,
											legend: attributes.legendX,
											legendPosition: "middle",
											legendOffset: 32,
									  }
									: null
							}
							axisLeft={
								attributes.axisLeft
									? {
											tickSize: 5,
											tickPadding: 5,
											tickRotation: 0,
											legend: attributes.legendY,
											legendPosition: "middle",
											legendOffset: -40,
									  }
									: null
							}
							enableGridX={attributes.enableGridX}
							enableGridY={attributes.enableGridY}
							enableLabel={attributes.labels}
							labelSkipWidth={12}
							labelSkipHeight={12}
							labelTextColor={{ from: "color", modifiers: [["darker", 6]] }}
							legends={[
								{
									dataFrom: "keys",
									anchor: "bottom-right",
									direction: "column",
									justify: false,
									translateX: 120,
									translateY: 0,
									itemsSpacing: 2,
									itemWidth: 100,
									itemHeight: 20,
									itemDirection: "left-to-right",
									itemOpacity: 0.85,
									symbolSize: 20,
									effects: [
										{
											on: "hover",
											style: {
												itemOpacity: 1,
											},
										},
									],
								},
							]}
							role="application"
							ariaLabel="Bar Chart"
							barAriaLabel={function (e) {
								return (
									e.id +
									": " +
									e.formattedValue +
									" in country: " +
									e.indexValue
								);
							}}
						/>
					</Flex>
				</div>
			</Flex>
			<BarChartControls
				data={data}
				update={update}
				options={options}
				setData={setData}
				setUpdate={setUpdate}
				setOptions={setOptions}
				submitData={submitData}
			/>
		</Flex>
	);
};

export default BarChart;
