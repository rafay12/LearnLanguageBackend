import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class AuthRepository {
  findByEmail(email: string) {
    return db.orm.public.User.first({
      email,
    });
  }

  findById(id: number) {
    return db.orm.public.User.first({
      id,
    });
  }

  createUser(data: {
    email: string;
    passwordHash: string;
    username?: string;
    name?: string;
  }) {
    return db.orm.public.User.create({
      email: data.email,
      passwordHash: data.passwordHash,
      username: data.username,
      name: data.name,
    });
  }
}
