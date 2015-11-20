var TimeTest = {};

TimeTest.hist = [];
TimeTest.delta = 30;
TimeTest.threshold = 10;

TimeTest.fillHist = function(inputPA) {
	var hist = TimeTest.hist;
	
	for(var i = 1; i < TimeTest.delta; i++) {
		hist[i-1] = hist[i];					
	}            	
	hist[TimeTest.delta - 1 ] = inputPA;
}

TimeTest.timeTest1 = function(inputPA, outputPA, w, h) {
	var hist = TimeTest.hist;
	TimeTest.fillHist(inputPA);
	if (!hist[0]) {
		return Filters.identity(inputPA);
	}
	var d = hist[0].data;
	
	var o = outputPA.data;
	for (var i = 0; i < d.length; i += 4) {
		o[i] 		= d[i];
		o[i + 1] 	= d[i+1];
		o[i + 2] 	= d[i+2];
		o[i + 3] 	= d[i+3];
	}
    return o;
}

TimeTest.timeTest2 = function(inputPA, outputPA, w, h) {
	var hist = TimeTest.hist;
	TimeTest.fillHist(inputPA);
	if (!hist[0]) {
		return Filters.identity(inputPA);
	}
	var p = hist[0].data;
	var d = inputPA.data;
	var o = outputPA.data;
	for (var i = 0; i < d.length; i += 4) {
		var dv = 0.3 * d[i] + 0.59 * d[i+1] + 0.11 * d[i+2];
		var pv = 0.3 * p[i] + 0.59 * p[i+1] + 0.11 * p[i+2];
		var x = ( Math.abs( dv - pv ) < TimeTest.threshold ); 
		o[i] 		= x ? d[i] : p[i];
		o[i + 1] 	= x ? d[i+1] : p[i + 1];
		o[i + 2] 	= x ? d[i+2] : p[i + 2];
		o[i + 3] 	= 256;
	}
    return o;
}


TimeTest.timeTest3 = function(inputPA, outputPA, w, h) {
	var hist = TimeTest.hist;
	TimeTest.fillHist(inputPA);
	if (!hist[0]) {
		return Filters.identity(inputPA);
	}
	var p = hist[0].data;
	var d = inputPA.data;
	var o = outputPA.data;
	for (var i = 0; i < d.length; i += 4) {
		var dv = 0.3 * d[i] + 0.59 * d[i+1] + 0.11 * d[i+2];
		var pv = 0.3 * p[i] + 0.59 * p[i+1] + 0.11 * p[i+2];
		var x = ( Math.abs( dv - pv ) > TimeTest.threshold ); 
		o[i] 		= x ? d[i] : p[i];
		o[i + 1] 	= x ? d[i+1] : p[i + 1];
		o[i + 2] 	= x ? d[i+2] : p[i + 2];
		o[i + 3] 	= 256;
	}
    return o;
}

