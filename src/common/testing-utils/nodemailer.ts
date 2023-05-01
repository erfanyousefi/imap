import { faker } from "@faker-js/faker";
import { ISendMailOptions, MailerOptions } from "@nestjs-modules/mailer"
import { config } from "dotenv";

config()
export const NodeMailerConfig = (): MailerOptions => {
    const { MAILER_FROM, MAILER_HOST, MAILER_PASSWORD, MAILER_PORT, MAILER_SECURE, MAILER_TYPE, MAILER_USER } = process.env;
    return {
        transport: {
            host: MAILER_HOST,
            port: +MAILER_PORT,
            secure: false,
            auth: {
                type: MAILER_TYPE,
                user: MAILER_USER,
                pass: MAILER_PASSWORD
            }
        },
        defaults: {
            from: MAILER_FROM,
        }
    }
}

export const SendMailOptions = (): ISendMailOptions => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email();
    const randomPhone = faker.phone.number("09#########")
    return {
        to: "codenight.ir@gmail.com",
        subject: 'Test Email for find student data',
        text: ` Hello   
        {{name=${randomName}}}
{{email=${randomEmail}}}
{{mobile=${randomPhone}}}

Thanks.
        `,
    }
}