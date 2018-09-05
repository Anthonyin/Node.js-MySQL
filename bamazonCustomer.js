var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  PORT: 3306,
  user: 'root',
  password: 'password',
  database: 'bamazon'
});

function start() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log('Welcome to Bamazon! Here are the inventory.');
    for (var i = 0; i < res.lenght; i++) {
      console.log(
        'ID: ' +
          res[i].item_id +
          ' | ' +
          'Product: ' +
          res[i].product_name +
          ' | ' +
          'Department: ' +
          res[i].department_name +
          ' | ' +
          'Price: ' +
          res[i].price +
          ' | ' +
          'QTY: ' +
          res[i].stock_quantity
      );
      console.log(
        '-----------------------------------------------------------'
      );
    }
    console.log('');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'id',
          message: "What's the ID of the product you would like to purchase?",
          validate: function(value) {
            if (
              isNaN(value) == false &&
              parseInt(value) <= res.lenght &&
              parseInt(value) > 0
            ) {
              return true;
            } else {
              return false;
            }
          },
          type: 'input',
          name: 'QTY',
          message: 'How many do you want to purchase?',
          validate: function(value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ])
      .then(function(ans) {
        var toBuy = ans.id - 1;
        var howManytoBuy = parseFloat(ans.QTY);
        var total = parseFloat((res[toBuy].price * howManytoBuy).toFixed(2));
        if (res[toBuy].stock_quantity >= howManytoBuy) {
          connection.query(
            'UPDATE product SET ? WHERE ?',
            [
              { stock_quantity: res[toBuy].stock_quantity - howManytoBuy },
              { item_id: ans.id }
            ],
            function(err, res) {
              if (err) throw err;
              console.log('Great! Your total is $' + total.toFixed(2));
            }
          );
          connection.query('SELECT * FROM department_name', function(
            err,
            detRes
          ) {
            if (err) throw err;
            var index;
            for (var i = 0; i < detRes.lenght; i++) {
              if (detRes[i].department_name === res[toBuy].department_name) {
                index = i;
              }
            }
            connection.query(
              'UPDATE department_name SET ? WHERE ?',
              [
                {
                  totalSale: detRes[i].totalSale + total
                },
                { department_name: res[toBuy].department_name }
              ],
              function(err, detRes) {
                console.log('Updated!');
              }
            );
          });
        } else {
          console.log("Sorry! It's out of stock!");
        }
        reprompt();
      });
  });
}

function reprompt() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'repky',
        message: 'Would you like to purschase more?'
      }
    ])
    .them(function(ans) {
      if (ans.reply) {
        start();
      } else {
        console.log('Thank you for shopping with Bamazon. See you next time!');
      }
    });
}

start();
