let myNinjaApp = angular.module("myNinjaApp", ["ngRoute", "ngAnimate"]);

myNinjaApp.config([
  "$routeProvider",
  ($routeProvider) => {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "AppController",
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "AppController",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "contactController",
      })
      .when("/contact-success", {
        templateUrl: "views/contact-success.html",
        controller: "contactController",
      })
      .otherwise({
        redirectTo: "/home",
      });
  },
]);

myNinjaApp.directive("randomNinja", [
  function () {
    return {
      restrict: "E",
      scope: {
        ninjas: "=",
        title: "=",
      },
      templateUrl: "views/random.html",
      transclude: true,
      replace: true,
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      },
    };
  },
]);

myNinjaApp.controller("AppController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.removeNinja = (n) => {
      $scope.techGuys = $scope.techGuys.filter((ninja) => {
        return n.name !== ninja.name;
      });
    };

    $scope.addNewNinja = () => {
      $scope.techGuys.push({
        name: $scope.name,
        belt: $scope.belt,
        rate: $scope.rate,
        available: true,
      });
      $scope.name = "";
      $scope.rate = "";
      $scope.belt = "";
    };
    $scope.removeAll = () => {
      $scope.techGuys = [];
    };
    $http.get("data/guys.json").then(function (data) {
      $scope.techGuys = data.data;
    });
  },
]);

myNinjaApp.controller("contactController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.sendMessage = function () {
      $location.path("/contact-success");
    };
  },
]);
