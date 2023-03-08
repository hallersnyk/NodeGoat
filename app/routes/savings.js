const { SavingsDAO } = require("../data/savings-dao");
const { environmentalScripts } = require("../../config/config");

function SavingsHandler(db) {
  "use strict";

  const savingsDAO = new SavingsDAO(db);

  this.displaySavings = (req, res, next) => {
    savingsDAO.getAllUsersSavings((error, users) => {
      if (error) return next(error);

      console.log(JSON.stringify(users, null, 2));

      return res.render("savings", {
        users,
        user: {
          isAdmin: req.session.isAdmin,
        },
        environmentalScripts,
      });
    });
  };
}

module.exports = SavingsHandler;
