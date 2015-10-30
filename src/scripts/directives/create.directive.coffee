'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/create-status-report.directive.html'
  controller: 'CreateController as vm'
  scope:
    workId: '@workId'

angular.module('appirio-tech-ng-status-report').directive 'createStatusReport', directive
