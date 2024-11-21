"use client"

import { getHistoryPeriodResponseType } from "@/app/api/history-periods/route";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Period } from "@/lib/types";

interface Props {
    period: Period;
    setPeriod: (period: Period) => void;
    years: getHistoryPeriodResponseType
}

function YearSelector({period,setPeriod,years} : Props) {
  return (
    <Select value={period.year.toString()} onValueChange={(value) => {setPeriod({month: period.month, year: parseInt(value)})}}>
        <SelectTrigger className="w-[180px]">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                    {year}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default YearSelector