import {IAttachment} from "./IAttachment";

export class Attachment implements IAttachment {
  constructor(
    public Id?: string,
    public Name?: string,
    public Description?: string,
    public Phase?: string,
    public Document?: string,
    public Url?: string
  ){}
}
