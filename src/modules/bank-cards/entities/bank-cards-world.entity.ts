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

  @Column('string')
  brand: string;

  @Column('string')
  exp_month: string;

  @Column('string')
  exp_year: string;

  @Column('string')
  payment_method_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
