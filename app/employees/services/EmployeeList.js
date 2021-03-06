angular.module('myapp.employees')
	.factory('EmployeeList',['$http','$q',
		function($http, $q){

		var name="";
		var employees = [];
		function _getEmployeeById(id){
			for(var i=0; i<employees.length;i++){
				var employee = employees[i];
				if(employee.id==id){
					return employee;
				}
			}
		}

		function _getEmployees(){
			var defer = $q.defer();
			$http.get('/data/employees.json').then(function(result){
				var records = result.data;
				for(var i=0;i<records.length;i++){
					var record = records[i];
					record.level = record.age>10? "Senior": "Junior";
				}
				employees = records;
				defer.resolve(records);
			}, function(err){
				defer.reject(err);
			});
			return defer.promise;
		}

		return {
			getEmployees: _getEmployees,
			getEmployeeById: _getEmployeeById
		};

	}]);