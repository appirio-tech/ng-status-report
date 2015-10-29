angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-status-report'];

  angular.module('example', dependencies);

}).call(this);

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/create.example.html","<create-status-report></create-status-report>");
$templateCache.put("views/detail.example.html","<detail-status-report></detail-status-report>");
$templateCache.put("views/past-reports.example.html","<past-status-reports></past-status-reports>");
$templateCache.put("views/status-reports.example.html","<status-reports></status-reports>");}]);
(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['status-reports'] = {
      url: '/',
      title: 'status-reports',
      templateUrl: 'views/status-reports.example.html'
    };
    states['create'] = {
      url: '/create',
      title: 'create',
      templateUrl: 'views/create.example.html'
    };
    states['detail'] = {
      url: '/detail',
      title: 'detail',
      templateUrl: 'views/detail.example.html'
    };
    states['past-reports'] = {
      url: '/past-reports',
      title: 'past-reports',
      templateUrl: 'views/past-reports.example.html'
    };
    results = [];
    for (key in states) {
      state = states[key];
      results.push($stateProvider.state(key, state));
    }
    return results;
  };

  config.$inject = ['$stateProvider'];

  angular.module('example').config(config).run();

}).call(this);
