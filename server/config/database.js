const { connect } = require("mongoose");

async function connect_to_DB() {
  try {
    await connect(
      "mongodb+srv://saad-bouchra-amine:saad-bouchra-amine@cluster0.ucym5uu.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "e-commerceDB" }
    );
  } catch (error) {
    throw new Error("can not connect to db");
  }
}

module.exports = { connect_to_DB };
