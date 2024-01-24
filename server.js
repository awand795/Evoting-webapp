const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Settings = db.settings;
const User = db.user;
const bcrypt = require("bcryptjs");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
const initRoutes = require("./app/routes/upload.routes");
initRoutes(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/kandidat.routes")(app);
require("./app/routes/settings.routes")(app);
require("./app/routes/vote.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  User.estimatedDocumentCount((err,count)=>{
    if(!err && count === 0 ){
      
      const admin = new User({
        name:"Admin",
        username:"admin",
        password: bcrypt.hashSync("admin",8),
        status:"Belum Memilih"
      })
      
      admin.save(err => {
        if (err) {
          console.log("error", err);
        }

        Role.findOne({name:"admin"},(err,role)=>{
          if(err){
            console.log("Error",err)
            return
          }

          admin.roles = [role._id]
          admin.save(err=>{
            console.log("Error",err)
            return;
          })
          console.log("added 'Admin' to User collection");
        })
      });

      const user = new User({
        name:"User",
        username:"user",
        password: bcrypt.hashSync("user",8),
        status:"Belum Memilih"
      })
      
      user.save(err => {
        if (err) {
          console.log("error", err);
        }

        Role.findOne({name:"user"},(err,role)=>{
          if(err){
            console.log("Error",err)
            return
          }

          user.roles = [role._id]
          user.save(err=>{
            console.log("Error",err)
            return;
          })
          console.log("added 'User' to User collection");
        })
      });
      
    }
  })

  Settings.estimatedDocumentCount((err,count)=>{
    if (!err && count === 0) {
      new Settings({
        status: "open"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Status' to Settings collection");
      });
      
    }
  })
}
