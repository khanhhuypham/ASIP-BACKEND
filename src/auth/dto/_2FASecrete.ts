import { Column } from "typeorm";




export class _2FASecret {
    secret: string;  // Make it optional to allow null values.
    QR_Code: string;  // Make it optional to allow null values.

    constructor(QR_Code: string, secret: string) {
        this.QR_Code = QR_Code;
        this.secret = secret;
    }
}

