import {IAttachment} from "./IAttachment";


export interface IContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  food?: string;
  notes?: string;
  photo?: string;
  phone?: string;
  imgUrl?: string;
  profilePic?: IAttachment[];

}
