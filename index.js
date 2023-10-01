const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = arr => {
    const result = [];
    arr.forEach(element => result.push(createEmployeeRecord(element)));
    return result;
}

function createTimeInEvent(dateStamp) {
    const splitedDate = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(splitedDate[1]),
        date: splitedDate[0],
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    const splitedDate = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(splitedDate[1]),
        date: splitedDate[0],
    });
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    const timeInEvent = this.timeInEvents.find(timeRecord => timeRecord.date === dateStamp);
    const timeOutEvent = this.timeOutEvents.find(timeRecord => timeRecord.date === dateStamp);
    
    return Math.abs(timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(dateStamp) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(src => src.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    let sum = 0;
    employeeRecords.forEach(record => sum += allWagesFor.call(record));
    return sum;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
${appName}: ${sessionName}
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

