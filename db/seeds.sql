INSERT INTO department (dept_name)
VALUES  ("Director"),
        ("Purchasing"),
       ("Hospitality"),
       ("Rentals"),
       ("Marketing"),
        ("Web Dev"),
        ("Custodial");

INSERT INTO role (title, salary, department_id)
VALUES  ("Director of Operations", 120000.00, 1),
        ("CFO", 80000.00, 2),
       ("Patron Services Manager", 60000.00, 3),
       ("Rental Manager", 80000.00, 4),
       ("Marketing Manager", 80000.00, 5),
       ("Lead Developer", 100000.00, 6),
       ("Lead Custodian", 50000.00, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Keeley", 1, NULL),
        ("Stephanie", "Tarvyd", 2, 1),
       ("James", "Porter", 3, 1),
       ("Anthony", "Jones", 4, 1),
       ("Baha", "Ebhrahimzadeh", 5, 1),
       ("Pranay", "", 6, NULL), 
       ("Steve", "Jarnagin", 7, 1);

