interface StackedBarChartInterface {
    month: string,
    below: number,
    middle: number,
    above: number
}
export const answeredCallsCategorized = [
    {
        "month": "Jan-24",
        "below": 35,
        "middle": 17,
        "above": 28
    },
    {
        "month": "Feb-24",
        "below": 40,
        "middle": 22,
        "above": 18
    },
    {
        "month": "Mar-24",
        "below": 32,
        "middle": 19,
        "above": 29
    },
    {
        "month": "Apr-24",
        "below": 32,
        "middle": 18,
        "above": 30
    },
    {
        "month": "May-24",
        "below": 33,
        "middle": 17,
        "above": 30
    },
    {
        "month": "Jun-24",
        "below": 27,
        "middle": 22,
        "above": 31
    },
    {
        "month": "Jul-24",
        "below": 12,
        "middle": 10,
        "above": 58
    },
    {
        "month": "Aug-24",
        "below": 10,
        "middle": 9,
        "above": 61
    },
    {
        "month": "Sep-24",
        "below": 13,
        "middle": 11,
        "above": 56
    },
    {
        "month": "Oct-24",
        "below": 9,
        "middle": 11,
        "above": 60
    }
]
export const notReadyCategorized = [
    {
        "month": "Jan-24",
        "below": 10,
        "middle": 19,
        "above": 51,
    },
    {
        "month": "Feb-24",
        "below": 4,
        "middle": 15,
        "above": 61
    },
    {
        "month": "Mar-24",
        "below": 4,
        "middle": 14,
        "above": 62
    },
    {
        "month": "Apr-24",
        "below": 9,
        "middle": 20,
        "above": 51
    },
    {
        "month": "May-24",
        "below": 2,
        "middle": 21,
        "above": 57
    },
    {
        "month": "Jun-24",
        "below": 5,
        "middle": 16,
        "above": 59
    },
    {
        "month": "Jul-24",
        "below": 6,
        "middle": 19,
        "above": 55
    },
    {
        "month": "Aug-24",
        "below": 8,
        "middle": 22,
        "above": 50
    },
    {
        "month": "Sep-24",
        "below": 15,
        "middle": 22,
        "above": 43
    },
    {
        "month": "Oct-24",
        "below": 13,
        "middle": 25,
        "above": 42
    }
]
// This function was initialized to produce our month by month breakdown according phone stat goals. Import the respective JSON file and run to print out Rechart-friendly objects
export const organizeBarChartData = async () => {
    const res = await fetch("/data/answered_calls.json")
    const jsonData: any[] = await res.json();
    const chartData = [
        { month: "Jan-24", below: 0, middle: 0, above: 0 },
        { month: "Feb-24", below: 0, middle: 0, above: 0 },
        { month: "Mar-24", below: 0, middle: 0, above: 0 },
        { month: "Apr-24", below: 0, middle: 0, above: 0 },
        { month: "May-24", below: 0, middle: 0, above: 0 },
        { month: "Jun-24", below: 0, middle: 0, above: 0 },
        { month: "Jul-24", below: 0, middle: 0, above: 0 },
        { month: "Aug-24", below: 0, middle: 0, above: 0 },
        { month: "Sep-24", below: 0, middle: 0, above: 0 },
        { month: "Oct-24", below: 0, middle: 0, above: 0 },
    ]
    let filteringObject = {
        "Jan-24": [0, 0, 0],
        "Feb-24": [0, 0, 0],
        "Mar-24": [0, 0, 0],
        "Apr-24": [0, 0, 0],
        "May-24": [0, 0, 0],
        "Jun-24": [0, 0, 0],
        "Jul-24": [0, 0, 0],
        "Aug-24": [0, 0, 0],
        "Sep-24": [0, 0, 0],
        "Oct-24": [0, 0, 0],
    }
    const categorizeIndex = (month: string) => {
        switch (month) {
            case "Jan-24":
                return 0;
            case "Feb-24":
                return 1;
            case "Mar-24":
                return 2
            case "Apr-24":
                return 3;
            case "May-24":
                return 4;
            case "Jun-24":
                return 5;
            case "Jul-24":
                return 6;
            case "Aug-24":
                return 7;
            case "Sep-24":
                return 8
            case "Oct-24":
                return 9
            default:
                return 0
        }
    }
    const categorizeDataValue = (val: number) => {
        if (val < 80) {
            return "middle"
        } else if (val < 70) {
            return "below"
        } else {
            return "above"
        }
    }
    console.log("JSON DATA HERE", jsonData)
    jsonData.forEach((data) => {
        const resEntry = chartData.find((entry) => entry.month == data.month)
        if (resEntry) {
            if (data.val < 26) {
                return resEntry.above++
            } else if (data.val < 40) {
                return resEntry.middle++
            } else {
                return resEntry.below++
            }
        }
    })
}
// When clicking on a stacked bar, this handles the data and returns important analytics for the respective month
export const handleBarClickAnalytics = (data: StackedBarChartInterface, idx: number, type: string) => {
    const abovePercentAverage = 53.1
    const belowPercentAverage = 7.6
    const midPercentAverage = 17.4
    const belowPercentAverageNR = 24.3
    const midPercentAverageNR = 15.6
    const abovePercentAverageNR = 40.1
    if (idx == 0) {
        return { differenceInAbovePercent: 0, differenceInBelowPercent: 0, differenceInMidPercent: 0 }
    }
    if (type == "notReady") {
        const prevData = notReadyCategorized[idx - 1]
        const differenceInAbovePercent = ((data.above / 80) * 100) - ((prevData.above / 80) * 100)
        const differenceInBelowPercent = ((data.below / 80) * 100) - ((prevData.below / 80) * 100)
        const differenceInMidPercent = ((data.middle / 80) * 100) - ((prevData.middle / 80) * 100)
        return { differenceInAbovePercent, differenceInBelowPercent, differenceInMidPercent }
    } else {
        const prevData = answeredCallsCategorized[idx - 1]
        const differenceInAbovePercent = ((data.above / 80) * 100) - ((prevData.above / 80) * 100)
        const differenceInBelowPercent = ((data.below / 80) * 100) - ((prevData.below / 80) * 100)
        const differenceInMidPercent = ((data.middle / 80) * 100) - ((prevData.middle / 80) * 100)
        return { differenceInAbovePercent, differenceInBelowPercent, differenceInMidPercent }
    }
}