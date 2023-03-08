/* The SavingsDAO must be constructed with a connected database object */
function SavingsDAO(db) {
  "use strict";

  /* If this constructor is called without the "new" operator, "this" points
   * to the global object. Log a warning and call it correctly. */
  if (false === this instanceof SavingsDAO) {
    console.log(
      "Warning: SavingsDAO constructor called without 'new' operator"
    );
    return new SavingsDAO(db);
  }

  const usersCol = db.collection("users");

  this.getAllUsersSavings = (userId, callback) => {
    const usersFilter = userId ? { _id: userId } : {};
    usersCol
      .aggregate([
        {
          $lookup: {
            from: "savings",
            localField: "_id",
            foreignField: "userId",
            as: "savings",
          },
        },
        {
          $match: usersFilter,
        },
      ])
      .toArray((err, users) => callback(null, users));
  };
}

module.exports = { SavingsDAO };
