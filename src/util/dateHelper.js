const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTHS = {
    0: "Jan", 1: "Feb",
    2: "Mar", 3: "Apr", 4: "May",
    5: "Jun", 6: "Jul", 7: "Aug",
    8: "Sep", 9: "Oct", 10: "Nov",
    11: "Dec"
};

class DateHelper {
    static timeStrToInt(timeStr) {
        let [hours, minutes] = timeStr.split(':');
        return new Date(hours * HOUR + minutes * MINUTE).getTime();
    }

    static timeZStrToDate(dateNow, timeStr, timezone) {
        return new Date(`${dateNow.getDate()} ${MONTHS[dateNow.getMonth()]} ${dateNow.getFullYear()} ${timeStr} ${timezone}`);
    }

    static timezoneToInt(timezone) {
        return +(timezone[0] + ((timezone[1] + timezone[2]) * HOUR + (timezone[3] + timezone[4]) * MINUTE));
    }

    static addTimeZStr(date, timeStr, timezone) {
        let [hours, minutes] = timeStr.split(':');
        let duration = hours * HOUR + minutes * MINUTE;
        let offset = -date.getTimezoneOffset() * MINUTE - DateHelper.timezoneToInt(timezone);
        return new Date(date.getTime() + duration - offset);
    }

    static addDays(date, days) {
        return new Date(date.getTime() + days * DAY);
    }

    static zerofy(num) {
        return num < 10 ? '0' + num : num;
    }

    static toTimeStr(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return DateHelper.zerofy(hours) + ':' + DateHelper.zerofy(minutes);
    }

    static formatDateMonth(date) {
        return DateHelper.zerofy(date.getDate()) + '/' + DateHelper.zerofy(date.getMonth() + 1);
    }

    static formatDays(days) {
        return `${days} ${days > 1 ? 'days' : 'day'}`;
    }

    static shortMonth(date) {
        return date.toString().split(' ')[1].toLowerCase();
    }

    static subDays(d1, d2) {
        return Math.round(Math.abs((d2 - d1) / (DAY)));
    }
}

export default DateHelper;
