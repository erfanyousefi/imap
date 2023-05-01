declare namespace NodeJS {
    interface ProcessEnv {
        //application config
        PORT: number;
        //typeorm config
        DB_HOST: string
        DB_NAME: string
        DB_PORT: number
        DB_USERNAME: string
        DB_PASSWORD: string
        //mail-server config
        IMAP_USERNAME: string
        IMAP_PASSWORD: string
        IMAP_HOST: string
        IMAP_PORT: number
        IMAP_TLS: boolean

        //nodemailer
        MAILER_HOST: string,
        MAILER_PORT: number,
        MAILER_SECURE: boolean,
        MAILER_TYPE: string,
        MAILER_USER: string,
        MAILER_PASSWORD: string
        MAILER_FROM: string,
    }
}