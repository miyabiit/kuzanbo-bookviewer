exports.getUniqList = (array) => {
	return Array.from(new Set(array));
}

// colList1, colList2 : クロス集計の軸
// arr : [[colname1, colname2, value],....]
exports.getCrossTotal = (cList, rList, arr) => {
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
// cList : 集計の軸
// arr : [[colname, value],....]
// out : [[colname, total],....]
exports.getTotal = (cList, arr) => {
	const outArr = [];
	cList.map(c => {
	  const res = arr.filter(a => a[0] == c);
	  if(res.length == 0){
	    outArr.push([c,0]);
	  }else{
	    let total = res.reduce((sum, el) => sum + el[1],0);
	    outArr.push([c,total]);
	  }
	})
	return outArr;
}
