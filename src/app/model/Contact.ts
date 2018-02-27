import {IContact} from './IContact';
import {IAttachment} from "./IAttachment";


export class Contact implements IContact {

  constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public title?: string,
    public food?: string,
    public notes?: string,
    public photo?: string,
    public phone?: string,
    public profilePic?: IAttachment[],
    public imgUrl?: string
  ) { }
}
