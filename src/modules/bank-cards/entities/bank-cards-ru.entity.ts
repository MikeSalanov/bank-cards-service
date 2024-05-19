import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bank_cards_RU' })
export class BankCardsRu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_number: string;

  @Column()
  expiry_date: string;

  @Column()
  cvc_cvv: number;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
