CREATE TABLE public.cargos (
  id SERIAL,
  nome VARCHAR(60) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT cargos_pkey PRIMARY KEY(id)
) 
WITH (oids = false);

ALTER TABLE public.cargos
  OWNER TO postgres;


CREATE TABLE public.centro_de_custos (
  id SERIAL,
  nome VARCHAR(60) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT centro_de_custos_pkey PRIMARY KEY(id)
) 
WITH (oids = false);

ALTER TABLE public.centro_de_custos
  OWNER TO postgres;  

CREATE TABLE public.departamentos (
  id SERIAL,
  nome VARCHAR(60) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  centro_de_custos_id INTEGER,
  CONSTRAINT departamentos_pkey PRIMARY KEY(id),
  CONSTRAINT departamentos_centro_de_custos_id_fkey FOREIGN KEY (centro_de_custos_id)
    REFERENCES public.centro_de_custos(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE public.departamentos
  OWNER TO postgres;  

CREATE TABLE public.usuarios (
  id SERIAL,
  nome VARCHAR(40) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  cargos_id INTEGER,
  departamentos_id INTEGER,
  CONSTRAINT usuarios_pkey PRIMARY KEY(id),
  CONSTRAINT usuarios_cargos_id_fkey FOREIGN KEY (cargos_id)
    REFERENCES public.cargos(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
    NOT DEFERRABLE,
  CONSTRAINT usuarios_departamentos_id_fkey FOREIGN KEY (departamentos_id)
    REFERENCES public.departamentos(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE public.usuarios
  OWNER TO postgres;  