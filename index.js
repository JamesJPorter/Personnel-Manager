const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


//Connect to database
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
            console.log('View All Employees selected')
            viewAllEmployees()
        } else if (userAction === 'Add Employee') {
            console.log('Add Employee selected')
            addEmployee();
        } else if (userAction === 'Update Employee Role'){
            console.log('Update Employee role selected')
        } else if (userAction === 'View All Roles'){
            console.log('View All Roles selected')
            viewAllRoles();
        } else if (userAction === 'View All Departments'){
            console.log('View All Departments selected')
            viewAllDepartments();
        } else if (userAction === 'Add Department'){
            console.log('Add Department selected')
        } else {
            mainMenu();
        }
    })
  };

  function viewAllEmployees(){
    db.query('SELECT * FROM employee', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function viewAllDepartments(){
    db.query('SELECT * FROM department', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function viewAllRoles(){
    db.query('SELECT * FROM role', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
        mainMenu();
    })
  }

  function addEmployee(){
    const newEmployee = [
        {
            type: 'input', 
            name: 'first_name', 
            message: 'Enter employees first name',
        }, 
        {
            type: 'input', 
            name: 'last_name', 
            message: 'Enter employees last name',
        }, 
        {
            type: 'input', 
            name: 'role_id', 
            message: 'Enter employees role ID',
        },
        {
            type: 'input', 
            name: 'manager_id', 
            message: `Enter the employees managers' ID`,
        },
    ]
    inquirer.prompt(newEmployee).then((data) => {
        console.log(cTable.getTable(data))
        db.query(`INSERT INTO 'employee'('first_name', 'last_name', role_id, manager_id) VALUES(${data.first_name}, ${data.last_name}, ${data.role_id}, ${data.manager_id});`)
        viewAllEmployees();
    })
  }

  function init(){
    mainMenu()
  }


  init();