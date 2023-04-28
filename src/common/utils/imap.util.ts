import * as Imap from "node-imap";
import { TDataHeader } from "../types/imap.type";
import { ImapCriteria, ImapFlags, ImapMsgEvents, ImapStreamData } from "src/modules/imap/enum/imap.enum";
import { simpleParser } from "mailparser";

export function ImapFetchOption() {
    return {
        bodies: '',
        struct: true,
        markSeen: true
    }
}
export function ImapEmailData(dataHeader: any): TDataHeader {
    return {
        "date": dataHeader.date[0],
        "subject": dataHeader.subject[0],
        "from": dataHeader.from[0],
        "to": dataHeader.to[0],
        "content": dataHeader.content[0],
        "attachment": dataHeader.attachment[0]
    }
}
export function ImapMessageBodyHandler(msg: Imap.ImapMessage, users: any[]) {
    let buffer = '';
    console.log("body");
    msg.on(ImapMsgEvents.Body, (stream: NodeJS.ReadableStream, info: Imap.ImapMessageBodyInfo): void => {
        stream.on(ImapStreamData.Data, chunk => {
            buffer += chunk.toString("utf8")
        })
        stream.once(ImapStreamData.End, async () => {
            const parsedMail: any = await simpleParser(buffer);
                let dataHeader = Imap.parseHeader(buffer);
                dataHeader.content = [parsedMail?.text ?? parsedMail?.content];
                dataHeader.attachment = [parsedMail?.attachments?.[0]?.content];
                let emails_data = ImapEmailData(dataHeader);
                let user = {};
                const regexp = /(mobile|name|email)=[a-z0-9\s\\.\@]{2,}/gim;
                const result = emails_data?.content?.match(regexp);
                if (result && Array.isArray(result)) {
                    for (const item of result) {
                        const [key, value] = item.split("=");
                        user[key] = value;
                    }
                }
                console.log(emails_data);
                users.push(user);
                user = {};
        });
    });
}
export function ImapMessageAttributeHandler(imap: Imap, msg: Imap.ImapMessage) {
    return new Promise((resolve, reject) => {
        msg.once(ImapMsgEvents.Attributes, function (attrs) {
            let uid = attrs.uid;
            imap.addFlags(uid, [ImapFlags.Seen], function (err) {
                err ? reject(err) : resolve("Done, marked email as read!");
            });
        });
    })
}
export function SearchInMails(imap: Imap, criteria: ImapCriteria | ImapCriteria[], dateTimeFormat: any[], users: any[]) {
    let searchFilter = typeof criteria == "string" ? [criteria, dateTimeFormat] : [...criteria, dateTimeFormat]
    imap.search(searchFilter, function (err, results) {
        if (err) return console.log(err.message)
        if (!results || results.length === 0) return console.log("not found any new mail")
        const fetchMail = imap.seq.fetch(results, ImapFetchOption());
        fetchMail.on("message", async (msg: Imap.ImapMessage, seqno: number) => {
            ImapMessageBodyHandler(msg, users)
            const result = await ImapMessageAttributeHandler(imap, msg).catch(err => console.log(err.message));
            console.log(result);
            msg.once(ImapMsgEvents.End, function () {
                console.log(`(#${seqno}) Finished`);
            });
        });
        fetchMail.once('error', err => console.log(err.message));
        fetchMail.once('end', () => {
            imap.end();
            console.log('Done fetching all messages!');
        });
    })
} 