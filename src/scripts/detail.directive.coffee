'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/detail-status-report.directive.html'

angular.module('appirio-tech-ng-status-report').directive 'detailStatusReport', directive
