import {IContact} from "./IContact";

export interface IAgendum {
    Id?: string;
    AgendaName?: string;
    CreatedBy?: string;
    LastModifiedBy?: string;
    Agendum_Item_Img?: string;
    Description?: string;
    End_DateTime?: string;
    Location?: string;
    Purpose?: string;
    Room?: string;
    SessionId?: string;
    Start_DateTime?: string;
    Presenter?: IContact;
    Activities?: string;
    Open?: boolean;
}
