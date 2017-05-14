var app = angular.module('myApp', []);

app.controller('GetDoController',
    function GetDoController($scope, $http){

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/1',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.do_text = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/2',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.features_header = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/3',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.features_text = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/4',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.setup_text = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/5',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.design_text = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/6',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.display_text = response.data.text;
    });

    $http({
    method: 'GET',
    url: 'http://localhost:8000/records/7',
    dataType:"json"
    }).then(function successCallback(response) {
      $scope.support_text = response.data.text;
    });

    });
