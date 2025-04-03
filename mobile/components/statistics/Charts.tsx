import { View, Dimensions } from "react-native";
import { Timeline } from "@/interfaces/statistics";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

interface Props {
  data: Array<lineDataItem>;
  timePeriod: Timeline;
}

const weekValues = { width: 0.815, spacing: 0.125, fontSize: 14 };
const monthValues = { width: 0.2, spacing: 0.1, fontSize: 12 };
const yearValues = { width: 0.2, spacing: 0.1, fontSize: 14 };

const windowWidth = Dimensions.get("window").width;

export default function Charts({ data, timePeriod }: Props) {
  return (
    <View>
      {timePeriod === "Week" && (
        <LineChart
          data={data}
          width={windowWidth * weekValues.width}
          spacing={windowWidth * weekValues.spacing}
          xAxisLabelTextStyle={{ fontSize: weekValues.fontSize }}
          xAxisIndicesColor={"transparent"}
          yAxisIndicesColor={"transparent"}
          endSpacing={0}
        />
      )}

      {timePeriod === "Month" && (
        <LineChart
          data={data}
          width={windowWidth * monthValues.width}
          spacing={windowWidth * monthValues.spacing}
          xAxisLabelTextStyle={{ fontSize: monthValues.fontSize }}
          xAxisIndicesColor={"transparent"}
          yAxisIndicesColor={"transparent"}
          endSpacing={0}
        />
      )}

      {timePeriod === "Year" && (
        <LineChart
          data={data}
          width={windowWidth * yearValues.width}
          spacing={windowWidth * yearValues.spacing}
          xAxisLabelTextStyle={{ fontSize: yearValues.fontSize }}
          xAxisIndicesColor={"transparent"}
          yAxisIndicesColor={"transparent"}
          endSpacing={0}
        />
      )}
    </View>
  );
}
