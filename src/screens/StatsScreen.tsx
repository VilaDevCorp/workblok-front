import { useQuery } from "react-query";
import { Layout } from "../components/organism/Layout";
import { Section } from "../components/organism/Section";
import { useApi } from "../hooks/useApi";
import {
  getTimeInHoursMinutesSeconds,
  getTimeInHoursMinutesSecondsString,
} from "../utils/utilFunctions";
import { WorkingHoursGraph } from "../components/atom/WorkingHoursGraph";
import { conf } from "../conf";
import moment, { months, weekdays } from "moment";
import { useEffect, useState } from "react";
import { YearSelector } from "../components/atom/YearSelector";
import {
  Select,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { StatsPanel } from "../components/molecule/StatsPanel";
import { useAuth } from "../hooks/useAuth";
import { TagSelector } from "../components/molecule/TagSelector";

export function StatsScreen() {
  const { getStats } = useApi();
  const [year, setYear] = useState<number>(moment().year());
  const [month, setMonth] = useState<number>(moment().month());
  const [week, setWeek] = useState<number>(0);
  const [tag, setTag] = useState<string>("");

  const {
    data: statsData,
    isLoading: statsIsLoading,
    isError: statsIsError,
  } = useQuery({
    queryKey: ["getStats", year, month, week, tag],
    queryFn: () =>
      getStats({
        year,
        month: month < 0 ? undefined : month + 1,
        week: week < 0 ? undefined : week,
        tag: tag === "" ? undefined : tag,
      }),
  });

  useEffect(() => {
    setWeek(-1);
  }, [month]);

  return (
    <Layout>
      <Section title="Stats" containerClasses="flex flex-col gap-4">
        <div className="flex">
          <YearSelector year={year} setYear={setYear} />
          <Select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            <option value={-1}>All</option>
            {months().map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </Select>
        </div>
        <TagSelector tag={tag} setTag={setTag} tags={statsData?.tags || []} />
        {statsIsLoading ? (
          <div className="h-20 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            {statsData?.yearInfo && (
              <WorkingHoursGraph
                data={months().map((monthName, monthPosition) => {
                  return {
                    name: monthName.substring(0, 3),
                    workingHours:
                      Number(
                        statsData.yearInfo[
                          monthPosition - 1
                        ]?.workingTime.toFixed(2)
                      ) || 0,
                    distractionHours:
                      Number(
                        statsData.yearInfo[
                          monthPosition - 1
                        ]?.distractionTime.toFixed(2)
                      ) || 0,
                  };
                })}
              />
            )}
            {(statsData?.monthInfo || statsData?.weekInfo) && (
              <>
                <Tabs isFitted index={week + 1} isLazy>
                  <TabList className="overflow-x-auto overflow-y-hidden">
                    <Tab onClick={() => setWeek(-1)}>All</Tab>
                    {Array.from({ length: statsData.nWeeksOfMonth }, (v, i) => {
                      return (
                        <Tab key={i} onClick={() => setWeek(i)}>{`${
                          i + 1
                        } week`}</Tab>
                      );
                    })}
                  </TabList>
                  <TabPanels>
                    <TabPanel className="!px-0">
                      <WorkingHoursGraph
                        data={Array.from(
                          { length: statsData.nWeeksOfMonth },
                          (v, i) => {
                            return {
                              name: `${i + 1} wk`,
                              workingHours: Number(
                                statsData.monthInfo && statsData.monthInfo[i]
                                  ? statsData.monthInfo[i].workingTime.toFixed(
                                      2
                                    )
                                  : 0
                              ),
                              distractionHours: Number(
                                statsData.monthInfo && statsData.monthInfo[i]
                                  ? statsData.monthInfo[
                                      i
                                    ].distractionTime.toFixed(2)
                                  : 0
                              ),
                            };
                          }
                        )}
                      />
                    </TabPanel>
                    {Array.from({ length: statsData.nWeeksOfMonth }, (v, i) => {
                      return (
                        <TabPanel key={i} className="!px-0">
                          <WorkingHoursGraph
                            data={
                              statsData.weekInfo &&
                              Array.from({ length: 7 }, (v, i) => {
                                return {
                                  name: weekdays(i + 1).substring(0, 3),
                                  workingHours:
                                    Number(
                                      statsData.weekInfo[
                                        i + 1
                                      ]?.workingTime.toFixed(2)
                                    ) || 0,
                                  distractionHours:
                                    Number(
                                      statsData.weekInfo[
                                        i + 1
                                      ]?.distractionTime.toFixed(2)
                                    ) || 0,
                                };
                              })
                            }
                          />
                        </TabPanel>
                      );
                    })}
                  </TabPanels>
                </Tabs>
              </>
            )}
            <StatsPanel statsData={statsData} />
          </>
        )}
      </Section>
    </Layout>
  );
}
