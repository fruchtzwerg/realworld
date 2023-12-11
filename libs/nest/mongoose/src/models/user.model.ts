import { AsyncModelFactory, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash, getRounds } from 'bcrypt';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '@realworld/dto';

@Schema()
export class UserModel implements Omit<User, 'token'> {
  @Prop({
    unique: true,
    sparse: true,
    trim: true,
    set: (v: string) => v.toLowerCase(),
  })
  email!: string;

  @Prop({ select: false })
  password!: string;

  @Prop({ unique: true, sparse: true, trim: true })
  username!: string;

  @Prop({ default: '' })
  bio!: string;

  @Prop({ type: String, default: null })
  image!: string | null;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        autopopulate: true,
      },
    ],
    default: [],
  })
  followers!: UserModel[];

  @Prop({ virtual: true })
  following!: boolean;
}

export type UserDocument = HydratedDocument<UserModel>;
export const UserModelSchema = SchemaFactory.createForClass(UserModel);

const isHashed = (password: string) => {
  try {
    return !!getRounds(password);
  } catch (e) {
    return false;
  }
};

export const UserModelFactory: AsyncModelFactory = {
  name: UserModel.name,
  useFactory: () => {
    const schema = UserModelSchema;

    schema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();

      const isHash = isHashed(this.password);
      if (isHash) return next();

      this.password = await hash(this.password, 12);
      next();
    });

    return schema;
  },
  collection: 'users',
};
