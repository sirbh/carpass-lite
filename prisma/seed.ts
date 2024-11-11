// ./prisma/seed.ts
import {
  PrismaClient,
  engine_type,
  organization_type,
  report_type,
  question_type,
} from "@prisma/client";
import questions from "../data/questions.json";
import sections from "../data/sections.json";
import mapping from "../data/mapping.json";
import languages from "../data/languages.json";
import { genSalt, hash } from "bcrypt";

const prisma = new PrismaClient();

async function deleteAllTables() {
  //dont change the order of deletion
  await prisma.question_mapping.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.attachments.deleteMany({});
  await prisma.report_row.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.translation.deleteMany({});
  await prisma.language.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.organization.deleteMany({});
  // await prisma.order_row.deleteMany({});
  // await prisma.order.deleteMany({});
  // await prisma.delivered_order_row.deleteMany({});
  // await prisma.delivered_order.deleteMany({});
}

async function createLanguages() {
  await prisma.language.createMany({
    data: languages,
  });
}

async function createQuestions() {
  const defaultType: question_type = question_type.description;
  for (const q of questions) {
    let questionType: question_type = defaultType;
    if (q.type && Object.values(question_type).includes(q.type as question_type)) {
      questionType = q.type as question_type;
    }
    await prisma.question.create({
      data: {
        id: q.id,
        translations: {
          create: q.translations.map((t) => ({
            value: t.value,
            language_id: t.language_id,
          })),
        },
        type: questionType,
      },
    });
  }
}


async function createSections() {
  for (const s of sections) {
    await prisma.section.create({
      data: {
        id: s.id,
        translations: {
          create: s.translations.map((t) => ({
            value: t.value,
            language_id: t.language_id,
          })),
        },
        unit_price: s.unit_price,
      },
    });
  }
}

async function createQuestionMappings() {
  for (const m of mapping) {
    await prisma.question_mapping.create({
      data: {
        report_type: m["report_type"] as report_type,
        section_id: m["section_id"],
        question_id: m["question_id"],
        engine_type: m["engine_type"] as engine_type,
      },
    });
  }
}

async function addOrganization(organization:string,type:organization_type,user:string) {

  const org = await prisma.organization.create({
    data:{
      name: organization,
      type: type,
    }
  });

  
    const username = user;
    const password = "salasana";
    const firstname = "fname";
    const lastname = "lname";
    const organizationId = org.id;
  
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
  
    await prisma.user.create({
      data: {
        username,
        password_salt: salt,
        hashpassword: hashedPassword,
        firstname,
        lastname,
        organization:{
          connect:{
            id: organizationId
          }
        }
      },
    },
  );
}


async function main() {
  await deleteAllTables();
  await createLanguages();
  await createQuestions();
  await createSections();
  await createQuestionMappings();
  await addOrganization("ABC Inspection",organization_type.inspection,"inspector1");
  await addOrganization("XYZ Inspection",organization_type.inspection,"inspector2");
  await addOrganization("ABC Seller",organization_type.seller,"seller1");
  await addOrganization("XYZ Seller",organization_type.seller,"seller2");
  await addOrganization("Test Seller",organization_type.seller,"myyja");
  await addOrganization("Test Inspection",organization_type.inspection,"tarkastaja");

}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    void (async () => {
      await prisma.$disconnect();
    })();
  });
