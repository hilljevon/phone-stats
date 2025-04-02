import TableColumns from "@/components/user/schedule/TableColumns";
import { ColumnDef } from "@tanstack/react-table"

function extractRowCount(range: string): number {
    const match = range.match(/\d+$/); // Match the last sequence of digits in the string
    return match ? parseInt(match[0], 10) : 4;
}
interface Schedule {
    [key: string]: string[];  // The key is a string (person's name), and the value is an array of strings (dates)
}
export function handleExcelSchedules(schedule: any) {
    console.log('Schedule here', schedule)
    // This is the row for shift date
    const dateKey = "J";
    // This is the row for the last name 
    const lastNameKey = "G"
    // This is the row for the shift name 
    const shiftNameKey = "C"
    // dates is used as a check to see which date iteration we are on so we may create a new column if changed.
    const dates: any[] = []
    // our raw data. after entering all row data, this will be alphabetized by last name
    let unsortedData: any = []
    // our initial colDefs. it will begin as an array of calendar dates, but we need to add an initial column
    const colDefs: any[] = []
    // ExtractRowCount returns the number of rows for that respective excel sheet. Used so we don't have index error
    const lastCell = extractRowCount(schedule["!ref"])
    for (let i = 2; i < lastCell; i++) {
        // Retrieve current date iteration
        const currentDate = schedule[`${dateKey}${i}`]["v"]
        // Retrieve current name iteration
        const currentName = schedule[`${lastNameKey}${i}`]["v"]
        // Retrieve shift name
        const currentShift = schedule[`${shiftNameKey}${i}`]["v"]
        // Check if this user is already logged in our data array
        const matchedObject = unsortedData.find((item: any) => item.name == currentName)
        // if previous schedule entry exists for this user
        if (matchedObject) {
            // add current date entry
            matchedObject[currentDate] = currentShift
        } else {
            // otherwise, add this current user in our data and add the current schedule date
            unsortedData.push({ name: currentName, [currentDate]: currentShift })
        }
        // if we have not logged this current date yet
        if (!dates.includes(currentDate)) {
            // add it to our colDefs so it is a new column
            colDefs.push({
                field: currentDate,
                headerName: currentDate.slice(5),
            })
            // push to our dates array for this if check
            dates.push(currentDate)
        }
    }
    const columns = TableColumns(colDefs)
    // alphabetize our data by last name
    const incompleteData = [...unsortedData].sort((a, b) => a.name.localeCompare(b.name));
    const datesOnly = colDefs.map((colDef) => colDef.field)
    // map through each employee object
    const data = incompleteData.map((employee) => {
        const newEmployeeObject: any = { name: employee.name }
        // go through each date
        datesOnly.forEach((date) => {
            // check if the employee is working on the current date iteration
            if (employee[date]) {
                // if we want to eventually change value to current shift, here is where it would take place
                newEmployeeObject[date] = employee[date]
            } else {
                newEmployeeObject[date] = ""
            }
        })
        return newEmployeeObject
    })
    return { colDefs, data, columns }
}
