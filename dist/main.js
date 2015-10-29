(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-status-report', dependencies);

}).call(this);

angular.module("appirio-tech-ng-status-report").run(["$templateCache", function($templateCache) {$templateCache.put("views/create-status-report.directive.html","<loader ng-show=\"false\"></loader><form><ul><li><label>project status</label></li><li><select class=\"wide\"><option value=\"\">project status</option></select></li><li><label>status message</label></li><li><textarea placeholder=\"Status message\" class=\"widest\"></textarea></li><li><label>project links</label></li><li class=\"project-links\"><div class=\"flex middle\"><input type=\"text\" placeholder=\"http://www.example.com\" class=\"wider\"/><button class=\"clean plus\"><div class=\"icon plus hollow\"></div></button></div><ul><li class=\"flex middle space-between\"><p class=\"link\">http://www.example.com</p><button class=\"clean\">remove</button></li><li class=\"flex middle space-between\"><p class=\"link\">http://www.example.com</p><button class=\"clean\">remove</button></li></ul></li><li><label>project images</label></li><li>(WIP file upload goes here)</li><li><button class=\"action\">post status to timeline</button></li></ul></form>");
$templateCache.put("views/detail-status-report.directive.html","<loader ng-show=\"false\"></loader><h2>This ia ver very very very long title</h2><time>2 Days ago</time><p class=\"message\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul class=\"links\"><li><a href=\"http://www.example.com\">http://www.example.com</a></li><li><a href=\"http://www.example.com\">http://www.example.com</a></li></ul><ul class=\"files flex wrap\"><li ng-repeat=\"i in [1, 2, 3, 4, 5, 6, 7, 8, 9]\" fitted-width=\"fitted-width\"><a href=\"http://www.example.com\"><img src=\"http://clipartzebraz.com/test_im.php?pic=/cliparts/square-clipart/cliparti1_square-clipart_05.jpg\"/></a></li></ul>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/create-status-report.directive.html'
    };
  };

  angular.module('appirio-tech-ng-status-report').directive('createStatusReport', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/detail-status-report.directive.html'
    };
  };

  angular.module('appirio-tech-ng-status-report').directive('detailStatusReport', directive);

}).call(this);
