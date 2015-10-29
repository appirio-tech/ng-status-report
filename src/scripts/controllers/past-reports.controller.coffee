'use strict'

PastReportsController = ($scope, API_URL, StatusReportsAPIService) ->
  vm        = this
  vm.workId = $scope.workId
  vm.showCreateReport = true
  vm.showDetailReport = false

  activate = ->
    params =
      workId: vm.workId

    resource = StatusReportsAPIService.query params

    resource.$promise.then (response) ->
      vm.pastReports = response

    resource.$promise.finally ->

    vm

  activate()

PastReportsController.$inject = ['$scope', 'API_URL', 'StatusReportsAPIService']

angular.module('appirio-tech-ng-status-report').controller 'PastReportsController', PastReportsController