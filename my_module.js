(function() {
    var app = angular.module('my_module', []);

    app.controller('my_ctrl', ['$scope', '$http', function($scope, $http) {

        $scope.pizzaOrders = [];
        $scope.modify_table = []; 
    
        $scope.getOrders = function() {
            $http({
                    method: 'GET',
                    url: 'https://api.parse.com/1/classes/pizza_orders',
                    headers: {
                        'X-Parse-Application-Id': '2JZEVI5oBpApKjp2WInn6UE1pGF1s6H2Had6VTxN',
                        'X-Parse-REST-API-Key': 'Gtcg6ujbg4k11oTmpLPXzQBFCgKQ4LEGp71Xdu6f'
                    },
                }).success(function(data, status) {
                    console.log(data)
                    $scope.pizzaOrders = data.results;

                    //Build hashmap using objectId of each item
                    for (var i = 0 ; i < $scope.pizzaOrders.length; i++) {
                      $scope.modify_table[$scope.pizzaOrders[i].objectId] = false;
                    }
                })
                .error(function(data, status) {
                    console.log("Error: " + data.error);
                });
        };

        $scope.addOrder = function() {
            var new_name = document.getElementById('clientNameInput').value;
            var new_size = document.getElementById('pizzaSizeInput').value;
            var new_city = document.getElementById('cityInput').value;
            var new_price = document.getElementById('priceInput').value;

            $http({
                    method: 'POST',
                    url: 'https://api.parse.com/1/classes/pizza_orders',
                    headers: {
                        'X-Parse-Application-Id': '2JZEVI5oBpApKjp2WInn6UE1pGF1s6H2Had6VTxN',
                        'X-Parse-REST-API-Key': 'Gtcg6ujbg4k11oTmpLPXzQBFCgKQ4LEGp71Xdu6f'
                    },
                    data: {
                        client_name: new_name,
                        pizza_size: new_size,
                        city: new_city,
                        price: parseInt(new_price)
                    }
                }).success(function(data, status) {
                    document.getElementById('clientNameInput').value = "";
                    document.getElementById('pizzaSizeInput').value = "";
                    document.getElementById('cityInput').value = "";
                    document.getElementById('priceInput').value = "";
                    $scope.getOrders();
                })
                .error(function(data, status) {
                    console.log("Error: " + data.error);
                });
        }

        $scope.updateOrder = function(item){
            $scope.modify_table[item.objectId] = false;

            $http({
                    method: 'PUT',
                    url: 'https://api.parse.com/1/classes/pizza_orders/' + item.objectId,
                    headers: {
                        'X-Parse-Application-Id': '2JZEVI5oBpApKjp2WInn6UE1pGF1s6H2Had6VTxN',
                        'X-Parse-REST-API-Key': 'Gtcg6ujbg4k11oTmpLPXzQBFCgKQ4LEGp71Xdu6f'
                    },
                    data: {
                        client_name: item.client_name,
                        pizza_size: item.pizza_size,
                        city: item.city,
                        price: parseInt(item.price)
                    }
                }).success(function(data, status) {
                    $scope.getOrders();
                })
                .error(function(data, status) {
                    console.log("Error: " + data.error);
                });
        };

        $scope.removeOrder = function(item){
             $http({
                    method: 'DELETE',
                    url: 'https://api.parse.com/1/classes/pizza_orders/' + item.objectId,
                    headers: {
                        'X-Parse-Application-Id': '2JZEVI5oBpApKjp2WInn6UE1pGF1s6H2Had6VTxN',
                        'X-Parse-REST-API-Key': 'Gtcg6ujbg4k11oTmpLPXzQBFCgKQ4LEGp71Xdu6f'
                    }
                }).success(function(data, status) {
                    $scope.getOrders();
                })
                .error(function(data, status) {
                    console.log("Error: " + data.error);
                });
        };

        $scope.modifyOrder = function(item){
            $scope.modify_table[item.objectId] = true;
        };

    }]);
})();