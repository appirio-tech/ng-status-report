'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/past-status-reports.directive.html'
  controller  : 'PastReportsController as vm'
  scope:
    workId: '@workId'

angular.module('appirio-tech-ng-status-report').directive 'pastStatusReports', directive
