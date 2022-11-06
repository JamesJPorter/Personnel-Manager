const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'staff_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

  function mainMenu(){
    const home = [
        {
            type: 'list', 
            name: 'Menu', 
            message: 'What would you like to do?', 
            choices: [
                'View All Employees', 
                'Add Employee', 
                'Update Employee Role', 
                'View All Roles', 
                'View All Departments', 
                'Add Department'
            ]
        }
    ]
    inquirer.prompt(home).then((data) => {
        console.log('data', data)
        const userAction = data.Menu;
        console.log('userAction', userAction)
        if (userAction === 'View All Employees'){
            console.log(data)
            viewAllEmployees()
        } else if (userAction === 'Add Employee') {
            console.log('Add Employee selected')
        } else if (userAction === 'Update Employee Role'){
            console.log('Update Employee role selected')
        } else if (userAction === 'View All Roles'){
            console.log('View All Roles selected')
        } else if (userAction === 'View All Departments'){
            console.log('View All Departments selected')
        } else if (userAction === 'Add Department'){
            console.log('Add Department selected')
        } else {
            mainMenu();
        }
    })
  }

  function viewAllEmployees(){
    db.query('SELECT * FROM employee', function(err, results){
        console.log(results)
        const employeeString = JSON.stringify(results)
        cTable.getTable(results)
    })
  }

  function viewAllDepartments(){
    db.query('SELECT * FROM department', function(err, results){
        console.log(results)
        
    })
  }

  function init(){
    mainMenu()
  }


  init();