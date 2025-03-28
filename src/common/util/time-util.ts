import * as moment from "moment-timezone";
import { DATE_FORMAT } from "../constant/constant";


const timeZone = 'Asia/Ho_Chi_Minh';

export function convertStringToDate(dateString: string, formatStr: DATE_FORMAT): Date {
    // Check if moment is properly available
    if (!moment || !moment.tz) {
        throw new Error("moment-timezone is not loaded correctly.");
    }

    // Parse the date string using the correct format
    const dateWithTimeZone = moment.tz(dateString, formatStr, timeZone); // Return as native Date object;

    return  dateWithTimeZone.toDate()
}

export function convertDateToString(date: Date, formatStr: DATE_FORMAT): string {
    
    return moment.tz(date, timeZone).format(formatStr);
   
}



