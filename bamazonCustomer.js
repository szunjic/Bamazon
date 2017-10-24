var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the displayItems function after the connection is made 
  displayItems();
});

// running this app will first display all of the items available for sale. 
// include the ids, names, and prices of products for sale.
function displayItems() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		//console.log(results);
		console.log('ITEMS FOR SALE')
		console.log('===========================')
	  	results.forEach(function (product) {
	  		console.log('Item ID: ' + product.item_id);
	  		console.log('Product name: ' + product.product_name);
	  		console.log('Price: $' + product.price);
	  		console.log('===========================')
	  	});
	  	// run the placeOrder function to prompt the user after items are displayed 
	  	placeOrder();
	});
};

// the app should then prompt users with two messages.
	// the first should ask them the ID of the product they would like to buy.
	// the second message should ask how many units of the product they would like to buy.
function placeOrder () {
	inquirer
		.prompt([
			{
				name: 'id',
				type: 'input',
				message: 'What is the ID of the item you would like to buy?'
			},
			{
				name: 'units',
				type: 'input',
				message: 'How many units of the product would you like to buy?'
			},
		])
		.then(function(answer) {
			var item = answer.id;
			var units = answer.units;
			console.log('****** Checking if your items are in stock ******');	
			checkStock(item, units);		
		});

};


// Once the customer has placed the order, 
// your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like 'Insufficient quantity!',
// and then prevent the order from going through.

// However, if your store does have enough of the product, 
// you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function checkStock(item, units) {
connection.query('SELECT * FROM products WHERE ?',
	{
		item_id: item
	},	
	function (error, results, fields) {
  		if (error) throw error;
  		//console.log(results);
  		var currentStock = results[0].stock_quantity;
  		if (units > currentStock) {
  			console.log('Insufficient quantity!');
  			console.log('Your order for ' + results[0].product_name + ' cannot be filled at this time');
  			console.log('Try ordering another item:');
  			placeOrder();
  		} else {
  			console.log('Your ' + results[0].product_name + ' is in stock!');
  			//console.log(quantity);
  			var newStock = currentStock - units;
  			//console.log(newStock);	
  			updateDB(item, newStock);
  			totalCost(item, units);
  		};
	});
};

// update SQL database to reflect remaining quantity
// show customer the total cost of their purchase 
function updateDB(item, newStock) {
	connection.query('UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: newStock
			},

			{
				item_id: item
			}
		],
		function(error, results, fields) {

	});
};

function totalCost(item, units) {
	console.log('****** Processing your order ******');
	connection.query('SELECT * FROM products WHERE ?',
		{
			item_id: item
		},	
		function(error, results, fields) {					
			//console.log(results);
			var item = results[0].product_name;
			var price = results[0].price;
			var totalCost = price * units;
			//console.log(price);
			//console.log(totalCost);
			console.log('Your order for ' + units + ' units of ' + item + ' is complete');
			console.log('The total cost of purchase is $' + totalCost);


			connection.end();
	});
}










