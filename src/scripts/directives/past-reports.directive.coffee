'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/past-status-reports.directive.html'

angular.module('appirio-tech-ng-status-report').directive 'pastStatusReports', directive
