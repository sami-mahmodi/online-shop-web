const bcrypt = require("bcryptjs");
const db = require("../data/database");
class User {
  constructor(email, password, fullname, street, postal, city) {
    (this.email = email),
      (this.password = password),
      (this.name = fullname),
      (this.address = {
        street: street,
        postalcode: postal,
        city: city,
      });
  }

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
