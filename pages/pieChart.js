import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import BarChartControls from "../components/PieChartControls";
import { ResponsivePie } from "@nivo/pie";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const PieChart = () => {
  const chartRef = useRef(null);
  const [tableInputs, setTableInputs] = useState([]);
  const [attributes, setAttributes] = useState({
    colorScheme: "nivo",
    innerRadius: 0.5,
    padAngle: 0,
    arcLabels: true,
    arcLinkLabels: true,
  });
  const [data, setData] = useState([
    {
      id: "rust",
      label: "rust",
      value: 64,
      color: "hsl(0, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 55,
      color: "hsl(275, 70%, 50%)",
    },
    {
      id: "erlang",
      label: "erlang",
      value: 490,
      color: "hsl(11, 70%, 50%)",
    },
    {
      id: "python",
      label: "python",
      value: 211,
      color: "hsl(20, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 305,
      color: "hsl(180, 70%, 50%)",
    },
  ]);

  const submitData = () => {
    let tInputs = tableInputs;
    tInputs = tInputs.map((input) => {
      return { id: input.x, label: input.x, value: input.y };
    });

    setData(tInputs);
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
          Pie Chart
        </Text>
        <HStack>
          <Text fontSize="1em">Export : </Text>
          <Select
            width="6em"
            color="grey"
            variant="outline"
            onChange={(e) => {
              switch (e.target.value) {
                case "svg":
                  generateSVG();
                  break;
                case "png":
                  generatePNG();
                  break;
                case "pdf":
                  generateSVG();
                  break;
              }
            }}
          >
            <option value="svg">SVG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </Select>
        </HStack>
      </HStack>

      <Flex width="98vw" overflowX="auto">
        <div ref={chartRef}>
          <Flex
            height="60vh"
            width={{ base: 1000, lg: "95vw" }}
            alignSelf="center"
          >
            <ResponsivePie
              data={data}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={attributes.innerRadius}
              padAngle={attributes.padAngle}
              cornerRadius={4}
              colors={{ scheme: attributes.colorScheme }}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              enableArcLinkLabels={attributes.arcLinkLabels}
              enableArcLabels={attributes.arcLabels}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={{ from: "color" }}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 6]] }}
              defs={[]}
              fill={[]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </Flex>
        </div>
      </Flex>
      <BarChartControls
        attributes={attributes}
        tableInputs={tableInputs}
        setAttributes={setAttributes}
        setTableInputs={setTableInputs}
        submitData={submitData}
      />
    </Flex>
  );
};

export default PieChart;
