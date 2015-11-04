'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/detail-status-report.directive.html'
  controller  : 'DetailController as vm'
  scope:
    workId: '@workId'
    reportId: '@reportId'

angular.module('appirio-tech-ng-status-report').directive 'detailStatusReport', directive
