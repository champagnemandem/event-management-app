import {IAgendum} from './IAgendum';
import {IUser} from './IUser';

export class Agendum implements IAgendum {
  constructor(
    public Id?: string,
    public AgendaName?: string,
    public CreatedBy?: string,
    public LastModifiedBy?: string,
    public Agendum_Item_Img?: string,
    public Description?: string,
    public End_DateTime?: string,
    public Location?: string,
    public Purpose?: string,
    public Room?: string,
    public SessionId?: string,
    public Start_DateTime?: string,
    public Invitees?: IUser[],
    public Activities?: string,
    public Open?: boolean,
    public Presenter?: string
  ){}
}
