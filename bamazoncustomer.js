let mysql = require("mysql");
var inquirer = require('inquirer');
let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 8889, 
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});


const getCustomerInputs = function()
{
  inquirer.prompt([
  {
     type: 'input',
     name: 'itemnumber',
     message: 'Please enter the item number you would like to purchase'
     // validate: function(value)
     // {
     //     var valid = !isNaN(parseFloat(value));
     //     return valid || 'Please enter an item number: ';
     // }
  },
    
  {
     type: 'input',
     name: 'quantity',
     message: 'Please enter the quantity you would like to order: '
     // validate: function(value)
     // {
     //     var valid = !isNaN(parseFloat(value));
     //     return valid || 'Please enter the quantity you would like to order: ';
     // }
  } 
  ]).then(function(user) 
   {
     connection.query(`SELECT stock_quantity, price, product_sales FROM products WHERE item_id = ${user.itemnumber}`, function(error, results, fields){
     if (error) throw error;
    //  console.log(results);
     console.log("Quantity left: " + results[0].stock_quantity + " Price: " + results[0].price + " User request: " + user.quantity); 
     if (results[0].stock_quantity < user.quantity)
     {
      console.log('==============================================');
      console.log('');
      console.log(`You have ordered ${user.quantity} of item ${user.itemnumber}. However we only have ${results[0].stock_quantity} left of this item. Please re-send your order. `);
      console.log('');
      console.log('==============================================');
     }           
     else
     {

       //Inform the customer of their total cost
       let cost = user.quantity*results[0].price;
       console.log('==============================================');
       console.log('');
       console.log(`Congratulations! Your order for ${user.quantity} quantities of item ${user.itemnumber} was successfully placed. Your total cost is: ${cost}. `);
       console.log('');
       console.log('==============================================');

       // update the qty in the DB 
       let updateQty = results[0].stock_quantity - user.quantity;
       connection.query(`UPDATE products SET stock_quantity= ${updateQty} where item_id = ${user.itemnumber}`, function(error,results, field){
       if (error) throw error;
       });

       //update the product_sales column so that when a customer purchases 
       //the price of the product multiplied by the quantity purchased is 
       // added to the product's product_sales column 
       let productSales = results[0].product_sales + user.quantity * results[0].price;
       connection.query(`UPDATE products SET product_sales=${productSales} where item_id = ${user.itemnumber}`, function(error, results, field){
         if (error) throw error;
       });      
       
     }
     connection.end();
    });
  
    });
}      


connection.connect(function(err) 
{
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query(`SELECT * FROM products`, function(error, results, fields){
    if (error) throw error;
    //console.log(results, fields);
    console.log('================WELCOME TO BAMAZON. PLEASE REVIEW OUR LIST OF OFFERINGS===========');
    console.log('');
          console.log('Id  ' + '  $  ' + '    Qty  ' + '   Product    ');
          console.log('--  ' + ' --- ' + '   ----- ' + '   -----------');
          for (let i=0; i< results.length; i++)
          {
            console.log(results[i].item_id + '    ' + parseFloat(results[i].price) + '    ' + results[i].stock_quantity + '       ' + results[i].product_name);
          }
          console.log('');
    console.log('==================================================================================');
   
    getCustomerInputs();
    // connection.end();
  });
});
