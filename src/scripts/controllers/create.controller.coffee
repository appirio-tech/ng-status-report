'use strict'

CreateController = ($scope, API_URL, StatusReportAPIService) ->
  vm                   = this
  vm.workId            = $scope.workId
  vm.uploaderUploading = null
  vm.uploaderHasErrors = null
  vm.uploaderHasFiles  = null
  vm.statusReport      =
    text: null
    links: []
    images: []

  isValid = (report) ->
    report.text != null && !vm.uploaderHasErrors && !vm.uploaderUploading

  vm.create = ->
    if isValid vm.statusReport
      updates =
        text: null
        links: []
        images: []

      resource = StatusReportAPIService.post params, report

      resource.$promise.then ->
      resource.$promise.finally ->

  configureUploader = (workId, assetType) ->
    domain = API_URL
    category = 'work'

    uploaderConfig =
      name: "#{assetType}-uploader-#{workId}"
      allowMultiple: true
      query:
        url: domain + '/v3/attachments'
        params:
          filter: "id=#{workId}&assetType=#{assetType}&category=#{category}"
          fields: 'url'
      presign:
        url: domain + '/v3/attachments/uploadurl'
        params:
          id: workId
          assetType: assetType
          category: category
      createRecord:
        url: domain + '/v3/attachments'
        params:
          id: workId
          assetType: assetType
          category: category
      removeRecord:
        url: domain + '/v3/attachments/:fileId'
        params:
          filter: 'category=' + category

    uploaderConfig

  activate = ->
    configureUploader(vm.workId, 'report')

    vm

  activate()

CreateController.$inject = ['$scope', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'CreateController', CreateController