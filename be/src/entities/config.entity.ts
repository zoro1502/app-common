import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('configs', { schema: 'public' })
  export class ConfigEntity {
	@PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number;
  
	@Column('character varying', { name: 'name', nullable: false })
	app_name: string;
  
	@Column('character varying', { name: 'code', nullable: false })
	app_code: string;
  
	@Column('jsonb')
	url: any;

	@Column()
	status: number;
  
	@Column()
	type_url: string;
  
	@Column('jsonb')
	params_search: any;

	@Column('jsonb')
	headers: any;

	@Column('jsonb')
	response: any;

	@Column('jsonb')
	body_request: any;

	@Column()
	code: string;
  
	@Column('timestamp with time zone', {
	  name: 'created_at',
	  default: () => 'now()',
	})
	created_at: Date;
  
	@Column('timestamp with time zone', {
	  name: 'updated_at',
	  nullable: true,
	  default: () => 'now()',
	})
	updated_at: Date | null;
  }
  