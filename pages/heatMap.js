import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import HeatMapControls from "../components/HeatMapControls";
import { ResponsiveHeatMap } from "@nivo/heatmap";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const HeatMap = () => {
  const chartRef = useRef(null);
  const [fieldNames, setFieldNames] = useState([""]);
  const [fieldData, setFieldData] = useState([]);
  const [attributes, setAttributes] = useState({
    colorScheme: "red_yellow_blue",
    enableGridX: true,
    enableGridY: true,
    axisTop: true,
    axisLeft: true,
    xOuterPadding: 0,
    xInnerPadding: 0,
    yOuterPadding: 0,
    yInnerPadding: 0,
    borderRadius: 0,
    legendX: "",
    legendY: "country",
  });
  const [finalData, setFinalData] = useState([
    {
      id: "Japan",
      data: [
        {
          x: "Train",
          y: -12927,
        },
        {
          x: "Subway",
          y: 76803,
        },
        {
          x: "Bus",
          y: 76275,
        },
        {
          x: "Car",
          y: -5335,
        },
        {
          x: "Boat",
          y: 39454,
        },
        {
          x: "Moto",
          y: -73264,
        },
        {
          x: "Moped",
          y: 7051,
        },
        {
          x: "Bicycle",
          y: 65276,
        },
        {
          x: "Others",
          y: 79207,
        },
      ],
    },
    {
      id: "France",
      data: [
        {
          x: "Train",
          y: -52686,
        },
        {
          x: "Subway",
          y: 43481,
        },
        {
          x: "Bus",
          y: 97082,
        },
        {
          x: "Car",
          y: 68901,
        },
        {
          x: "Boat",
          y: 63507,
        },
        {
          x: "Moto",
          y: 56684,
        },
        {
          x: "Moped",
          y: -78362,
        },
        {
          x: "Bicycle",
          y: 46646,
        },
        {
          x: "Others",
          y: 71076,
        },
      ],
    },
    {
      id: "US",
      data: [
        {
          x: "Train",
          y: -13068,
        },
        {
          x: "Subway",
          y: 62255,
        },
        {
          x: "Bus",
          y: -3972,
        },
        {
          x: "Car",
          y: 70177,
        },
        {
          x: "Boat",
          y: 28000,
        },
        {
          x: "Moto",
          y: 4507,
        },
        {
          x: "Moped",
          y: -36759,
        },
        {
          x: "Bicycle",
          y: 54363,
        },
        {
          x: "Others",
          y: -1701,
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
          Heat Map
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
            <ResponsiveHeatMap
              data={finalData}
              theme={{ textColor: "#ffffff" }}
              margin={{ top: 60, right: 100, bottom: 60, left: 100 }}
              xOuterPadding={attributes.xOuterPadding}
              xInnerPadding={attributes.xInnerPadding}
              yOuterPadding={attributes.yOuterPadding}
              yInnerPadding={attributes.yInnerPadding}
              valueFormat=">-.2s"
              axisTop={
                attributes.axisTop
                  ? {
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendX,
                      legendOffset: -40,
                      legendPosition: "middle",
                    }
                  : null
              }
              axisRight={
                attributes.axisLeft
                  ? {
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendY,
                      legendOffset: 70,
                      legendPosition: "middle",
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
                      legendOffset: -70,
                      legendPosition: "middle",
                    }
                  : null
              }
              colors={{
                type: "diverging",
                scheme: attributes.colorScheme,
                divergeAt: 0.5,
              }}
              emptyColor="#555555"
              borderRadius={attributes.borderRadius}
            />
          </Flex>
        </div>
      </Flex>

      <HeatMapControls
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

export default HeatMap;
