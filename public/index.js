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
                }).then(function(){
                    $http.get('api/submission').then(function(response){
                        $scope.subs = response.data
                        console.log(response.data)
                    })
                }), function (error) {
                    console.log('Error: ' + error)
                }
            }   

            $scope.deleteComment = function(id) {
                $http.delete('api/submission/' + id).then(function(data){
                    $scope.subs = data
                    console.log(data)
                }).then(function(){
                    $http.get('api/submission').then(function(response){
                        $scope.subs = response.data
                        console.log(response.data)
                    })
                }), function (error) {
                    console.log('Error: ' + error)
                }
                
                
            }
  })
