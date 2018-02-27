import {IUser} from './IUser';
import {IAgendum} from './IAgendum';
import {IAttachment} from "./IAttachment";
import {IDiscussion} from "./IDiscussion";
import {IButton} from "./IButton";

export interface IEvent {
    Id?: string;
    CreatedBy?: string;
    LastModifiedBy?: string;
    EventName?: string;
    ArrivalInfo?: string;
    Description?: string;
    End_DateTime?: string;
    Start_DateTime?: string;
    Hide?: string;
    Location?: string;
    LocationText?: string;
    ParkingUrl?: string;
    Purpose?: string;
    Room?: string;
    Status?: string;
    Attendees?: IUser[];
    AgendumList?: IAgendum[];
    PreSessionAttachmentList?: IAttachment[];
    DuringSessionAttachmentList?: IAttachment[];
    PostSessionAttachmentList?: IAttachment[];
    DiscussionQ?: IDiscussion[];
    SessionButton?: IButton[];
    SessionAgendaModule?: boolean;
    SessionAttachmentModule?: boolean;
    SessionAttendeeModule?: boolean;
    SessionDiscussionModule?: boolean;
    EventImgUrl?: string;
    DescriptionE?: string;
    ArchiveSession?: boolean;

}
