var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $document, $http) {

	$document.ready(function() {
		// file Original 
		$http({
	      method: 'GET',
	      // url: 'file/users.csv'
	      url: 'file/users-publish.csv'
	   }).then(function (response){
	   	$scope.processData(response.data);
	   },function (error){
	   	console.log(error);
	   });
	   // file Check no repeat 
	   $http({
	      method: 'GET',
	      url: 'getPrize/first.csv'
	   }).then(function (response){
	   	$scope.processDataTemp(response.data);
	   },function (error){
	   	console.log(error);
	   });

	});
	$scope.temparr = [];
	$scope.rand = [];
	$scope.count = 0;
	$scope.randomFunc = function(){
		var loop = $scope.amount
		for(var i = 0; i < loop; i ++) {
			var randdata = $scope.data.sort(function(){return Math.round(Math.random());})[0];
			console.log(randdata);
			// $scope.rand.indexOf(randdata) === -1 ? $scope.rand.push(randdata) : $scope.amount++;
			if($scope.rand.indexOf(randdata) === -1) {
				if($scope.dataTemp.indexOf(randdata[0]) === -1){
					$scope.rand.push(randdata)
				}
			} else {
				loop++;
			}		
			// $scope.rand.push($scope.data.sort(function(){return Math.round(Math.random());})[0]);
		}

		var finalVal = '';
		for (var i = 0; i < $scope.rand.length; i++) {
		    var value = $scope.rand[i];
		    
		    for (var j = 0; j < value.length; j++) {
		        var innerValue = value[j];
		        var result = innerValue.replace(/"/g, '""');
		        if (result.search(/("|,|\n)/g) >= 0)
		            result = '"' + result + '"';
		        if (j > 0)
		            finalVal += ',';
		        var num = i+1;
		        finalVal += num + '.' + result;
		    }
		    
		    finalVal += '\n';
		}
		if($scope.rand.length != 0){
			var pom = document.createElement('a');
			pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
			pom.setAttribute('download', $scope.titlePrize + '-file.csv');
			pom.click();
		}
		
		// $scope.rand = $scope.data.pop($scope.data.sort(function(){return Math.round(Math.random());}))[0];
		$scope.temparr.push($scope.rand);
		
		$scope.count += 1;
		window.localStorage.setItem('Name' + $scope.count , $scope.rand);
		window.localStorage.setItem('Name list' , $scope.temparr);
		// $scope.rand = $scope.data[Math.floor(Math.random() * $scope.data.length)][0];
	};

	$scope.processData = function(allText) {
		// split content based on new line
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];
		// for ( var i = 0; i < 10; i++) {
		for ( var i = 0; i < allTextLines.length; i++) {
			// split content based on comma
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tarr = [];
				for ( var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr);
			}
		}
		$scope.data = lines;
		console.log($scope.data);
	};
	$scope.processDataTemp = function(allText) {
		// split content based on new line
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];
		// for ( var i = 0; i < 10; i++) {
		for ( var i = 0; i < allTextLines.length; i++) {
			// split content based on comma
			var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tarr = [];
				for ( var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr[0]);
			}
		}
		$scope.dataTemp = lines;
		console.log($scope.dataTemp);
	};

});