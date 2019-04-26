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


const getManagerInputs = function()
{
  inquirer.prompt([
  {
     type: 'list',
     message: 'Please choose a menu option [1-4]: ',
     choices: ['1. View Products for Sale', '2. View Low Inventory', '3. Add to Inventory', '4. Add New Product'],
     name: 'menuoptions'
  }
  ]).then(function(user) 
   {
      // console.log("List option: " + user.menuoptions);
      if (parseInt(user.menuoptions) === 1)
      {
        connection.query(`SELECT * FROM products`, function(error, results, fields){
          if (error) throw error;
          //console.log(results, fields);
          console.log('');
          console.log('=====   BAMAZON MANAGERS: PLEASE REVIEW LIST OF PRODUCTS FOR SALE  =====');
          console.log('');
          console.log('Id  ' + '  $  ' + '    Qty  ' + '   Product    ');
          console.log('--  ' + ' --- ' + '   ----- ' + '   -----------');
          for (let i=0; i< results.length; i++)
          {
            console.log(results[i].item_id + '    ' + parseFloat(results[i].price) + '    ' + results[i].stock_quantity + '       ' + results[i].product_name);
          }
          console.log('');
          console.log('=========================================================================');
        });
        connection.end();
      }
      else
      if (parseInt(user.menuoptions) === 2)
      {
        connection.query(`SELECT * FROM products where stock_quantity < 5`, function(error, results, fields){
          if (error) throw error;
          //console.log(results, fields);
          console.log('');
          console.log('=============       LISTING LOW INVENTORY (<5) ITEMS        =============');
          console.log('');
          console.log('Id  ' + '$  ' + '  Qty  ' + 'Product');
          for (let i=0; i< results.length; i++)
          {
            console.log(results[i].item_id + '    ' + parseFloat(results[i].price) + '    ' + results[i].stock_quantity + '   ' + results[i].product_name);
          }
          console.log('');
          console.log('=========================================================================');
        });
        connection.end();
      }
      else
      if (parseInt(user.menuoptions) === 3)
      {
        console.log("Option 3 selected to update stock");
        inquirer.prompt([
          {
             type: 'input',
             message: 'Please choose an item number for stock update: ',
             name: 'itemnumber'
          },
          {
            type: 'input',
            message: 'Please enter the new stock quantity: ',
            name: 'quantity'
          }
          ]).then(function(inventoryupdate) 
           {
             let query = `UPDATE products SET stock_quantity= ${inventoryupdate.quantity} where item_id = ${inventoryupdate.itemnumber}`;
             console.log(query);
             connection.query(query, function(error,results, field){
              if (error) throw error;
              });
              connection.end();
           });
      }
      else
      if (parseInt(user.menuoptions) === 4)
      {
        console.log("Option 4 selected to add new product");
        inquirer.prompt([
          {
             type: 'input',
             message: 'Please enter product name: ',
             name: 'productname'
          },
          {
            type: 'input',
            message: 'Please enter department name: ',
            name: 'department'
          },
          {
            type: 'input',
            message: 'Please enter new stock quantity: ',
            name: 'quantity'
          },
          {
            type: 'input',
            message: 'Please enter product price: ',
            name: 'price'
          }
          ]).then(function(newproduct) 
           {
              let query = `INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ('${newproduct.productname}', '${newproduct.department}', ${newproduct.price}, ${newproduct.quantity})`;
              console.log(query);
              connection.query(query, function(error,results, field){
                if (error) throw error;
              });
              connection.end();
           });
      }
    });   
    
}

connection.connect(function(err) 
{
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
  getManagerInputs();
    // connection.end();
});
