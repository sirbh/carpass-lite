-- CreateEnum
CREATE TYPE "inspection_status" AS ENUM ('red', 'yellow', 'green');

-- CreateEnum
CREATE TYPE "organization_type" AS ENUM ('maintenance', 'seller', 'inspection', 'repair');

-- CreateEnum
CREATE TYPE "engine_type" AS ENUM ('petrol', 'diesel', 'hybrid_diesel', 'hybrid_gasoline', 'electric', 'hybrid');

-- CreateEnum
CREATE TYPE "report_type" AS ENUM ('full', 'narrow', 'light');

-- CreateEnum
CREATE TYPE "attachment_type" AS ENUM ('image', 'audio');

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('started', 'not_started', 'ready');

-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('description', 'leftrightnumeric', 'singlenumeric');

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "type" "organization_type" NOT NULL,
    "business_number" VARCHAR,
    "address" VARCHAR,
    "city" VARCHAR,
    "postcode" INTEGER,
    "phone" BIGINT,
    "email" VARCHAR,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "email" TEXT,
    "hashpassword" VARCHAR,
    "role" VARCHAR,
    "username" VARCHAR NOT NULL,
    "password_salt" VARCHAR NOT NULL,
    "language_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "modified_by_user" INTEGER,
    "organization_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "registration_number" TEXT,
    "production_number" TEXT,
    "brand_and_model" TEXT,
    "odometer_reading" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_by_user" INTEGER,
    "organization_id" INTEGER,
    "engine_type" "engine_type",

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_row" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER,
    "question_id" INTEGER,
    "inspection_status" "inspection_status",
    "comment" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_by_user" INTEGER,
    "input_left" INTEGER,
    "input_left_measurement" TEXT,
    "input_right" INTEGER,
    "input_right_measurement" TEXT,
    "additional_input" INTEGER,
    "additional_input_measurement" TEXT,

    CONSTRAINT "report_row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "data" BYTEA,
    "attachment_type" "attachment_type",
    "report_row_id" INTEGER NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "type" "question_type" NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_mapping" (
    "id" SERIAL NOT NULL,
    "engine_type" "engine_type" NOT NULL,
    "report_type" "report_type" NOT NULL,
    "section_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "question_mapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "code" VARCHAR NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translation" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR,
    "language_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "questionId" INTEGER,
    "sectionId" INTEGER,

    CONSTRAINT "translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "report_row_report_id_question_id_key" ON "report_row"("report_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "question_id_key" ON "question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "section_id_key" ON "section"("id");

-- CreateIndex
CREATE UNIQUE INDEX "language_id_key" ON "language"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_row" ADD CONSTRAINT "report_row_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_row" ADD CONSTRAINT "report_row_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_report_row_id_fkey" FOREIGN KEY ("report_row_id") REFERENCES "report_row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_mapping" ADD CONSTRAINT "question_mapping_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_mapping" ADD CONSTRAINT "question_mapping_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD CONSTRAINT "translation_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
