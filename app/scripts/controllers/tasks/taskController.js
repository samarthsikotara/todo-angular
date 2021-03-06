'use strict';
/**
 * @ngdoc function
 * Controller of the centralApp
 */
angular
  .module('centralApp')
  .controller('TaskCtrl', ['$scope','$state','$stateParams','toastr', 'ENV', 'EnumService', function ($scope,$state, $stateParams,toastr,ENV, EnumService) {
    
    var promise = EnumService.get_api(ENV.api_url+'/dashboard/tasks');
    promise.then(
      function(res) {
        return $scope.tasks = res.data.tasks;
      },
      function(err) {
        console.log(err);
        $scope.failed = true;
        $scope.error = "An error has occured while adding! -- " + err.data.message;                
      }
    )

    $scope.endTask = function(id){
      var task = {}
      task.completed = true
      var promise = EnumService.put_api(ENV.api_url+'/dashboard/tasks/'+id, {'task' : task});
      promise.then(
        function(res) {
          $state.go('dashboard.tasks', {reload: true});
          $scope.success = true
          toastr.success("Task Completed Successfully")
        },
        function(err) {
          console.log(err);
          $scope.failed = true;
          $scope.error = "An error has occured while adding! -- " + err.data.message;
          toastr.error("An error has occured while adding! -- " + err.data.message, 'Error');                
        }
      )
    }

    $scope.deleteTask = function(task_id) {
      var promise = EnumService.delete_api(ENV.api_url+'/dashboard/tasks/'+task_id);
      promise.then(
        function(res) {
          $state.go('dashboard.tasks', {reload: true});
          $scope.success = true
          toastr.success("Task Deleted Successfully")
        },
        function(err) {
          console.log(err);
          $scope.failed = true;
          $scope.error = "An error has occured while adding! -- " + err.data.message;
          toastr.error("An error has occured while adding! -- " + err.data.message, 'Error');                
        }
      )
    }

  }]);