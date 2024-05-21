import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bank_cards_world' })
export class BankCardsWorld {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  last_numbers: number;

  @Column('varchar')
  exp_month: string;

  @Column('varchar')
  exp_year: string;

  @Column('varchar')
  payment_method_id: string;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
