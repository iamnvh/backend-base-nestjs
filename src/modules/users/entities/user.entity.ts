import { AUTH_PROVIDER } from 'src/modules/auth/constants/auth-provider.constants';
import { BaseEntity, Column, Entity, Index, Unique } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Unique('email', ['email'])
  @Column({ type: 'varchar', name: 'email', length: 255, nullable: true })
  email: string | null;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 255,
    select: true,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'boolean',
    name: 'isVerified',
    default: false,
    nullable: true,
  })
  isVerified: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isAccountDisable: boolean;

  @Column('simple-array')
  role: string[];
  @Column({
    type: 'varchar',
    name: 'provider',
    length: 255,
    default: AUTH_PROVIDER.EMAIL,
  })
  provider: string;

  @Index()
  @Column({ nullable: true, name: 'social_id', type: 'varchar', length: 255 })
  socialId: string;

  @Index()
  @Column({ nullable: true, name: 'firs_name', type: 'varchar', length: 255 })
  firstName: string | null;

  @Index()
  @Column({ nullable: true, name: 'last_name', type: 'varchar', length: 255 })
  lastName: string | null;

  @Index()
  @Column({ nullable: true, name: 'token', type: 'varchar', length: 255 })
  token: string;

  @Column({ type: 'varchar', name: 'expire_in', nullable: true })
  expireIn: string;
}
