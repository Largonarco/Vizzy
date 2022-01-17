import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import ScatterPlotControls from "../components/ScatterPlotControls";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const LineChart = () => {
  const chartRef = useRef(null);
  const [fieldNames, setFieldNames] = useState([""]);
  const [fieldData, setFieldData] = useState([]);
  const [attributes, setAttributes] = useState({
    curveStyle: "cardinal",
    colorScheme: "nivo",
    enableGridX: true,
    enableGridY: true,
    axisBottom: true,
    axisLeft: true,
    nodeSize: 8,
    legendX: "weight",
    legendY: "size",
  });
  const [finalData, setFinalData] = useState([
    {
      id: "group A",
      data: [
        {
          x: 6,
          y: 86,
        },
        {
          x: 75,
          y: 64,
        },
        {
          x: 1,
          y: 67,
        },
        {
          x: 63,
          y: 86,
        },
        {
          x: 43,
          y: 72,
        },
      ],
    },
    {
      id: "group B",
      data: [
        {
          x: 29,
          y: 64,
        },
        {
          x: 77,
          y: 30,
        },
        {
          x: 85,
          y: 35,
        },
        {
          x: 89,
          y: 68,
        },
        {
          x: 83,
          y: 91,
        },
      ],
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

  const submitData = () => {
    const fNames = fieldNames;
    const fData = fieldData;

    const data = [];
    fNames.forEach((name, index) => {
      const obj = {
        id: name,
        data: fData
          .filter((data) => data.field === index)
          .map((data) => {
            return { x: data.x, y: data.y };
          }),
      };

      data.push(obj);
    });

    setFinalData(data);
  };

  return (
    <Flex flexDirection="column" bgColor="gray.900">
      <HStack mx="2em" mt="2em" justify="space-between">
        <Text fontSize="1.5em" fontWeight={500} color="white">
          Scatter Plot
        </Text>
        <HStack>
          <Text fontSize="1em" color="white">
            Export :
          </Text>
          <Select
            width="6em"
            color="gray.500"
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
            }}
          >
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
            alignSelf="center"
          >
            <ResponsiveScatterPlot
              data={finalData}
              theme={{ textColor: "#ffffff" }}
              margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
              xScale={{ type: "linear", min: 0, max: "auto" }}
              enableGridX={attributes.enableGridX}
              xFormat=">-.2f"
              yScale={{ type: "linear", min: 0, max: "auto" }}
              enableGridY={attributes.enableGridY}
              yFormat=">-.2f"
              blendMode="normal"
              nodeSize={attributes.nodeSize}
              colors={{ scheme: attributes.colorScheme }}
              axisTop={null}
              axisRight={null}
              axisBottom={
                attributes.axisBottom
                  ? {
                      orient: "bottom",
                      tickSize: 10,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendX,
                      legendOffset: 46,
                      legendPosition: "middle",
                    }
                  : null
              }
              axisLeft={
                attributes.axisLeft
                  ? {
                      orient: "left",
                      tickSize: 10,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendY,
                      legendOffset: -60,
                      legendPosition: "middle",
                    }
                  : null
              }
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 130,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 12,
                  itemsSpacing: 5,
                  itemDirection: "left-to-right",
                  symbolSize: 12,
                  symbolShape: "circle",
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
            />
          </Flex>
        </div>
      </Flex>

      <ScatterPlotControls
        attributes={attributes}
        fieldNames={fieldNames}
        fieldData={fieldData}
        setFieldNames={setFieldNames}
        setFieldData={setFieldData}
        setAttribute={setAttribute}
        setBooleanAttribute={setBooleanAttribute}
        submitData={submitData}
      />
    </Flex>
  );
};

export default LineChart;
