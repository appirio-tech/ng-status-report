'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/create-status-report.directive.html'

angular.module('appirio-tech-ng-status-report').directive 'createStatusReport', directive
