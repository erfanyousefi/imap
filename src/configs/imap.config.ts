import * as Imap from "node-imap";

export function ImapConfig(): Imap.Config{
    const {IMAP_HOST, IMAP_PASSWORD, IMAP_PORT, IMAP_TLS, IMAP_USERNAME} = process.env;
    console.log(IMAP_HOST, IMAP_PASSWORD, IMAP_PORT, IMAP_TLS, IMAP_USERNAME);
    
    return {
        user: IMAP_USERNAME,
        password: IMAP_PASSWORD,
        host: IMAP_HOST,
        port: IMAP_PORT,
        tls: IMAP_TLS
    }
} 