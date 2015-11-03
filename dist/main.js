(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'ap-file-upload', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-api-services'];

  angular.module('appirio-tech-ng-status-report', dependencies);

}).call(this);

angular.module("appirio-tech-ng-status-report").run(["$templateCache", function($templateCache) {$templateCache.put("views/create-status-report.directive.html","<loader ng-show=\"false\"></loader><form><ul><li><label>project status</label></li><li><label>status message</label></li><li><textarea placeholder=\"Status message\" ng-model=\"vm.statusReport.text\" class=\"widest\"></textarea></li><li><label>project links</label></li><li class=\"project-links\"><div class=\"flex middle\"><input type=\"url\" placeholder=\"http://www.example.com\" ng-model=\"vm.currentLink\" class=\"wider\"/><button ng-click=\"vm.addLink()\" class=\"clean plus\"><div class=\"icon plus hollow\"></div></button></div><ul><li ng-repeat=\"link in vm.statusReport.links track by $index\" class=\"flex middle space-between\"><p class=\"link\">{{link.url}}</p><button ng-click=\"vm.removeLink(link)\" class=\"clean\">remove</button></li></ul></li><li><label>project images</label></li><li><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\" has-files=\"vm.uploaderHasFiles\"></ap-uploader></li><li><button ng-click=\"vm.create()\" class=\"action\">post status to timeline</button></li></ul></form>");
$templateCache.put("views/detail-status-report.directive.html","<loader ng-show=\"false\"></loader><h3>{{vm.report.createdAt | date:\'MMMM d yyyy\'}} status report</h3><hr class=\"biggest\"/><time>{{vm.report.createdAt | timeLapse }}</time><p class=\"message\">{{vm.report.text}}</p><ul class=\"links\"><li ng-repeat=\"link in vm.report.links\"><a href=\"{{link.url}}\">{{link.url}}</a></li></ul><ul class=\"files flex wrap\"><li ng-repeat=\"image in vm.report.images\"><a href=\"{{image.preSignedURL}}\"><img src=\"{{image.preSignedURL}}\"/></a></li></ul>");
$templateCache.put("views/past-status-reports.directive.html","<loader ng-show=\"false\"></loader><ul class=\"links\"><li ng-repeat=\"report in vm.pastReports track by $index\" class=\"flex middle\"><div class=\"bullet\"></div><button class=\"clean\"><a ui-sref=\"copilot-status-report-details({id: vm.workId, reportId: report.id})\">{{report.createdAt | date:\'MMMM d yyyy\' }}</a></button></li></ul>");
$templateCache.put("views/status-reports.directive.html","<div class=\"flex rows\"><nav><h6>past status reports</h6><past-status-reports work-id=\"{{vm.workId}}\"></past-status-reports></nav><main><h3>create status report</h3><hr class=\"biggest\"/><create-status-report work-id=\"{{vm.workId}}\"></create-status-report></main></div>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/create-status-report.directive.html',
      controller: 'CreateController as vm',
      scope: {
        workId: '@workId'
      }
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
      templateUrl: 'views/detail-status-report.directive.html',
      controller: 'DetailController as vm',
      scope: {
        workId: '@workId',
        reportId: '@reportId'
      }
    };
  };

  angular.module('appirio-tech-ng-status-report').directive('detailStatusReport', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/past-status-reports.directive.html',
      controller: 'PastReportsController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-status-report').directive('pastStatusReports', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/status-reports.directive.html',
      controller: 'StatusReportsController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-status-report').directive('statusReports', directive);

}).call(this);

