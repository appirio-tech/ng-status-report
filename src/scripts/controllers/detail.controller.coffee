'use strict'

DetailController = ($scope, StatusReportAPIService) ->
  vm        = this
  vm.workId = $scope.workId
  vm.reportId = $scope.reportId

  activate = ->
    params =
      projectId: vm.workId
      reportId: vm.reportId

    resource = StatusReportAPIService.get params

    resource.$promise.then (response) ->
      vm.report = response

    resource.$promise.finally ->

    vm

  activate()

DetailController.$inject = ['$scope', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'DetailController', DetailController