'use strict'

config = ($stateProvider) ->
  states = {}

  states['create'] =
    url         : '/'
    title       : 'create'
    templateUrl : 'views/create.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


