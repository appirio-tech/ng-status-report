'use strict'

config = ($stateProvider) ->
  states = {}

  states['status-reports'] =
    url         : '/'
    title       : 'status-reports'
    templateUrl : 'views/status-reports.example.html'

  states['create'] =
    url         : '/create'
    title       : 'create'
    templateUrl : 'views/create.example.html'

  states['status-report-detail'] =
    url         : '/detail/:id'
    title       : 'detail'
    templateUrl : 'views/detail.example.html'

  states['past-reports'] =
    url         : '/past-reports'
    title       : 'past-reports'
    templateUrl : 'views/past-reports.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


