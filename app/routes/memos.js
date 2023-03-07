const MemosDAO = require("../data/memos-dao").MemosDAO;
const { environmentalScripts } = require("../../config/config");

function MemosHandler(db) {
  "use strict";

  const memosDAO = new MemosDAO(db);

  this.addMemos = (req, res, next) => {
    const { userId } = req.session;
    memosDAO.insert(req.body.memo, userId, (err, docs) => {
      if (err) return next(err);
      this.displayMemos(req, res, next);
    });
  };

  this.displayMemos = (req, res, next) => {
    const { userId, isAdmin } = req.session;

    const filterByUserId = isAdmin ? false : userId;

    memosDAO.getAllMemos(filterByUserId, (err, docs) => {
      if (err) return next(err);

      return res.render("memos", {
        memosList: docs,
        userId: userId,
        user: {
          isAdmin: req.session.isAdmin,
        },
        environmentalScripts,
      });
    });
  };
}

module.exports = MemosHandler;
