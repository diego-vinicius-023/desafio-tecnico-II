--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: MobileMed; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "MobileMed";


ALTER SCHEMA "MobileMed" OWNER TO postgres;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: Modalidade; Type: TYPE; Schema: MobileMed; Owner: postgres
--

CREATE TYPE "MobileMed"."Modalidade" AS ENUM (
    'CR',
    'CT',
    'DX',
    'MG',
    'MR',
    'NM',
    'OT',
    'PT',
    'RF',
    'US',
    'XA'
);


ALTER TYPE "MobileMed"."Modalidade" OWNER TO postgres;

--
-- Name: InserirExame(uuid, character varying, date, "MobileMed"."Modalidade"); Type: PROCEDURE; Schema: MobileMed; Owner: postgres
--

CREATE PROCEDURE "MobileMed"."InserirExame"(IN idpaciente uuid, IN nomeexame character varying, IN dataexame date, IN dicom "MobileMed"."Modalidade")
    LANGUAGE plpgsql
    AS $$DECLARE
    chave_concat text;
    IDExame uuid;
BEGIN
    chave_concat := IDPaciente::text || DataExame::text || LOWER(NomeExame) || DICOM::text;
    IDExame := uuid_generate_v3(uuid_ns_url(), chave_concat);
    INSERT INTO "MobileMed"."Exames" (
        "IDExame", "IDPaciente", "NomeExame", "DataExame", "DICOM"
    ) VALUES (
        IDExame, IDPaciente, NomeExame, DataExame, DICOM
    );
END;$$;


ALTER PROCEDURE "MobileMed"."InserirExame"(IN idpaciente uuid, IN nomeexame character varying, IN dataexame date, IN dicom "MobileMed"."Modalidade") OWNER TO postgres;

--
-- Name: InserirPaciente(character varying, character varying); Type: PROCEDURE; Schema: MobileMed; Owner: postgres
--

CREATE PROCEDURE "MobileMed"."InserirPaciente"(IN nomecompleto character varying, IN cpf character varying)
    LANGUAGE plpgsql
    AS $$BEGIN
	INSERT INTO "MobileMed"."Pacientes"("ID", "NomeCompleto", "CPF")
	VALUES (
		uuid_generate_v3(uuid_ns_url(), cpf),
		nomecompleto,
		cpf
	);
END;$$;


ALTER PROCEDURE "MobileMed"."InserirPaciente"(IN nomecompleto character varying, IN cpf character varying) OWNER TO postgres;

--
-- Name: ObterExames(uuid, integer, integer); Type: FUNCTION; Schema: MobileMed; Owner: postgres
--

CREATE FUNCTION "MobileMed"."ObterExames"(idpaciente uuid, page integer, pagesize integer) RETURNS TABLE("IDExame" uuid, "IDPaciente" uuid, "NomeExame" character varying, "DataExame" date, "DICOM" "MobileMed"."Modalidade")
    LANGUAGE plpgsql
    AS $$BEGIN
	RETURN QUERY
	SELECT * 
	FROM "MobileMed"."Exames" exames
	WHERE exames."IDPaciente" = idpaciente
	OFFSET (pagesize*(page-1))
	LIMIT pagesize;

END; $$;


ALTER FUNCTION "MobileMed"."ObterExames"(idpaciente uuid, page integer, pagesize integer) OWNER TO postgres;

--
-- Name: ObterPacienteUnico(uuid); Type: FUNCTION; Schema: MobileMed; Owner: postgres
--

CREATE FUNCTION "MobileMed"."ObterPacienteUnico"(idpaciente uuid) RETURNS TABLE("ID" uuid, "NomeCompleto" character varying, "CPF" character varying)
    LANGUAGE plpgsql
    AS $$BEGIN
	RETURN QUERY
	SELECT * 
	FROM "MobileMed"."Pacientes" pacientes
	WHERE pacientes."ID" = idpaciente;

END;$$;


ALTER FUNCTION "MobileMed"."ObterPacienteUnico"(idpaciente uuid) OWNER TO postgres;

--
-- Name: ObterPacientes(integer, integer); Type: FUNCTION; Schema: MobileMed; Owner: postgres
--

CREATE FUNCTION "MobileMed"."ObterPacientes"(page integer, pagesize integer) RETURNS TABLE("ID" uuid, "NomeCompleto" character varying, "CPF" character varying)
    LANGUAGE plpgsql
    AS $$BEGIN
	RETURN QUERY
	SELECT * 
	FROM "MobileMed"."Pacientes"
	OFFSET (pagesize*(page-1))
	LIMIT pagesize;

END;$$;


ALTER FUNCTION "MobileMed"."ObterPacientes"(page integer, pagesize integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Exames; Type: TABLE; Schema: MobileMed; Owner: postgres
--

CREATE TABLE "MobileMed"."Exames" (
    "IDExame" uuid NOT NULL,
    "IDPaciente" uuid NOT NULL,
    "NomeExame" character varying NOT NULL,
    "DataExame" date NOT NULL,
    "DICOM" "MobileMed"."Modalidade" NOT NULL
);


ALTER TABLE "MobileMed"."Exames" OWNER TO postgres;

--
-- Name: Pacientes; Type: TABLE; Schema: MobileMed; Owner: postgres
--

CREATE TABLE "MobileMed"."Pacientes" (
    "ID" uuid NOT NULL,
    "NomeCompleto" character varying(128) NOT NULL,
    "CPF" character varying(11) NOT NULL
);


ALTER TABLE "MobileMed"."Pacientes" OWNER TO postgres;

--
-- Name: Exames Exames_pkey; Type: CONSTRAINT; Schema: MobileMed; Owner: postgres
--

ALTER TABLE ONLY "MobileMed"."Exames"
    ADD CONSTRAINT "Exames_pkey" PRIMARY KEY ("IDExame");


--
-- Name: Pacientes Pacientes_pkey; Type: CONSTRAINT; Schema: MobileMed; Owner: postgres
--

ALTER TABLE ONLY "MobileMed"."Pacientes"
    ADD CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("ID");


--
-- Name: Exames Exames_IDPaciente_fkey; Type: FK CONSTRAINT; Schema: MobileMed; Owner: postgres
--

ALTER TABLE ONLY "MobileMed"."Exames"
    ADD CONSTRAINT "Exames_IDPaciente_fkey" FOREIGN KEY ("IDPaciente") REFERENCES "MobileMed"."Pacientes"("ID");


--
-- PostgreSQL database dump complete
--

