interface IAccount {
  _id: string;
  name: string;
  email: string;
  // Stored as a hashed string (scrypt format)
  password: string;
  pictures: string;
  createdAt: Date;
  updatedAt: Date;
}
