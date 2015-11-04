'use strict'

PastReportsController = ($scope, StatusReportAPIService) ->
  vm        = this
  vm.workId = $scope.workId

  activate = ->
    params =
      projectId: vm.workId

    resource = StatusReportAPIService.query params

    resource.$promise.then (response) ->
      vm.pastReports = response

    resource.$promise.finally ->

    vm

  activate()

PastReportsController.$inject = ['$scope', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'PastReportsController', PastReportsController