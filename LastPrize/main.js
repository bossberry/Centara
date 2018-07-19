var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $document, $http) {

	$document.ready(function() {
		$http({
	      method: 'GET',
	      url: 'file/users.csv'
	   }).then(function (response){
	   	$scope.processData(response.data);
	   },function (error){

	   });
	   
	});
	$scope.temparr = [];
	$scope.count = 0;
	$scope.randomFunc = function(){
		// console.log($scope.data);
		// fix name from index of array by code below 
		$scope.rand = $scope.data.pop($scope.data.sort(function(){return Math.round(Math.random());}))[0];
		$scope.temparr.push($scope.rand);
		// console.log($scope.temparr);
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
	};

});