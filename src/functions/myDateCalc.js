
exports.getDayList = (fromDateString, toDateString) => {
  let fromDate = new Date(fromDateString.replace(/-/g,"/"));
  let toDate = new Date(toDateString.replace(/-/g, "/"));
  let dateSa = (fromDate - toDate)/86400000;
	let dayList = [];
	for(let i=0; i<dateSa;i++){
		dayList.push(formatDate(getAfterDay(fromDate, i)));
	}
	return dayList;
}

exports.getDayListByTerm = (fromDateString, term = 14) => {
  let fromDate = new Date(fromDateString.replace(/-/g,"/"));
	let dayList = [];
	for(let i=0; i<term;i++){
		dayList.push(formatDate(getAfterDay(fromDate, i)));
	}
	return dayList;
}

exports.getAfterDay = (startDay, nDay) => {
	return new Date(startDay.setDate(startDay.getDate() + nDay));
}

exports.formatDate = (dt) => {
  let y = dt.getFullYear();
  let m = ('00' + (dt.getMonth()+1)).slice(-2);
  let d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
};
