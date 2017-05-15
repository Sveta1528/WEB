
(function() {
var app = angular.module('myApp', []);
app.factory('MyFactory', MyFactory);
app.controller('NotesCtrl', NotesCtrl);


function MyFactory ($http) {

  MyFactory.Read = function (title)
  {
        return $http.get('http://localhost:8000/records/'+title);
  }

  MyFactory.Create = function (title, data)
  {
        return $http.post('http://localhost:8000/records', { "text": data , "title": title})
  }

  MyFactory.Delete = function (title)
  {
        return $http.delete('http://localhost:8000/records/'+title);
  }

  MyFactory.Update = function (title, data)
  {
        return $http.put('http://localhost:8000/records/'+ title, { "text": data , "title": title})
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

app.controller('MainController', function($scope, MyFactory){
   MyFactory.Read("count_notes").then(function (response) {
    $scope.count = parseInt(response.data.text);
  });

   this.note = notes;
});

var notes = [
];

var number_notes = [

];



function NotesCtrl($http, MyFactory){

  this.record = {};
  var last = 0;

  this.addNotes = function(){
      this.record.title = last.toString();
      notes.push(this.record);


      MyFactory.Create(this.record.title, this.record.text).
      then(function (response) {
        console.log("POST request : OK");
      });

      this.record = {};
      last++;
  };

  this.deleteNotes = function(){
    var title = this.delete.number.toString();

    MyFactory.Delete(title).
    then(function (response) {
      console.log("DELETE request : OK");
    });

    var ind =0;

    for (var i=0; i<notes.length; i++)
      if (notes[i].title == title)
      {
        ind = i;
        break;
      }

    notes.splice(ind,1);

  }
};

})();
