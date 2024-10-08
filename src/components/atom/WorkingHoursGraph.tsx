import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  TooltipProps,
} from "recharts";
import { GraphElement } from "../../types/types";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useColorMode } from "@chakra-ui/react";

const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
  let actName, actIcon;
  const { colorMode } = useColorMode();
  if (props.active && props.payload && props.payload.length) {
    return (
      <div
        className={`${
          colorMode === "dark" ? "bg-primary-900" : "bg-background"
        } rounded-lg px-2 py-2`}
      >
        <p>{props.label}</p>
        <div className="text-background-900 flex gap-2">
          <span>{"Working:"}</span>
          {`${props.payload[0].value} h`}
        </div>
        <div className="text-error flex gap-2">
          <span>{"Distraction:"}</span>
          {`${props.payload[1].value} h `}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export const WorkingHoursGraph = ({ data }: { data: GraphElement[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={"300px"}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          cursor={"pointer"}
          type="monotone"
          dataKey="workingHours"
          stackId="1"
          strokeOpacity={0}
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="distractionHours"
          stackId="1"
          strokeOpacity={0}
          stroke="#8884d8"
          fill="red"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
