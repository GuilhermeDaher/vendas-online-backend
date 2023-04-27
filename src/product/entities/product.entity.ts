import { CategoryEntity } from "../../category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'category_id', nullable: false })
    category_id: number

    @Column({ name: 'category_id', nullable: false })
    price: number

    @Column({ name: 'category_id', nullable: false })
    image: string

    @Column({ name: 'created_at', })
    created_at: Date;

    @Column({ name: 'updated_at', })
    updated_at: Date;

    @ManyToOne(
        () => CategoryEntity, (category: CategoryEntity) => category.products
    )
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id'})
    category?: CategoryEntity

}