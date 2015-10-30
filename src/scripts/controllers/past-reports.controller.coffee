'use strict'

PastReportsController = ($scope, API_URL, StatusReportAPIService) ->
  vm        = this
  vm.workId = $scope.workId
  vm.showCreateReport = true
  vm.showDetailReport = false

  activate = ->
    params =
      projectId: vm.workId

    resource = StatusReportAPIService.query params

    resource.$promise.then (response) ->
      vm.pastReports = response

    resource.$promise.finally ->

    vm

  activate()

PastReportsController.$inject = ['$scope', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'PastReportsController', PastReportsController