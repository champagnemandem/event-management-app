import {IEvent} from './IEvent';
import {IUser} from "./IUser";
import {IAttachment} from "./IAttachment";
import {IAgendum} from "./IAgendum";
import {IDiscussion} from "./IDiscussion";
import {IButton} from "./IButton";

export class Event implements IEvent {

  constructor(
    public Id?: string,
    public EventName?: string,
    public CreatedBy?: string,
    public LastModifiedBy?: string,
    public ArrivalInfo?: string,
    public Description?: string,
    public End_DateTime?: string,
    public Location?: string,
    public Purpose?: string,
    public Room?: string,
    public SessionId?: string,
    public Start_DateTime?: string,
    public Attendees?: IUser[],
    public AgendumList?: IAgendum[],
    public PreSessionAttachmentList?: IAttachment[],
    public DuringSessionAttachmentList?: IAttachment[],
    public PostSessionAttachmentList?: IAttachment[],
    public DiscussionQ?: IDiscussion[],
    public SessionButton?: IButton[],
    public SessionAgendaModule?: boolean,
    public SessionAttachmentModule?: boolean,
    public SessionAttendeeModule?: boolean,
    public SessionDiscussionModule?: boolean,
    public EventImgUrl?: string,
    public DescriptionE?: string,
    public ArchiveSession?: boolean

  ) { }
}
