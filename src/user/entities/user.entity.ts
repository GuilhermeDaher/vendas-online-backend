import AddressEntity from '../../address/entities/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export default class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'cpf', nullable: false })
  cpf: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => AddressEntity, (addressEntity) => addressEntity.city)
  addresses?: AddressEntity[];
}
