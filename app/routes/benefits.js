const { BenefitsDAO } = require("../data/benefits-dao");
const { environmentalScripts } = require("../../config/config");

function BenefitsHandler(db) {
  "use strict";

  const benefitsDAO = new BenefitsDAO(db);

  this.displayBenefits = (req, res, next) => {
    benefitsDAO.getAllNonAdminUsers((error, users) => {
      if (error) return next(error);

      console.log(req.session.isAdmin);

      return res.render("benefits", {
        users,
        user: {
          isAdmin: req.session.isAdmin,
        },
        environmentalScripts,
      });
    });
  };

  this.updateBenefits = (req, res, next) => {
    const { userId, benefitStartDate } = req.body;

    benefitsDAO.updateBenefits(userId, benefitStartDate, (error) => {
      if (error) return next(error);

      benefitsDAO.getAllNonAdminUsers((error, users) => {
        if (error) return next(error);

        const data = {
          users,
          user: {
            isAdmin: true,
          },
          updateSuccess: true,
          environmentalScripts,
        };

        return res.render("benefits", data);
      });
    });
  };
}

module.exports = BenefitsHandler;
