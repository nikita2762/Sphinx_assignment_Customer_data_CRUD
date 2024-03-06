const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo_database',
  password: '7020',
  port: 5432,
});

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id);
  // console.log(id);

  pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    // console.log('no error ');
    response.status(200).json(results.rows);
  });
};

const createCustomer = (request, response) => {
  const { name, email, phone } = request.body;
  pool.query(
    'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) ',
    [name, email, phone],
    
    (error, results) => {
      if (error) {
        console.log('error while creating customer');
        console.log(error);
        throw error;
      }
      // response.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
      response.status(201).json({status: 201, message: `New Customer added successfully!`})
    }
  );
};

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, phone } = request.body;

  pool.query(
    'UPDATE customers SET name = $1, email = $2, phone = $3 WHERE id = $4',
    [name, email, phone, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      // response.status(200).send(`Customer modified with ID: ${id}`);
      response.status(200).json({status: 200, message: `Customer modified with ID: ${id}`})
    }
  );
};

const deleteCustomer = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    // response.status(200).send(`Customer deleted with ID: ${id}`);
    response.status(200).json({status: 200, message: `Customer deleted with ID: ${id}`})
  });
};

const createuser = (request, response) => {
  const { username, email, password} = request.body;
  console.log(username, email, password);
  pool.query(
    'INSERT INTO "User" (username,email,password) VALUES ($1, $2, $3)',
    [username, email, password],
    (error, results) => {
      if (error) {
        console.log('error while signing up');
        console.log(error);
        throw error;
      }
      // response.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
      response.status(201).json({status: 201, message: `New user added`})
    }
  );
};

const loginuser = (request, response) => {
  const { username, password } = request.body;
  console.log(username, password);

  pool.query(
    'SELECT * FROM "User" WHERE username = $1 AND password = $2',
    [username, password],
    (error, results) => {
      if (error) {
        console.log('Error while attempting to log in');
        console.log(error);
        throw error;
      }

      if (results.rows.length === 1) {
        // Login successful
        response.json({ status: 200, message: 'Login successful' });
      } else {
        // Invalid username or password
        response.status(401).json({ status: 401, message: 'Invalid username or password' });
      }
    }
  );
};

pool.query('SELECT 1', (error, results) => {  // Log a message indicating successful database connection
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createuser,
  loginuser

};