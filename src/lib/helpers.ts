import { Currencies } from "@/constants/currencies"

export function dateToUTCDate(date: Date) {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDay(),
            date.getHours(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    )
}

export function GetFormatterForCurrency(currency: string) {
    const locale = Currencies.find((c) => c.value === currency)?.locale

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    })
}