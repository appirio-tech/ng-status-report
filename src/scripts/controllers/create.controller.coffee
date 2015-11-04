'use strict'

CreateController = ($scope, $state, API_URL, StatusReportAPIService) ->
  vm                   = this
  vm.workId            = $scope.workId
  vm.uploaderUploading = null
  vm.uploaderHasErrors = null
  vm.uploaderHasFiles  = null
  vm.uploaderFiles = null
  vm.currentLink = ''
  vm.statusReport      =
    text: null
    links: []
    images: []

  isValid = (report) ->
    report.text != null && !vm.uploaderHasErrors && !vm.uploaderUploading

  isUnique = (link) ->
    unique = true
    vm.statusReport.links.forEach (vmLink) ->
      if vmLink.url == link
        unique = false

    unique

  vm.addLink = ->
    if vm.currentLink?.length && isUnique vm.currentLink
      vm.statusReport.links.push
        url: vm.currentLink

      vm.currentLink = ''

  vm.removeLink = (link) ->
    vm.statusReport.links.forEach (vmLink, index) ->
      if vmLink.url == link.url
        vm.statusReport.links.splice(index, 1)

  vm.create = ->
    if isValid vm.statusReport
      params =
        projectId: vm.workId

      resource = StatusReportAPIService.post params, vm.statusReport

      resource.$promise.then (response) ->
        $state.go 'copilot-status-report-details', {id: vm.workId, reportId: response.id}

      resource.$promise.finally ->

  configureUploader = (workId, assetType) ->
    domain = API_URL
    category = 'work'

    uploaderConfig =
      name: "#{assetType}-uploader-#{workId}-#{Date.now()}"
      allowMultiple: true
      allowCaptions: true
      onCaptionChange: (data) ->
        vm.statusReport.images.push
          caption: data.caption
          fileId: data.id
          path: data.path
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
    vm.uploaderConfig = configureUploader(vm.workId, 'status-report-image')

    vm

  activate()

CreateController.$inject = ['$scope', '$state', 'API_URL', 'StatusReportAPIService']

angular.module('appirio-tech-ng-status-report').controller 'CreateController', CreateController