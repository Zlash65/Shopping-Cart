var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

	$scope.total = 0;
	
	// Main Page display Function to fetch data from database and fill the void
	$scope.refresh = function(){
		$http({method: 'POST', url: '/showProducts'}).then(function(response){
			$scope.products = response.data;
			console.log($scope.products);
			$scope.cart = [];
			x = $scope.products.length;

			for(var i=0;i<x;i++){
                $scope.products[i].qt_value = 0; // denotes quantity of item in Cart
                $scope.products[i].tempqtvalue = 0; 
            }
			
			$scope.matrix = []
			k=0;
			for(i=0;i<x/4;i++){
				row = []
				for(j=0;j<4;j++){
					$scope.products[k].qt_value = 0;
					row.push($scope.products[k]);
					k++;
				}
				$scope.matrix.push(row)
			}
			console.log($scope.matrix);
		});
	};
	$scope.refresh();

    // Opens an alert window to confirm your action
    $scope.confirmdelete = function (i) {
        $scope.itemdelete = i; // Set which element to delete from cart
        $('#deleteconfirm').modal('show'); // Confirming delete action
    };

    // Removing item from the cart
    $scope.deleteitem = function () {
        $('#deleteconfirm').modal('hide'); // Hiding the alert window
        console.log("here");
        for(var i=0;i<$scope.cart.length;i++){ // iterating through the cart to find the item to be deleted
            if($scope.itemdelete._id == $scope.cart[i]._id){ 
                $scope.cart[i].quantity += $scope.cart[i].qt_value; // Undo the total quantity of that item to normal
                $scope.total -= ($scope.cart[i].qt_value * $scope.cart[i].price) // Update the Total sum
                $scope.cart.splice(i,1); // Removing the item from cart
            }else{}
        }
    };

    // Main page, changing the input box Quantity to be added to Cart
    $scope.decrease_qt_value = function(item){
    	$('.shopping-cart').hide();
        if(item.tempqtvalue == 0){} // If the Quantity is already zero, dont go into negative
        else{
            item.tempqtvalue -= 1; // else decrement
        }
    };

    // Main page, changing the input box Quantity to be added to Cart
    $scope.increase_qt_value = function(item){
    	$('.shopping-cart').hide();
        if(item.tempqtvalue < item.quantity){ // Only increment it to the limit of available quantity
            item.tempqtvalue += 1;
        }
        else{}
    };

    // Changing item's quantity from the cart for final purchase
    $scope.decreaseFromCart = function(item){
        item.qt_value -= 1; // decrease by one
        if(item.qt_value == 0){ // If the counter becomes zero
            $scope.itemdelete = item; // Set the item to be deleted from cart
            $scope.deleteitem(); // Call the remove from Cart function
            if($scope.cart.length == 0){ // If after removing an item there is nothing in cart, then route to main page
                $('.shopping-cart').hide();
            }
        }
        item.quantity = item.quantity + 1; // Increase the quantity
        $scope.total = $scope.total - item.price; // decrease the total price
        
    };

    // Changing item's quantity from the cart for final purchase
    $scope.increaseFromCart = function(item){
        if(item.quantity!=0){ // Only increase if the item is in stock and available for purchase
            item.qt_value += 1; // Increase the count of how many to purcahse
            item.quantity = item.quantity - 1; // Update the total quantity of that item
            $scope.total = $scope.total + item.price; /// Increase the Total Sum
        }
        else{}
    };

    // Adding things to cart for checkout
    $scope.addToCart = function(item){
    	$('.shopping-cart').hide();
        if($scope.cart.indexOf(item) != -1){ // If the item is already in cart
            $('#sameInCart').modal('show'); // Open a modal window to decide next action
            item.tempqtvalue = 0;
        }
        else{
            item.qt_value = item.tempqtvalue; // Set the value of quantity of item to purchase
            item.quantity = item.quantity - item.qt_value; // Decrease the total that was available
            y = item;

            if(y.qt_value!=0){ // push the item to cart
                $scope.cart.push(y);
            } else{}

            item.tempqtvalue = 0;
            $scope.total  += y.qt_value * y.price; // Update the total
        }
    };

    $scope.checkout = function(){
        if($scope.cart.length == 0){ //If cart is empty and clicking checkout
            $('#emptyCart').modal('show');
            $('.shopping-cart').hide();
            // $scope.tableMain(); // Route to Main page
        }
        else{
            $('#checkingOut').modal('show'); // open a Confirmation Modal
        }
    };

    $scope.checkoutFinal = function(){ // Final Checkout
        $('#checkingOut').modal('hide'); // Hide the Confirmation Modal
        $http({method: 'POST', url: '/checkout', data: {cart: $scope.cart}}).then(function(response){
            $('.shopping-cart').hide();
        });
    }

    $scope.showCart = function(){
    	$('#sameInCart').modal('hide');
    	$('.shopping-cart').show();
    };

    $scope.home = function(){
    	$http({method: 'POST', url: '/'}).then(function(response){
            $('.shopping-cart').hide();
        });
    };

    $scope.home = function(){
    	$http({method: 'GET', url: '/'}).then(function(response){
            $('.shopping-cart').hide();
        });
    };

    $scope.admin = function(){
    	var newWindows = window.open("admin.html","_self");
    	// $http({method: 'GET', url: '/admin'}).then(function(response){
     //        $('.shopping-cart').hide();
        // });
    };
	

}]);

myApp.controller("AdminCtrl", ['$scope', "$http", function($scope,$http){

	$scope.refresh = function(){
		$http({method: 'POST', url: '/showProducts'}).then(function(response){
			$scope.products = response.data;
			console.log($scope.products);
		});
	};
	$scope.refresh();

}]);