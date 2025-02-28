function extractRowCount(range: string): number {
    const match = range.match(/\d+$/); // Match the last sequence of digits in the string
    return match ? parseInt(match[0], 10) : 4;
}
interface Schedule {
    [key: string]: string[];  // The key is a string (person's name), and the value is an array of strings (dates)
}
export function handleExcelSchedules(schedule: any) {
    console.log('Schedule here', schedule)
    const dateKey = "J";
    const lastNameKey = "G"
    const dates: any[] = []
    let unsortedData: any = []
    const rawColDefs = []
    const lastCell = extractRowCount(schedule["!ref"])
    for (let i = 2; i < lastCell; i++) {
        const currentDate = schedule[`${dateKey}${i}`]["v"]
        const currentName = schedule[`${lastNameKey}${i}`]["v"]
        const matchedObject = unsortedData.find((item: any) => item.name == currentName)
        if (matchedObject) {
            matchedObject[currentDate] = "X"
        } else {
            unsortedData.push({ name: currentName, [currentDate]: "X" })
        }
        if (!dates.includes(currentDate)) {
            rawColDefs.push({ field: currentDate, flex: 1, cellStyle: { border: '1px solid black' }, headerName: currentDate.slice(5) })
            dates.push(currentDate)
        }
    }
    console.log("Data here", unsortedData)
    const colDefs = [{ field: "name", flex: 2.5, cellStyle: { border: '1px solid black' } }, ...rawColDefs]
    const data = [...unsortedData].sort((a, b) => a.name.localeCompare(b.name));
    return { colDefs, data }
}