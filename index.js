<<<<<<< HEAD
const express = require('express');
const app = express();
const pool = require('./db');
const jwt = require('jsonwebtoken');
const SECRET = 'gabriel';

app.use(express.json()); //=>req.body

//Routes//
app.post('/login', (req, res) => {
  const { user, password } = req.body;
  const id = 1; //esse id viria do banco de dados
  if (user === 'teste' && password === 123) {
    const token = jwt.sign({ id }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});
function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();

    next();
  });
}
//get all persons
app.get('/persons', verifyJWT, async (req, res) => {
  try {
    //await
    const getAllPersons = await pool.query('select * from person');
    res.json(getAllPersons.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//get a person
app.get('/persons/:personId', verifyJWT, async (req, res) => {
  const { personId } = req.params;
  try {
    //await

    const getAPerson = await pool.query(
      'select * from person WHERE "personId" = $1',
      [personId],
    );
    res.json(getAPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//create person
app.post('/person', verifyJWT, async (req, res) => {
  try {
    //await
    const { personId, name, localization, poder, mestre, armamento, breath } =
      req.body;
    const newPerson = await pool.query(
      'INSERT INTO person ("personId",name, localization,poder,mestre,armamento,breath) VALUES ($1, $2, $3, $4, $5, $6,$7)RETURNING *',
      [personId, name, localization, poder, mestre, armamento, breath],
    );
    res.json(newPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//update  person
app.put('/persons/:personId', verifyJWT, async (req, res) => {
  try {
    const { personId } = req.params; //WHERE
    const { name, localization, poder, mestre, armamento, breath } = req.body; //SET

    const updatePerson = await pool.query(
      'UPDATE person SET name = $1,localization = $2,poder = $3,mestre = $4,armamento = $5,breath= $6  WHERE "personId" = $7',
      [name, localization, poder, mestre, armamento, breath, personId],
    );
    res.json('Person was updated !');
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//delete person
app.listen(3001, () => {
  console.log('listening port 3001');
});
=======
const express = require('express');
const app = express();
const pool = require('./db');
const jwt = require('jsonwebtoken');
const SECRET = 'gabriel';

app.use(express.json()); //=>req.body

//Routes//
app.post('/login', (req, res) => {
  const { user, password } = req.body;
  const id = 1; //esse id viria do banco de dados
  if (user === 'teste' && password === 123) {
    const token = jwt.sign({ id }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});
function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();

    next();
  });
}
//get all persons
app.get('/persons', verifyJWT, async (req, res) => {
  try {
    //await
    const getAllPersons = await pool.query('select * from person');
    res.json(getAllPersons.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//get a person
app.get('/persons/:personId', verifyJWT, async (req, res) => {
  const { personId } = req.params;
  try {
    //await

    const getAPerson = await pool.query(
      'select * from person WHERE "personId" = $1',
      [personId],
    );
    res.json(getAPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

//create person
app.post('/person', verifyJWT, async (req, res) => {
  try {
    //await
    const { personId, name, localization, poder, mestre, armamento, breath } =
      req.body;
    const newPerson = await pool.query(
      'INSERT INTO person ("personId",name, localization,poder,mestre,armamento,breath) VALUES ($1, $2, $3, $4, $5, $6,$7)RETURNING *',
      [personId, name, localization, poder, mestre, armamento, breath],
    );
    res.json(newPerson.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//update  person
app.put('/persons/:personId', verifyJWT, async (req, res) => {
  try {
    const { personId } = req.params; //WHERE
    const { name, localization, poder, mestre, armamento, breath } = req.body; //SET

    const updatePerson = await pool.query(
      'UPDATE person SET name = $1,localization = $2,poder = $3,mestre = $4,armamento = $5,breath= $6  WHERE "personId" = $7',
      [name, localization, poder, mestre, armamento, breath, personId],
    );
    res.json('Person was updated !');
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});
//delete person
app.listen(3001, () => {
  console.log('listening port 3001');
});
>>>>>>> 7bf9f3e5cbfe27b5c8e6673a4bec666f0c0f4557
