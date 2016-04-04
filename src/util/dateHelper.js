const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;

class DateHelper {
    static timeStrToInt(timeStr) {
        let [hours, minutes] = timeStr.split(':');
        return new Date(hours * hour + minutes * minute).getTime();
    }

    static timeZStrToDate (timeStr, timezone) {
        let dateNow = new Date();
        let date = new Date(timeStr + ' ' + timezone);
        date.setFullYear(dateNow.getFullYear());
        date.setMonth(dateNow.getMonth());
        date.setDate(dateNow.getDate());
        return date;
    }

    static addTime(date, time) {
        let [hours, minutes] = time.split(':');
        return new Date(date.getTime() + hours * hour + minutes * minute);
    }

    static addDays(date, days) {
        return new Date(date.getTime() + days * day);
    }

    static zerofy(num) {
        return num < 10 ? '0' + num : num;
    }

    static toTimeStr(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return DateHelper.zerofy(hours) + ':' + DateHelper.zerofy(minutes);
    }


    static format(date) {
        return DateHelper.zerofy(date.getDate()) + '/' + DateHelper.zerofy(date.getMonth());
    }

    static shortMonth(date) {
        return date.toString().split(' ')[1].toLowerCase();
    }
}

export default DateHelper;
