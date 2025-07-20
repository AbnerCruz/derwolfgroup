export default function generateDateForWeek(year, month, week, weekday){
    const firstDay = new Date(year, month -1, 1);
    const targetDay = (weekday + 7) % 7;

    let count = 0;
    let current = new Date(firstDay);

    while(true){
        if(current.getMonth() !== firstDay.getMonth()) break;
        if(current.getDay() === targetDay){
            count++
            if(count === week){
                console.log("Data encontrada:", current);
                return current.toISOString().split("T")[0];
            }
        }
        current.setDate(current.getDate() +1);
    }
    return null;
}

export function weekdayToName(weekday){
    return["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][weekday]
}