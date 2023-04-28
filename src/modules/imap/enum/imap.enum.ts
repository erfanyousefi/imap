export enum ImapEvents {
    Ready = "ready",
    End = "end",
    Error = "error",
    Alert = "alert",
    Mail = "mail",
    Expunge = "expunge",
    Update = "update",
    Close = "close",
    UidValidity = "uidvalidity",
}
export enum ImapFlags {
    All = "\\All",
    Seen = "\\Seen",
    Deleted = "\\Deleted",
    Draft = "\\Draft",
    Flagged = "\\Flagged",
    Answered = "\\Answered",
}
export enum ImapMsgEvents {
    Attributes = 'attributes',
    End = 'end',
    Body = "body"
}
export enum ImapStreamData {
    Data = "data",
    End = "end"
}
export enum ImapCriteria {
    All="ALL",
    New="NEW",
    Answered="ANSWERED",
    Deleted = "DELETED",
    Draft = "DRAFT",
    Flagged = "FLAGGED",
    Seen = "SEEN",
    UnSeen = "UNSEEN",
    Recent="RECENT",
    Old="OLD",
    UnAnswered="UNANSWERED",
    UnDeleted="UNDELETED",
    UnDraft="UNDRAFT",
    UnFlagged="UNFLAGGED"
}
export enum ImapDateTimePrefix {
    Before="BEFORE",
    On="ON",
    Since="SINCE",
    SentBefore="SENTBEFORE",
    Senton="SENTON",
    SenTSince="SENTSINCE"
}