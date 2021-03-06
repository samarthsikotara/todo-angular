'use strict';
/**
 * @ngdoc function
 * Controller of the centralApp
 */
angular
  .module('centralApp')
  .controller('TaskNewCtrl', ['$scope','$state','$stateParams','toastr', 'ENV', 'EnumService', function ($scope,$state, $stateParams,toastr,ENV, EnumService) {
    
    $scope.save = function(task) {
      task.project_id = $stateParams.project_id
      var promise = EnumService.post_api(ENV.api_url+'/dashboard/tasks', {'task' : task});
      promise.then(
        function(res) {
          $state.go('dashboard.projects', {}, {reload: true});
          $scope.success = true
          toastr.success("New Task Created")
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