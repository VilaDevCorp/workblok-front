import { useEffect, useRef, useState } from 'react';
import { VilaLayout } from '../components/ui/VilaLayout';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { ChartData, StatsResult } from '../types/entities';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useApiError } from '../hooks/useApiError';
import { useSnackbar } from '../hooks/useSnackbar';
import moment from 'moment';
import { StatElement } from '../components/atom/StatElement';
import { VilaIcon } from '../components/ui/VilaIcon';
import { ToogleOption, VilaToogle } from '../components/ui/VilaToogle';
import { YearSelector } from '../components/atom/YearSelector';
import { SelectOption } from '../types/types';
import { VilaSelect } from '../components/ui/VilaSelect';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ActivityIcon, activities } from '../components/atom/ActivityIcon';
import { conf } from '../conf';


const monthOptions: SelectOption[] = [
    { label: 'January', value: '0' },
    { label: 'February', value: '1' },
    { label: 'March', value: '2' },
    { label: 'April', value: '3' },
    { label: 'May', value: '4' },
    { label: 'June', value: '5' },
    { label: 'July', value: '6' },
    { label: 'August', value: '7' },
    { label: 'September', value: '8' },
    { label: 'October', value: '9' },
    { label: 'November', value: '10' },
    { label: 'December', value: '11' },
];

