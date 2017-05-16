
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
   this.note = notes;
});

var notes = [
];


function NotesCtrl($http, MyFactory){

  this.record = {};
  this.forupdate ={};
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

this.deleteNotes = function(note){

  var title = note.title;

  MyFactory.Delete(title).
  then(function (response) {
    console.log("DELETE request : OK");
  });
  var ind = findIndex(title);
  notes.splice(ind,1);
};

this.updateNotes = function(note){

  var title = note.title;
  var data = this.forupdate.text;

  MyFactory.Update(title,data).
  then(function (response) {
    console.log("PUT request : OK");
  });

  var ind = findIndex(title);

  notes[ind].text = data;
   this.forupdate = {};
};

  function findIndex (title){
    for (var i=0; i<notes.length; i++)
      if (notes[i].title == title)
        return i;
  }

};


})();
