'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/status-reports.directive.html'
  controller  : 'StatusReportsController as vm'
  scope:
    workId: '@workId'

angular.module('appirio-tech-ng-status-report').directive 'statusReports', directive
