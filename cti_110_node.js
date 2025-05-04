
// This section loads modules.  It loads the Express server and stores
// it in "express", then creates a application, a router, and a path handler
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

// This part sets up the database
const {Pool} = require('pg');
// You may need to modify the password or database name in the following line:
const connectionString = `postgres://postgres:CTI_110_WakeTech@localhost/Gradebook_Pannese`;
// The default password is CTI_110_WakeTech
// The default database name is Gradebook
const pool = new Pool({connectionString:connectionString})

// This line says when it's looking for a file linked locally,
// check in sub-folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// This creates a new anonymous function that runs whenever 
// someone calls "get" on the server root "/"
router.get('/', function(req, res){
    // It just returns a file to their browser 
    // from the same directory it's in, called gradebook.html
    res.sendFile(path.join(__dirname, 'gradebook.html'));
});

app.use("/", router);

router.get('/api/grades', function(req, res) {
  pool.query(
    `SELECT s.first_name || ' ' || s.last_name AS name,
            a.title AS assignment1,
            a.description AS assignment2,
            TO_CHAR(a.due_date, 'YYYY-MM-DD') AS assignment3
     FROM students s
     LEFT JOIN assignments a ON s.student_id = a.student_id
     ORDER BY s.student_id`,
    [],
    function(err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database query failed' });
      }

      res.status(200).json(result.rows);
    }
  );
});

let server = app.listen(3000, function(){
    console.log("App Server via Express is listening on port 3000");
    console.log("To quit, press CTRL + C");
});