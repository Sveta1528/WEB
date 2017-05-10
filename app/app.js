var myapp = angular.module('myapp', ["ui.router"])
myapp.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/index")

  $stateProvider
    .state('index', {
        url: "/index",
        templateUrl: "index.html"
    })

    .state('page', {
        url: "/page",
        templateUrl: "page.html"
    })

    .state('page2', {
        url: "/page2",
        templateUrl: "page2.html"
    })

})
