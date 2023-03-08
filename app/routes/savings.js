const { SavingsDAO } = require("../data/savings-dao");
const { environmentalScripts } = require("../../config/config");

function SavingsHandler(db) {
  "use strict";

  const savingsDAO = new SavingsDAO(db);

  this.displaySavings = (req, res, next) => {
    const { userId, isAdmin } = req.session;
    const filterByUserId = isAdmin ? false : userId;

    savingsDAO.getAllUsersSavings(filterByUserId, (error, users) => {
      if (error) return next(error);

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
