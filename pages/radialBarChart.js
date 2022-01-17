import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import RadialBarChartControls from "../components/RadialBarChartControls";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const RadialBarChart = () => {
  const chartRef = useRef(null);
  const [fieldNames, setFieldNames] = useState([""]);
  const [fieldData, setFieldData] = useState([]);
  const [attributes, setAttributes] = useState({
    colorScheme: "nivo",
    cornerRadius: 2,
    padAngle: 0,
    enableRadialGrid: true,
    enableCircularGrid: true,
    legendX: "",
    legendY: "",
  });
  const [finalData, setFinalData] = useState([
    {
      id: "Supermarket",
      data: [
        {
          x: "Vegetables",
          y: 221,
        },
        {
          x: "Fruits",
          y: 86,
        },
        {
          x: "Meat",
          y: 269,
        },
        {
          x: "Fish",
          y: 142,
        },
      ],
    },
    {
      id: "Combini",
      data: [
        {
          x: "Vegetables",
          y: 236,
        },
        {
          x: "Fruits",
          y: 133,
        },
        {
          x: "Meat",
          y: 208,
        },
        {
          x: "Fish",
          y: 140,
        },
      ],
    },
    {
      id: "Online",
      data: [
        {
          x: "Vegetables",
          y: 79,
        },
        {
          x: "Fruits",
          y: 45,
        },
        {
          x: "Meat",
          y: 44,
        },
        {
          x: "Fish",
          y: 151,
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
    console.log(finalData)
  };

  return (
    <Flex flexDirection="column" bgColor="gray.900">
      <HStack mx="2em" mt="2em" justify="space-between">
        <Text fontSize="1.5em" fontWeight={500} color="white">
          Radial Bar Chart
        </Text>
        <HStack>
          <Text fontSize="1em" color="white">
            Export :
          </Text>
          <Select
            width="6em"
            placeholder="Format"
            color="gray.500"
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
            width={{ base: 1450, lg: "95vw" }}
            alignSelf="center"
          >
            <ResponsiveRadialBar
              data={finalData}
              colors={{ scheme: attributes.colorScheme }}
              theme={{ textColor: "#ffffff" }}
              valueFormat=">-.2f"
              padding={0.4}
              padAngle={attributes.padAngle}
              cornerRadius={attributes.cornerRadius}
              enableRadialGrid={attributes.enableRadialGrid}
              enableCircularGrid={attributes.enableCircularGrid}
              margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
              radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              circularAxisOuter={{
                tickSize: 5,
                tickPadding: 12,
                tickRotation: 0,
              }}
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  justify: false,
                  translateX: 80,
                  translateY: 0,
                  itemsSpacing: 6,
                  itemDirection: "left-to-right",
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  symbolSize: 18,
                  symbolShape: "square",
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

      <RadialBarChartControls
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

export default RadialBarChart;
