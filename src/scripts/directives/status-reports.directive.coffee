'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/status-reports.directive.html'

angular.module('appirio-tech-ng-status-report').directive 'statusReports', directive
