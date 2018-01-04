# Bamazon

#### HW #10 for The Coding Bootcamp at UT Austin

In this assignment, I created an Amazon-like storefront with the MySQL skills I learned this week. The app is split into two separate Node apps. One is the Customer View, which takes in orders from customers and depletes stock from the store’s inventory. The other is a Manager View, which provides the user with a list of menu options and performs different actions based on which one is selected.  

Because this is a CLI app, I have included screenshots of typical user flows through my app (for the customer and the manager). This includes views of the prompts and the responses after their selection. Screenshots located at the bottom of this file.  

I started by requiring the MySQL and ‘Inquirer’ npm packages, which are needed for data input and storage. 

I then created a MySQL databased called ‘Bamazon’. In the database I created a table called ‘products’ with the following columns: item_id, product_name, department_name, price, and stock_quantity. 


**Customer View:**

When the Node app ‘bamazonCustomer.js’ is run:

	* Display of all the items available for sale (includes ids, names, and prices of products for sale)

	* Prompts users with two messages:
	
		* The first one asks them the ID of the product they would like to buy
		* The second one asks them how many units of the product they would like to buy.

	* Once the customer has placed the order, the app checks if the store has enough of the product to meet the customer’s request. 

	* If not, the app will log a phrase like, ‘Insufficient quantity’, and then prevent the order from going through.

	* If the store does have enough of the product, the app fulfills the customer’s order. 
		* The SQL database is then updated to reflect the remaining quantity.
		* Once the update goes through, the app shows the customer the total cost of their purchase.


**Manager View:**

When the Node app ‘bamazonManager.js’ is run:

	* List of menu options:
	
		* View Products for Sale

		* View Low Inventory 

		* Add to Inventory 

		* Add New Product 

	* If a manager selects ‘View Products for Sale’, the app lists every available item (includes ids, names, prices, and quantities of products for sale).

	* If a manager selects ‘View Low Inventory’, the app lists all items with an inventory lower than five.

	* If a manager selects ‘Add to Inventory’, the app displays a prompt that will let the manager add more of any item currently in the store.

	* If a manager selects ‘Add New Product’, the app allows the manager to add a completely new product to the store. 



### Customer View Screenshots:

ScreenShot_1: bamazonCustomer: Initial “Items for Sale” and prompt “What is the ID of the item you would like to buy?”
![Image of ScreenShot_1](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Customer/ScreenShot_1.png)

ScreenShot_2: bamazonCustomer: Second prompt “How many units of the product would you like to buy?”
![Image of ScreenShot_2](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Customer/ScreenShot_2.png)

ScreenShot_3: bamazonCustomer: Checking stock and processing order
![Image of ScreenShot_3](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Customer/ScreenShot_3.png)

### Manager View Screenshots: 

ScreenShot_4: bamazonManager: Initial prompt list; user selects action
![Image of ScreenShot_4](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_4.png)

ScreenShot_5: bamazonManager: Action: View Products for Sale
![Image of ScreenShot_5](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_5.png)

ScreenShot_6: bamazonManager: Action: View Low Inventory
![Image of ScreenShot_6](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_6.png)

ScreenShot_7: bamazonManager: Action: Add to Inventory, first prompt “Which product would you like to add more of?”
![Image of ScreenShot_7](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_7.png)

ScreenShot_8: bamazonManager: Action: Add to Inventory, second prompt “How many units would you like to add?”
![Image of ScreenShot_8](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_8.png)

ScreenShot_9: bamazonManager: Action: Add New Product, four different prompts
![Image of ScreenShot_9](https://github.com/szunjic/Bamazon/blob/master/ScreenShots_Manager/ScreenShot_9.png)




