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


const getSupervisorInputs = function()
{
  inquirer.prompt([
  {
    type: 'list',
     message: 'Please choose a menu option: ',
     choices: ['1. View Products Sale by Department', '2. Create New Department'],
     name: 'menuoptions'
  }
  ]).then(function(user) 
  {
    if (parseInt(user.menuoptions) === 1)
    {   
      let query =  `SELECT department_id, products.department_name, product_name, over_head_costs, product_sales from products JOIN departments ON (departments.department_name = products.department_name) ORDER BY department_id`;
      connection.query(query, function(error, results, fields){
        if (error) throw error;
        //console.log(results, fields);
        console.log('');
        console.log('=====   BAMAZON SUPERVISORS: PLEASE REVIEW PRODUCT SALES BY DEPARTMENT  =====');
        console.log('');
        console.log('D_ID  ' + 'D_NAME      ' + 'O_H_COSTS  ' + 'PRODUCT_SALES   ' + 'PROFIT    ' +  'P_NAME                                   ');
        console.log('--    ' + ' ---        ' + '--------   ' + '-------------   ' + '------    ' +  '------     ');
        for (let i=0; i< results.length; i++)
        {
          var profit;
          if (parseFloat(results[i].product_sales) > parseFloat(results[i].over_head_costs))
          {
            profit = results[i].product_sales - results[i].over_head_costs;
          }
          else profit = 0;
          console.log(results[i].department_id + '    ' + results[i].department_name + '    '  + results[i].over_head_costs + '       ' + results[i].product_sales + '          ' + parseFloat(profit) + '        ' + results[i].product_name);
        }
        console.log('');
        console.log('=========================================================================');
      });
      connection.end();
    }
    else
    if (parseInt(user.menuoptions) === 2)
    {
      inquirer.prompt([
        {
           type: 'input',
           message: 'Please enter department name: ',
           name: 'dname'
        },
        {
          type: 'input',
          message: 'Please enter department overhead costs: ',
          name: 'ohcost'
        }
        ]).then(function(newdept) 
         {
            let query = `INSERT INTO departments (department_name,over_head_costs) VALUES ('${newdept.dname}', '${newdept.ohcost}')`;
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
  getSupervisorInputs();
});
