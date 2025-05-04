import { View, useWindowDimensions } from "react-native";
import { useMemo } from "react";
import { Timeline } from "@/interfaces/statistics";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";

interface Props {
  data: Array<lineDataItem>;
  timePeriod: Timeline;
}

const spacingValues = {
  Month: { width: 0.79, spacing: 0.17, fontSize: 14 },
  Year: { width: 0.79, spacing: 0.064, fontSize: 10 },
  All: { width: 0.79, spacing: 0.064, fontSize: 10 },
};

export default function Charts({ data, timePeriod }: Props) {
  const { fontSize } = spacingValues[timePeriod];
  const { width: windowWidth } = useWindowDimensions();

  const chartConfig = useMemo(() => {
    const { width, spacing } = spacingValues[timePeriod];
    return {
      width: windowWidth * width,
      spacing: windowWidth * spacing,
    };
  }, [timePeriod, windowWidth]);

  return (
    <View>
      <LineChart
        data={data}
        width={chartConfig.width}
        spacing={chartConfig.spacing}
        xAxisLabelTextStyle={{ fontSize }}
        endSpacing={10}
        initialSpacing={15}
        color={Colors.light.specialBlue}
        xAxisColor={"transparent"}
        yAxisColor={"transparent"}
      />
    </View>
  );
}
