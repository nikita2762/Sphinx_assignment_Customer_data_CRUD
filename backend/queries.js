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
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).json({ status: 400, message: 'Missing fields' });
    return;
  }

  pool.query(
    'SELECT * FROM "User" WHERE email = $1 AND password = $2',
    [email, password],
    (error, results) => {
      if (error) {
        console.error('Error while attempting to log in');
        console.error(error);
        response.status(500).json({ status: 500, message: 'Internal Server Error' });
        return;
      }

      if (results.rows.length === 1) {
        // Login successful
        response.json({ status: 200, message: 'Login successful' });
      } else {
        // Check if the email or password is incorrect
        pool.query(
          'SELECT * FROM "User" WHERE email = $1',
          [email],
          (emailError, emailResults) => {
            if (emailError) {
              console.error('Error while checking email');
              console.error(emailError);
              response.status(500).json({ status: 500, message: 'Internal Server Error' });
              return;
            }

            if (emailResults.rows.length === 0) {
              // Wrong email
              response.status(401).json({ status: 401, message: 'Wrong email' });
            } else {
              // Wrong password
              response.status(401).json({ status: 401, message: 'Wrong password' });
            }
          }
        );
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