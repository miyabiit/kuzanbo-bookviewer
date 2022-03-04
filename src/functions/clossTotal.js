exports.getUniqList = (array) => {
	return Array.from(new Set(array));
}

// colList1, colList2 : クロス集計の軸
// arr : [[colname1, colname2, value],....]
exports.getCrossTotal = (clList, rlList, arr) => {
	const outArr = [];
	cList.map(c => {
		rList.map(r => {
		  const res = arr.filter(a => a[0] == c && a[1] == r);
		  if(res.length == 0){
		    outArr.push([c,r,0]);
		  }else{
		    let total = res.reduce((sum, el) => sum + el[2],0);
		    outArr.push([c,r,total]);
		  }
		})
	})
	return outArr;
}
