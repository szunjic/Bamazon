var mysql = require("mysql");
var inquirer = require("inquirer");

// List a set of menu options:
	// View Products for Sale
	// View Low Inventory
	// Add to Inventory
	// Add New Product

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
  // run the menuOptions function after the connection is made 
  menuOptions();
});

function menuOptions() {
	inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "Select an action",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) {
      switch (answer.options) {
      	case 'View Products for Sale':
      		return viewProducts();
      	break;
      	case 'View Low Inventory':
      		return viewLowInventory();
      	break;
      	case 'Add to Inventory':
      		return addInventory();
      	break;
      	case 'Add New Product':
      		return addProduct();
      	break;
      	default:
      	console.log('bye');
      	connection.end();
      	break;
      }

    });
}


// View Products for Sale
	 // list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		//console.log(results);
		console.log('ITEMS FOR SALE')
		console.log('===========================')
	  	results.forEach(function (product) {
	  		console.log('Item ID: ' + product.item_id);
	  		console.log('Product name: ' + product.product_name);
	  		console.log('Price: $' + product.price);
	  		console.log('Stock quantity: ' + product.stock_quantity);
	  		console.log('===========================')
	  	});
	});

};

// View Low Inventory
	 // list all items with an inventory count lower than five.
function viewLowInventory() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		//console.log(results);
  		var lowInventoryProducts = [];
  		results.forEach(function(product) {
  			if (product.stock_quantity < 5) {
  				lowInventoryProducts.push(product);
  			};
  		})
  		console.log('LOW INVENTORY ITEMS (less than 5)')
  		console.log('===========================')
  		lowInventoryProducts.forEach(function(product) {
  			console.log('Product name: ' + product.product_name);
  			console.log('Stock quantity: ' + product.stock_quantity);
  			console.log('===========================');
  		})
	});

};

// Add to Inventory
	// display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
  		if (error) throw error;
  		inquirer
    		.prompt([
	    		{
	     			name: "product_choice",
	     	 		type: "list",
	      			message: "Which product would you like to add more of?",
	      			choices: function() {
	      				var choices = [];
	      				for (var i = 0; i < results.length; i++) {
	      					choices.push(results[i].product_name);
	      				}
	      				return choices;
	      			}
	    		},
	    		{
	    			name: "units",
	    			type: "input",
	    			message: "How many units would you like to add?",
	    			validate: function(value) {
	    				return !isNaN(value);
	    			}
	    		},	
    		])
    		.then(function(answer) {
      			var item;
      			results.forEach(function (product) {
      				if (product.product_name === answer.product_choice) {
      					item = product;
      				}
      			});
      		connection.query('UPDATE products SET ? WHERE ?',
      			[
      				{
      					stock_quantity: item.stock_quantity + parseInt(answer.units)
      				},
      				{
      					item_id: item.item_id
      				}
      			],
      			function (error, results, fields) {
  					if (error) throw error;
  					console.log('Addition to inventory complete');
  					//console.log(results);
  				});

    	});

	});	
	
}; 


// Add New Product
	// allow the manager to add a completely new product to the store.
function addProduct() {
	inquirer.prompt([
		{
			name: 'product_name',
			type: 'input',
			message: 'What product would you like to add to the store?'

		},
		{
			name: 'price',
			type: 'input',
			message: 'How much will this product cost?',
			validate: function(value) {
				return !isNaN(value);
			}

		},
		{
			name: 'department_name',
			type: 'input',
			message: 'What department will this product belong to?'

		},
		{
			name: 'stock_quantity',
			type: 'input',
			message: 'How many units of this product would you like?',
			validate: function(value) {
				return !isNaN(value);
			}

		},
		]).then(function (answers) {
 			connection.query('INSERT INTO products SET ?', answers,  



 				function (error, results, fields) {
  				if (error) throw error;
				console.log('New item has been added');
				//console.log(results);
  			});
	});

};



// connection.end();


