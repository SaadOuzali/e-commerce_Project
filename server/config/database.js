const { connect } = require("mongoose");

async function connect_to_DB() {
  return connect(
      "mongodb+srv://saad-bouchra-amine:saad-bouchra-amine@cluster0.ucym5uu.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "e-commerceDB" }
    )
}

module.exports = { connect_to_DB };
