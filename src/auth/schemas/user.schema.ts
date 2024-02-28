// //src/auth/schemas/user.schema.ts

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema({ timestamps: true })
// export class User {
//   save(): User | PromiseLike<User> {
//     throw new Error('Method not implemented.');
//   }
//   @Prop()
//   name: string;

//   @Prop({ unique: [true, 'Duplicate email entered'] })
//   email: string;

//   @Prop()
//   password: string;

//   @Prop()
//   telephone: string;

//   @Prop()
//   adresse: string;

//   @Prop({ default: 'admin' })
//   role: string;

//   @Prop({ default: null })
//   resetToken: string | null;

//   @Prop({ default: null })
//   resetTokenExpires: Date | null;
// }

// export type UserDocument = User & Document;
// export const UserSchema = SchemaFactory.createForClass(User);