export function StatsScreen() {

    const { getStats } = useApi();
    const { user } = useAuth()
    const snackbar = useSnackbar()
    const navigate = useNavigate()
    const { setError } = useApiError({ navigate })

    const { setIsLoading, } = useMisc()
    const [stats, setStats] = useState<StatsResult | undefined>(undefined)
    const [customInterval, setCustomInterval] = useState<number | undefined>(1)
    const [year, setYear] = useState<number | undefined>(moment().get('year'))
    const [yearChanged, setYearChanged] = useState<boolean>(false)
    const [month, setMonth] = useState<number | undefined>(moment().get('month'))
    const [monthChanged, setMonthChanged] = useState<boolean>(false)
    const [week, setWeek] = useState<number | undefined>()
    const [weekOptions, setWeekOptions] = useState<ToogleOption[]>([])
    const [timeDivision, setTimeDivision] = useState<string>('')
    const [chartData, setChartData] = useState<ChartData[]>([])
    const firstRender = useRef(true)


    useEffect(() => {
        if (!firstRender.current) {
            onGetStats()
        }
    }, [week])

    useEffect(() => {
        if (!firstRender.current) {
            setMonth(undefined)
            setWeek(undefined)
            onGetStats()
        }
    }, [yearChanged])

    useEffect(() => {
        if (!firstRender.current) {
            setWeek(undefined)
            onGetStats()
        }
    }, [monthChanged])

    useEffect(() => {
        onGetStats()
    }, [week])

    useEffect(() => {
        if (!firstRender.current) {
            if (customInterval) {
                setYear(moment().get('year'))
                onChangeMonth(moment().get('month'))
            } else {
                onChangeYear(undefined)
            }
        }
    }, [customInterval])

    useEffect(() => {
        firstRender.current = false
        let startMonthDate = moment(`01/${moment().get('month') + 1}/${moment().get('year')}`, conf.dateFormat);
        if (startMonthDate.get('day') !== 1) {
            let dayOffset = 1                //If its sunday
            if (startMonthDate.get('day') !== 0) { //If its not sunday
                dayOffset = 8 - startMonthDate.get('day')
            }
            startMonthDate.add(dayOffset, 'day')
        }

        if (moment().isBefore(startMonthDate)) { //If our current date still belong to the previous month last week
            const changedMonth = moment().get('month') === 0 ? 11 : moment().get('month') - 1
            const changedYear = moment().get('month') === 0 ? moment().get('year') - 1 : moment().get('year')
            setMonth(changedMonth)
            setYear(changedYear)
            startMonthDate = moment(`01/${changedMonth + 1}/${changedYear}`,
                conf.dateFormat);
            if (startMonthDate.get('day') !== 1) {
                let dayOffset = 1                //If its sunday
                if (startMonthDate.get('day') !== 0) { //If its not sunday
                    dayOffset = 8 - startMonthDate.get('day')
                }
                startMonthDate.add(dayOffset, 'day')
            }
        }
        let nWeek = 0
        do {
            if (moment().isBefore(startMonthDate.add(7, 'day'))) {
                setWeek(nWeek)
                return
            }
            nWeek += 1
        } while (nWeek < 5)
    }, [])


    const onChangeYear = (value: number | undefined) => {
        setYear(value)
        setYearChanged((old) => !old)
    }

    const onChangeMonth = (value: number | undefined) => {
        setMonth(value)
        setMonthChanged((old) => !old)
    }


    const pieChartColors = [
        '#9E2B41', // Darker Red
        '#1A5175', // Darker Blue
        '#9B8630', // Darker Yellow
        '#9E5027', // Darker Orange
        '#227272', // Darker Teal
        '#4D2F7A', // Darker Purple
        '#9E822E', // Darker Gold
        '#008066', // Darker Green
        '#9E4C62', // Darker Pink
        '#573D64', // Darker Indigo
    ];


    const onGetStats = async () => {
        setIsLoading(() => true)
        if (user) {
            try {
                const result = await getStats({ userId: user.id, year, month: month != undefined ? month + 1 : undefined, week })
                if (year) {
                    const startMoment = moment(result.realStartDate, conf.dateInputFormat)
                    const finishMoment = moment(result.realFinishDate, conf.dateInputFormat)

                    const startDay = startMoment.get('date')
                    const finishDay = finishMoment.get('date')
                    const startMonth = monthOptions.find((month) => parseInt(month.value) === moment(result.realStartDate, conf.dateInputFormat).get('month'))?.label
                    const finishMonth = monthOptions.find((month) => parseInt(month.value) === moment(result.realFinishDate, conf.dateInputFormat).get('month'))?.label
                    const startYear = startMoment.get('year')
                    const finishYear = finishMoment.get('year')

                    setTimeDivision(`${startDay} ${startMonth} ${startYear} - ${finishDay} ${finishMonth} ${finishYear}`)
                } else {
                    setTimeDivision('')
                }
                if (result.nWeeksOfMonth) {
                    const weekOptions: ToogleOption[] = [{ label: 'Total', value: undefined }]
                    for (let i = 0; i < result.nWeeksOfMonth; i++) {
                        weekOptions.push({ label: `Week ${i + 1} `, value: i })
                        setWeekOptions(weekOptions)
                    }
                } else {
                    setWeekOptions([])
                }
                setStats(result)
                if (result.activityInfo) {
                    const formattedChartData: ChartData[] = []
                    result.activityInfo.map((activity) => formattedChartData.push({
                        name: JSON.stringify({ name: activity.activityName, icon: activity.activityIcon }), value: activity.nTimes
                    }))
                    setChartData(formattedChartData)
                }
            } catch (e) {
                setError(e as Error)
            } finally {
                setIsLoading(false)
            }
        }
    }
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }:
        {
            cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number,
            index: number, name: string
        }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            percent > 0.1 ?
                <g>
                    <text x={x} y={y > cy ? y + 10 : y - 10} fill="white" style={{ fontSize: 15, fontWeight: 'bolder' }} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${JSON.parse(name).name} `}
                    </text>
                </g>
                : undefined
        );
    };

    const CustomTooltip = (props: TooltipProps<ValueType, NameType>) => {
        let actName, actIcon
        if (props.active && props.payload && props.payload.length) {
            const { name: actNameObj = "", icon: actIconObj = "" } = props.payload[0].name ? JSON.parse(props.payload[0].name.toString()) : {}
            actName = actNameObj
            actIcon = actIconObj

            return (
                <div className='bg-background-200 rounded-lg px-2 py-2'>
                    <div className='text-lightFont-400 flex gap-2'>
                        {`${actName} `}
                        {actIcon && <ActivityIcon type={actIcon} />}
                    </div>
                    <div className='text-lightFont-400 flex gap-2'>
                        {`${props.payload[0].value} times`}
                    </div>

                </div>
            )
        } else {
            return <></>
        }
    }

    return (
        <VilaLayout>
            <div className='flex flex-col gap-2 w-full'>
                <div className='flex justify-center lg:justify-between items-center align-middle flex-wrap gap-4'>
                    <div className='w-full lg:w-[400px]'>
                        <VilaToogle option={customInterval} setOption={setCustomInterval} optionList={[{ label: 'All time', value: undefined }, { label: 'Custom interval', value: 1 }]} />
                    </div>
                    {year &&
                        <div className='flex gap-10 w-full lg:w-[400px] justify-center'>
                            <YearSelector value={year} setValue={onChangeYear} />
                            <VilaSelect noEmpty={false} emptyLabel='All year' options={monthOptions} value={month != undefined ? month.toString() : ''} setValue={(value) => onChangeMonth(Number.parseInt(value))} />
                        </div>
                    }
                    {timeDivision &&
                        <div className='text-lightFont-400 flex justify-center items-center text-lg md:w-full'>
                            {timeDivision}
                        </div>
                    }
                </div>
                {month !== undefined && <VilaToogle option={week} setOption={setWeek} optionList={weekOptions} />}
                <div className='flex mt-4 h-full flex-col'>
                    <div className='bg-background-300 rounded-lg px-3 py-2 flex flex-col gap-4 w-full'>
                        {stats?.scheduledDans !== undefined && stats?.scheduledDans !== null &&
                            <StatElement label='Scheduled dans'
                                value={<span className='flex gap-1 items-center'>{stats.scheduledDans.toString()}<VilaIcon className='text-coinIcon' type='coin' /></span>} />
                        }
                        {stats?.completedDans !== undefined && stats?.completedDans !== null &&
                            <StatElement label='Completed dans'
                                value={<span className='flex gap-1 items-center'>{stats.completedDans.toString()}<VilaIcon className='text-coinIcon' type='coin' /></span>} />
                        }
                        {stats?.completedPercentage !== undefined && stats?.completedPercentage !== null &&
                            <StatElement
                                label='Completed percentage'
                                value={`${stats.completedPercentage.toFixed(2)}% `}
                            />
                        }
                        {stats?.dailyAvgScheduled !== undefined && stats?.dailyAvgScheduled !== null &&
                            <StatElement
                                label='Daily average scheduled dans'
                                value={<span className='flex gap-1 items-center'>{stats.dailyAvgScheduled.toFixed(2).toString()}<VilaIcon className='text-coinIcon' type='coin' /></span>} />

                        }
                        {stats?.dailyAvgCompleted !== undefined && stats?.dailyAvgCompleted !== null &&
                            <StatElement
                                label='Daily average completed dans'
                                value={<span className='flex gap-1 items-center'>{stats.dailyAvgCompleted.toFixed(2).toString()}<VilaIcon className='text-coinIcon' type='coin' /></span>} />
                        }
                    </div>
                    {stats?.activityInfo && stats.activityInfo.length > 0 ?
                        <ResponsiveContainer width={'100%'} height={'100%'} minHeight={'250px'}>
                            <PieChart>
                                <Pie stroke='#060f14' data={chartData} dataKey={'value'} nameKey={"name"} cx="50%" cy="50%" labelLine={false}
                                    label={renderCustomizedLabel} >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell - ${index} `} fill={pieChartColors[index % pieChartColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        : undefined}
                </div>
            </div>
        </VilaLayout >
    )
}
