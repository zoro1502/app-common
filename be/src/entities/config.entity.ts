import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('configs', { schema: 'public' })
  export class ConfigEntity {
	@PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number;
  
	@Column('character varying', {nullable: false })
	app_name: string;
  
	@Column('character varying', { nullable: false })
	app_code: string;
  
	@Column('jsonb')
	url: Object;

	@Column()
	status: number;
  
	@Column()
	type_url: string;
  
	@Column('jsonb')
	params_search: Object;

	@Column('jsonb')
	headers: Object;

	@Column('jsonb')
	response: Object;

	@Column('jsonb')
	response_type: Object;

	@Column('jsonb')
	body_request: Object;

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
  