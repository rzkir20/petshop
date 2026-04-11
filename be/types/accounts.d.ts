interface Account {
  _id: string;
  name: string;
  email: string;
  password: string;
  pictures: string;
  createdAt: Date;
  updatedAt: Date;
}

type AccountBase = {
  name: string;
  email: string;
  password: string;
  pictures: string;
  createdAt: Date;
  updatedAt: Date;
};

type AccountDocument = InferSchemaType<typeof accountSchema> & { _id?: Types.ObjectId };

type CreateAccountInput = {
  name: string;
  email: string;
  password: string;
  pictures?: string;
};