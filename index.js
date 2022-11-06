const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const myPromise = new Promise((res, rej) => {
    setTimeout(() => {
        resolve()
    })
})


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
            console.log('View All Employees selected')
            viewAllEmployees()
        } else if (userAction === 'Add Employee') {
            console.log('Add Employee selected')
        } else if (userAction === 'Update Employee Role'){
            console.log('Update Employee role selected')
        } else if (userAction === 'View All Roles'){
            console.log('View All Roles selected')
        } else if (userAction === 'View All Departments'){
            console.log('View All Departments selected')
            viewAllDepartments();
        } else if (userAction === 'Add Department'){
            console.log('Add Department selected')
        } else {
            mainMenu();
        }
    })
  }

  let viewAllEmployees = new Promise((res, rej) => {
    res(db.query('SELECT * FROM employee', function(err, results){
        console.log(cTable.getTable(results))
    }));
    rej(console.log(err));
  })

  viewAllEmployees.then(
    mainMenu()
  )

  function viewAllDepartments(){
    db.query('SELECT * FROM department', function(err, results){
        if (err) throw err;
        console.log(cTable.getTable(results))
    })
    mainMenu();
  }

  function init(){
    mainMenu()
  }


  init();