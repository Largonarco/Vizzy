import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import BarChartControls from "../components/BumpChartControls";
import { ResponsiveBump } from "@nivo/bump";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const BumpChart = () => {
  const chartRef = useRef(null);
  const [fieldNames, setFieldNames] = useState([""]);
  const [fieldData, setFieldData] = useState([]);
  const [attributes, setAttributes] = useState({
    colorScheme: "spectral",
    lineWidth: 4,
    pointSize: 6,
    pointBorder: 2,
    xPadding: 0.5,
    yPadding: 0.5,
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
      id: "Serie 1",
      data: [
        {
          x: 2000,
          y: 6,
        },
        {
          x: 2001,
          y: 7,
        },
        {
          x: 2002,
          y: 6,
        },
        {
          x: 2003,
          y: 5,
        },
        {
          x: 2004,
          y: 5,
        },
      ],
    },
    {
      id: "Serie 2",
      data: [
        {
          x: 2000,
          y: 10,
        },
        {
          x: 2001,
          y: 12,
        },
        {
          x: 2002,
          y: 10,
        },
        {
          x: 2003,
          y: 2,
        },
        {
          x: 2004,
          y: 6,
        },
      ],
    },
    {
      id: "Serie 3",
      data: [
        {
          x: 2000,
          y: 12,
        },
        {
          x: 2001,
          y: 4,
        },
        {
          x: 2002,
          y: 7,
        },
        {
          x: 2003,
          y: 7,
        },
        {
          x: 2004,
          y: 7,
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
          Bump Chart
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
            <ResponsiveBump
              data={finalData}
              colors={{ scheme: attributes.colorScheme }}
              theme={{ textColor: "#ffffff" }}
              lineWidth={4}
              xOuterPadding={attributes.xPadding}
              yOuterPadding={attributes.yPadding}
              activeLineWidth={6}
              inactiveLineWidth={3}
              inactiveOpacity={0.15}
              pointSize={attributes.pointSize}
              activePointSize={16}
              inactivePointSize={0}
              pointColor={{ theme: "background" }}
              pointBorderWidth={attributes.pointBorder}
              activePointBorderWidth={3}
              pointBorderColor={{ from: "serie.color" }}
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "",
                legendPosition: "middle",
                legendOffset: -36,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: attributes.legendX,
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: attributes.legendY,
                legendPosition: "middle",
                legendOffset: -40,
              }}
              margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
              enableGridX={attributes.enableGridX}
              enableGridY={attributes.enableGridY}
              axisRight={null}
            />
          </Flex>
        </div>
      </Flex>
      <BarChartControls
        fieldNames={fieldNames}
        fieldData={fieldData}
        attributes={attributes}
        setFieldNames={setFieldNames}
        setFieldData={setFieldData}
        setAttribute={setAttribute}
        setBooleanAttribute={setBooleanAttribute}
        submitData={submitData}
      />
    </Flex>
  );
};

export default BumpChart;
