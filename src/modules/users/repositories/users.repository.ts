import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { EntityCondition } from '../../../shared/utils/types/entity-condition.type';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  createUser(data: CreateUserDto): Promise<User> {
    const user = this.create({ ...data });
    return this.save(user);
  }

  findOneUser(fields: EntityCondition<User>): Promise<User> {
    return this.findOne({
      where: fields,
    });
  }
}