(function() {
  'use strict';
  var CreateController;

  CreateController = function($scope, $state, API_URL, StatusReportAPIService) {
    var activate, configureUploader, isUnique, isValid, vm;
    vm = this;
    vm.workId = $scope.workId;
    vm.uploaderUploading = null;
    vm.uploaderHasErrors = null;
    vm.uploaderHasFiles = null;
    vm.currentLink = '';
    vm.statusReport = {
      text: null,
      links: [],
      images: []
    };
    isValid = function(report) {
      return report.text !== null && !vm.uploaderHasErrors && !vm.uploaderUploading;
    };
    isUnique = function(link) {
      var unique;
      unique = true;
      vm.statusReport.links.forEach(function(vmLink) {
        if (vmLink.url === link) {
          return unique = false;
        }
      });
      return unique;
    };
    vm.addLink = function() {
      var ref;
      if (((ref = vm.currentLink) != null ? ref.length : void 0) && isUnique(vm.currentLink)) {
        vm.statusReport.links.push({
          url: vm.currentLink
        });
        return vm.currentLink = '';
      }
    };
    vm.removeLink = function(link) {
      return vm.statusReport.links.forEach(function(vmLink, index) {
        if (vmLink.url === link.url) {
          return vm.statusReport.links.splice(index, 1);
        }
      });
    };
    vm.create = function() {
      var params, resource;
      if (isValid(vm.statusReport)) {
        params = {
          projectId: vm.workId
        };
        resource = StatusReportAPIService.post(params, vm.statusReport);
        resource.$promise.then(function(response) {
          return $state.go('copilot-status-report-details', {
            id: vm.workId,
            reportId: response.id
          });
        });
        return resource.$promise["finally"](function() {});
      }
    };
    configureUploader = function(workId, assetType) {
      var category, domain, uploaderConfig;
      domain = API_URL;
      category = 'work';
      uploaderConfig = {
        name: assetType + "-uploader-" + workId + "-" + Date.now,
        allowMultiple: true,
        query: {
          url: domain + '/v3/attachments',
          params: {
            filter: "id=" + workId + "&assetType=" + assetType + "&category=" + category,
            fields: 'url'
          }
        },
        presign: {
          url: domain + '/v3/attachments/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/attachments',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/attachments/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
      return uploaderConfig;
    };
    activate = function() {
      vm.uploaderConfig = configureUploader(vm.workId, 'report');
      return vm;
    };
    return activate();
  };

  CreateController.$inject = ['$scope', '$state', 'API_URL', 'StatusReportAPIService'];

  angular.module('appirio-tech-ng-status-report').controller('CreateController', CreateController);

  ({
    captions: []
  });

}).call(this);

(function() {
  'use strict';
  var DetailController;

  DetailController = function($scope, StatusReportAPIService) {
    var activate, vm;
    vm = this;
    vm.workId = $scope.workId;
    vm.reportId = $scope.reportId;
    activate = function() {
      var params, resource;
      params = {
        projectId: vm.workId,
        reportId: vm.reportId
      };
      resource = StatusReportAPIService.get(params);
      resource.$promise.then(function(response) {
        return vm.report = response;
      });
      resource.$promise["finally"](function() {});
      return vm;
    };
    return activate();
  };

  DetailController.$inject = ['$scope', 'StatusReportAPIService'];

  angular.module('appirio-tech-ng-status-report').controller('DetailController', DetailController);

}).call(this);

(function() {
  'use strict';
  var PastReportsController;

  PastReportsController = function($scope, StatusReportAPIService) {
    var activate, vm;
    vm = this;
    vm.workId = $scope.workId;
    activate = function() {
      var params, resource;
      params = {
        projectId: vm.workId
      };
      resource = StatusReportAPIService.query(params);
      resource.$promise.then(function(response) {
        return vm.pastReports = response;
      });
      resource.$promise["finally"](function() {});
      return vm;
    };
    return activate();
  };

  PastReportsController.$inject = ['$scope', 'StatusReportAPIService'];

  angular.module('appirio-tech-ng-status-report').controller('PastReportsController', PastReportsController);

}).call(this);

(function() {
  'use strict';
  var StatusReportsController;

  StatusReportsController = function($scope, API_URL, StatusReportAPIService) {
    var activate, vm;
    vm = this;
    vm.workId = $scope.workId;
    activate = function() {
      return vm;
    };
    return activate();
  };

  StatusReportsController.$inject = ['$scope', 'API_URL', 'StatusReportAPIService'];

  angular.module('appirio-tech-ng-status-report').controller('StatusReportsController', StatusReportsController);

}).call(this);
