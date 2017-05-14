var app = angular.module('myApp', []);
app.factory('MyFactory', MyFactory);


function MyFactory ($http) {

  MyFactory.Read = function (title)
  {
        return $http.get('http://localhost:8000/records/'+title);
  }

  return MyFactory;
}

app.directive('getDirective', function($http, MyFactory) {
  return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      template: '<div> {{smth}} </div>',
      link: function (scope, element, attrs) {
        MyFactory.Read(attrs.title).
        then(function (response) {
          scope.smth = response.data.text;
        });
      }
    }
});
