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
    }
}