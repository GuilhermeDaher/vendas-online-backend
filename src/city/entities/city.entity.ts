import AddressEntity from '../../address/entities/address.entity';
import StateEntity from '../../state/entities/state.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'city' })
export default class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'state_id', nullable: false })
  state_id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => AddressEntity, (addressEntity) => addressEntity.city)
  addresses?: AddressEntity[];

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: StateEntity;
}
