import { View, Dimensions } from "react-native";
import { Timeline } from "@/interfaces/statistics";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";

interface Props {
  data: Array<lineDataItem>;
  timePeriod: Timeline;
}

const spacingValues = {
  Week: { width: 0.79, spacing: 0.12, fontSize: 14 },
  Month: { width: 0.79, spacing: 0.17, fontSize: 14 },
  Year: { width: 0.79, spacing: 0.064, fontSize: 10 },
};

const windowWidth = Dimensions.get("window").width;

export default function Charts({ data, timePeriod }: Props) {
  const { width, spacing, fontSize } = spacingValues[timePeriod];
  return (
    <View>
      <LineChart
        data={data}
        width={windowWidth * width}
        spacing={windowWidth * spacing}
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
