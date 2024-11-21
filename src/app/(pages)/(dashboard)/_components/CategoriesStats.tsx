"use client"

import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route"
import SkeletonWrapper from "@/components/SkeletonWrapper"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { dateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers"
import { UserSettings } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import CategoriesCard from "./CategoriesCard"

interface Props {
    from: Date,
    to: Date,
    userSettings: UserSettings
}

function CategoriesStats({from, to, userSettings} : Props) {
  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview","stats","categories",from,to],
    // queryFn: () => fetch(`/api/stats/categories?from=${dateToUTCDate(from)}&to=${dateToUTCDate(to)}`).then((res) => res.json())
    queryFn: () => fetch(`/api/stats/categories?from=${from}&to=${to}`).then((res) => res.json())
  })

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
  },[userSettings.currency])

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard formatter={formatter} type="income" data={statsQuery.data || []} />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard formatter={formatter} type="expense" data={statsQuery.data || []} />
      </SkeletonWrapper>
    </div>
  )
}

export default CategoriesStats