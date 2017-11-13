let AnonApp = angular.module('AnonApp', ['ui.router'])

AnonApp.controller('MainController',  function($scope, $http) {


    $scope.formData = {}
    
            $http.get('api/submission').then(function(response){
                $scope.subs = response.data
                console.log(response.data)
            })

            $scope.createComment = () =>{
                $http.post('/api/submission', $scope.formData).then(function(response){
                    $scope.formData = {}
                    $scope.subs = response.data
                    console.log("data inserted")
                })
            }   
  })
