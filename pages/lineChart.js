import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import LineChartControls from "../components/LineChartControls";
import { ResponsiveLine } from "@nivo/line";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const LineChart = () => {
  const chartRef = useRef(null);
  const [fieldNames, setFieldNames] = useState([""]);
  const [fieldData, setFieldData] = useState([]);
  const [attributes, setAttributes] = useState({
    curveStyle: "cardinal",
    colorScheme: "nivo",
    enableArea: false,
    enablePoints: false,
    enableGridX: true,
    enableGridY: true,
    axisBottom: true,
    axisLeft: true,
    lineWidth: 2,
    areaOpacity: 0.1,
    pointSize: 6,
    pointBorder: 2,
    legendX: "",
    legendY: "",
  });
  const [finalData, setFinalData] = useState([
    {
      id: "japan",
      data: [
        {
          x: "plane",
          y: 68,
        },
        {
          x: "helicopter",
          y: 52,
        },
        {
          x: "boat",
          y: 262,
        },
        {
          x: "train",
          y: 89,
        },
        {
          x: "subway",
          y: 269,
        },
        {
          x: "bus",
          y: 110,
        },
        {
          x: "car",
          y: 173,
        },
        {
          x: "moto",
          y: 9,
        },
        {
          x: "bicycle",
          y: 1,
        },
        {
          x: "horse",
          y: 231,
        },
        {
          x: "skateboard",
          y: 99,
        },
        {
          x: "others",
          y: 258,
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
          Line Chart
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
            <ResponsiveLine
              data={finalData}
              theme={{ textColor: "#ffffff" }}
              margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={
                attributes.axisBottom
                  ? {
                      orient: "bottom",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendX,
                      legendOffset: 36,
                      legendPosition: "middle",
                    }
                  : null
              }
              axisLeft={
                attributes.axisLeft
                  ? {
                      orient: "left",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: attributes.legendY,
                      legendOffset: -40,
                      legendPosition: "middle",
                    }
                  : null
              }
              curve={attributes.curveStyle}
              colors={{ scheme: attributes.colorScheme }}
              enableGridX={attributes.enableGridX}
              enableGridY={attributes.enableGridY}
              lineWidth={attributes.lineWidth}
              enableArea={attributes.enableArea}
              areaOpacity={attributes.areaOpacity}
              enablePoints={attributes.enablePoints}
              pointSize={attributes.pointSize}
              pointColor={{ theme: "background" }}
              pointBorderWidth={attributes.pointBorder}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
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

      <LineChartControls
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
