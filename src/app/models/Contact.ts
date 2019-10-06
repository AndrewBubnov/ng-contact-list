export class Contact {
    constructor(
    public name: string,
    public mail: string,
    public phone: string | number,
    public edited: boolean,
    public _id?: string
    ){}
}