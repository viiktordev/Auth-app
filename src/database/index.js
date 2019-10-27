import mongoose from 'mongoose';
import '../bootstrap';

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`, {
      auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
