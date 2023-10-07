CREATE TABLE configs (
	id SERIAL
  app_name varchar(255) NOT NULL,
  app_code varchar(255) NOT NULL,
  url jsonb NULL,
  status int default -1,
    type_url varchar(255) NOT NULL,
  params_search jsonb NULL,
    headers jsonb NULL,
  response jsonb NULL,
  body_request jsonb NULL,
  code varchar(255) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  CONSTRAINT apps_pkey PRIMARY KEY (id)
);

