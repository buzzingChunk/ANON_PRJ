AnonApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home')

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: 'home.html'
        }
    var adminState = {
        name: 'admin',
        url: '/admin',
        templateUrl: 'admin.html'
    }

    $stateProvider.state(homeState)
    $stateProvider.state(adminState)
})