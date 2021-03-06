'use strict';
/**
 * @ngdoc function
 * Controller of the centralApp
 */
angular
  .module('centralApp')
  .controller('TaskUpdateCtrl', ['$scope','$state','$stateParams','toastr', 'ENV', 'EnumService', function ($scope,$state, $stateParams,toastr,ENV, EnumService) {
    
    var promise = EnumService.get_api(ENV.api_url+'/dashboard/tasks/'+ $stateParams.id);
    promise.then(
      function(res) {
        $scope.task = res.data.task;
      },
      function(err) {
        console.log(err);
        $scope.failed = true;
        $scope.error = "An error has occured while adding! -- " + err.data.message;                
      }
    )

    $scope.save = function(task) {
      var promise = EnumService.put_api(ENV.api_url+'/dashboard/tasks/'+$stateParams.id, {'task' : task});
      promise.then(
        function(res) {
          $state.go('dashboard.projects_show', {id: res.data.task.project_id}, {reload: true});
          $scope.success = true
          toastr.success("Task Updated")
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