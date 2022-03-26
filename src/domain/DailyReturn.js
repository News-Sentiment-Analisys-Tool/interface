export class DailyReturn {

    date = new Date();
    open = 0.0;
    high = 0.0;
    low = 0.0;
    close = 0.0;	
    volume = 0;
    smaVolume50 = 0;
    split = '';
    dividend =	'';
    absoluteChange = '';
    percentChange = '';

    constructor(
        date
    ) {
        const dt = new Date(date)
        dt.setDate(dt.getDate() + 1)
        this.date =  dt
    }

    getDailyReturn () {
        return {
            ...this
        }
    }
}