const { app } = require("./app");

//Models
const { Users } = require("./models/user.model");
const { Tasks } = require("./models/tasks.model");

//Utils
const { db } = require("./utils/database.utils");

db.authenticate()
  .then(() => console.log("authenticate Successfull"))
  .catch(() => console.log("authenticate Fail "));

//Establish model's relations
Users.hasMany(Tasks, { foreignKey: "userId" });
Tasks.belongsTo(Users);
// Tasks.hasMany(Users, { foreignKey: "userId" });
// Users.belongsTo(Tasks);

db.sync()
  .then(() => console.log("Db synced"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("App running successfull");
});
