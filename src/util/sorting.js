import DateHelper from './dateHelper';

const types = {
    'timeStr': DateHelper.timeStrToInt
};

class Sorting {
    static compareSimple(arg1, arg2, asc = true) {
        if (!asc) [arg1, arg2] = [arg2, arg1];
        if (arg1 < arg2) return -1;
        if (arg1 > arg2) return 1;
        return 0;
    }

    /**
     *
     * @param options [{field: string, asc: bool}] or [{string}]
     * @param asc {bool} Used if options is [{string}]
     * @returns {Function, undefined}
     */
    static byObjectFields(options, asc = true) {
        if (!(options && options.length)) return;
        if (typeof options[0] == 'string') {
            return function(arg1, arg2) {
                let res;
                for (let sort of options) {
                    res = Sorting.compareSimple(arg1[sort], arg2[sort], asc);
                    if (res) break;
                }
                return res;
            }
        }
        return function(arg1, arg2) {
            let res;
            for (let sort of options) {
                let f1 = arg1[sort.field], f2 = arg2[sort.field];
                if (sort.type) {
                    f1 = types[sort.type](f1);
                    f2 = types[sort.type](f2);
                }
                res = Sorting.compareSimple(f1, f2, sort.asc);
                if (res) break;
            }
            return res;
        }
    }
}

export default Sorting;
