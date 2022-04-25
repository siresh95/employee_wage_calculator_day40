const IS_ABSENT = 0;
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;
const NUMBER_OF_WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 160;
/*
{
    let empCheck = Math.floor(Math.random() * 10) % 2;
    if(empCheck == IS_ABSENT){
        console.log("Employee is absent, exiting the program");
        return;
    } else {
        console.log("Employee is present");
    }
}*/
function getWorkingHours(empCheck) {
    switch(empCheck) {
        case IS_PART_TIME:
            return PART_TIME_HOURS;
        case IS_FULL_TIME:
            return FULL_TIME_HOURS;
        default:
            return 0;
    }
}
function calculateDailyWage(empHrs){
    return empHrs*WAGE_PER_HOUR;
}
{
    let totalEmpHrs = 0;
    let totalWorkingDays = 0;
    let empDailyWageArr = new Array();
    let empDailyWageMap = new Map();
    let empDailyHrsMap = new Map();

    while(totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUMBER_OF_WORKING_DAYS ) {
        totalWorkingDays++;
        let empCheck = Math.floor(Math.random() * 10) % 3;
        let empHrs = getWorkingHours(empCheck);
        totalEmpHrs += empHrs;
        empDailyWageArr.push(calculateDailyWage(empHrs));
        empDailyHrsMap.set(totalWorkingDays,empHrs);
        empDailyWageMap.set(totalWorkingDays, calculateDailyWage(empHrs));
    }

    //let empWage = calculateDailyWage(totalEmpHrs);
    //console.log(empDailyWageMap);
    //console.log("Total Days: "+totalWorkingDays+" Total Hours: "+totalEmpHrs+" Emp Wage: "+empWage);
    console.log("Employee wage map: "+Array.from(empDailyWageMap.values()).reduce(totalWages,0));

    //uc7 - for each
    let totalEmpWage = 0;
    function sum(dailyWage){
        totalEmpWage += dailyWage;
    }
    empDailyWageArr.forEach(sum);
    console.log("Total Days: "+totalWorkingDays+" Total Hours: "+totalEmpHrs+" Emp Wage: "+totalEmpWage);

    //uc7 - reduce
    function totalWages(totalWage, dailyWage){
        return totalWage+dailyWage;
    }
    console.log("Employee wage with reduce: "+empDailyWageArr.reduce(totalWages,0));

    //uc7 - array map helper function
    let dailyCounter = 0;
    function mapDayWithWage(dailyWage) {
        dailyCounter++;
        return dailyCounter+ "=" +dailyWage;
    }
    let mapDayWithWageArr = empDailyWageArr.map(mapDayWithWage);
    console.log("Daily wage map");
    console.log(mapDayWithWageArr);

    //uc7 - days with full time wage
    function fullTimeWage(dailyWage){
        return dailyWage.includes("160");
    }
    let fullDayWageArr = mapDayWithWageArr.filter(fullTimeWage);
    console.log("Day with full time wage earned");
    console.log(fullDayWageArr);

    //uc 7 - first occurence when full time wage earned
    function findFindFirstFullTimeWage(dailyWage){
        return dailyWage.includes("160");
    }

    console.log("First time full time wage earned : "+mapDayWithWageArr.find(findFindFirstFullTimeWage));

    //uc7 - check if every element of full time wage is truely holding full time wage
    function isAllFullTimeWage(dailyWage) {
        return dailyWage.includes("160");
    }
    console.log("Check all element have full time wage: "+fullDayWageArr.every(isAllFullTimeWage));

    //uc7 - days with part time wage present
    function isAnyPartTimeWage(dailyWage){
        return dailyWage.includes("80");
    }
    console.log("Days with part time wage: "+mapDayWithWageArr.some(isAnyPartTimeWage));

    //uc7 - number of days employee worked
    function totalDaysWorked(numOfDays, dailyWage){
        if(dailyWage > 0) return numOfDays+1;
        return numOfDays;
    }
    //uc8
    console.log("Number of days employee worked: "+empDailyWageArr.reduce(totalDaysWorked,0));

    //uc9 arrow functions
    let count = 0;
    let totalHours = Array.from(empDailyHrsMap.values()).reduce(totalWages,0);
    let totalSalary = empDailyWageArr.filter(dailyWage => dailyWage > 0)
                        .reduce(totalWages,0);
    console.log("Using arrow- employee wage = "+" Total hours: "+ totalHours +" Total wage: "+ totalSalary);

    let nonWorkingDays = new Array();
    let fullWorkingDays = new Array();
    let partWorkingDays = new Array();

    empDailyHrsMap.forEach((value,key,map) => {
        if(value == 8) fullWorkingDays.push(key);
        else if(value == 4) partWorkingDays.push(key);
        else nonWorkingDays.push(key);
    });
    console.log("Full working days: "+fullWorkingDays);
    console.log("Part working days: "+partWorkingDays);
    console.log("Non working days: "+nonWorkingDays);
}
//uc10 - objects
{
    let totalEmpHrs = 0;
    let totalWorkingDays = 0;
    let empDailyHrsAndWageArr = new Array();
    while(totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUMBER_OF_WORKING_DAYS) {
        totalWorkingDays++;
        let empCheck = Math.floor(Math.random() * 10) % 3;
        let empHrs = getWorkingHours(empCheck);
        totalEmpHrs += empHrs;
        empDailyHrsAndWageArr.push(
            {
                dayNum:totalWorkingDays,
                dailyHours:empHrs,
                dailyWage:calculateDailyWage(empHrs),
                toString(){
                    return '\nDay' + this.dayNum + ' => Working Hours is ' + this.dailyHours + 
                        ' And Wage Earned = ' + this.dailyWage
                },
            }
        );
    }
    console.log("Showing daily hours worked and wage earned: "+empDailyHrsAndWageArr);
    //uc10 object function along with arrow
    let totalWage = empDailyHrsAndWageArr
                    .filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
                    .reduce((totalWages,dailyHrsAndWage) => totalWages += dailyHrsAndWage.dailyWage, 0);
    let totalHours = empDailyHrsAndWageArr
                    .filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage >0)
                    .reduce((totalHours,dailyHrsAndWage) => totalHours += dailyHrsAndWage.dailyHours,0);
    console.log("Total hours: "+totalHours+" Total wage: "+totalWage);

    process.stdout.write("\nLogging full work days")
    empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                            .forEach(dailyHrsAndWage => process.stdout.write(dailyHrsAndWage.toString()));
    let partWorkingDayStrArr = empDailyHrsAndWageArr
                                .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                                .map(dailyHrsAndWage => dailyHrsAndWage.toString());
    console.log("\n\nPart working days strings "+partWorkingDayStrArr);

    let nonWorkingDayNums = empDailyHrsAndWageArr
                            .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
                            .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);
    console.log("\nNon working days "+nonWorkingDayNums);
}