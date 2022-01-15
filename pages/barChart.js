import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { useState, useRef } from "react";
import BarChartControls from "../components/BarChartControls";
import { ResponsiveBar } from "@nivo/bar";

import { Flex, HStack, Select, Text } from "@chakra-ui/react";

const BarChart = () => {
  const chartRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [groups, setGroups] = useState([{}]);
  const [keys, setKeys] = useState(["hot dog"]);
  const [indexingKey, setIndexingKey] = useState("country");
  const [tableInputs, setTableInputs] = useState([]);
  const [attributes, setAttributes] = useState({
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
  const [data, setData] = useState([
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
    const groupss = groups;
    const tInputs = tableInputs;

    tInputs.forEach((input) => {
      groupss[input.field] = { ...groupss[input.field], [input.x]: input.y };
    });

    setGroups(groupss);
    setData(groups);
    setKeys(Object.keys(groups[0]).splice(1));
    setIndexingKey(Object.keys(groups[0]).splice(0, 1).toString());
    setCounter((counter) => counter + 1);
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
            <ResponsiveBar
              key={counter}
              data={data}
              keys={keys}
              indexBy={indexingKey}
              groupMode={attributes.grouping}
              layout={attributes.orientation}
              margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
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
        groups={groups}
        tableInputs={tableInputs}
        setGroups={setGroups}
        setTableInputs={setTableInputs}
        setAttribute={setAttribute}
        setBooleanAttribute={setBooleanAttribute}
        submitData={submitData}
      />
    </Flex>
  );
};

export default BarChart;
