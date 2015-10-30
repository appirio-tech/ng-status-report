'use strict'

StatusReportsController = ($scope, API_URL, StatusReportAPIService) ->
  vm        = this
  vm.workId = $scope.workId
  vm.showCreateReport = true
  vm.showDetailReport = false

  activate = ->
    vm

  activate()

StatusReportsController.$inject = ['$scope', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'StatusReportsController', StatusReportsController