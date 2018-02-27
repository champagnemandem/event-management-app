"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(Id, EventName, CreatedBy, LastModifiedBy, ArrivalInfo, Description, End_DateTime, Location, Purpose, Room, SessionId, Start_DateTime, Attendees, AgendumList, PreSessionAttachmentList, DuringSessionAttachmentList, PostSessionAttachmentList) {
        this.Id = Id;
        this.EventName = EventName;
        this.CreatedBy = CreatedBy;
        this.LastModifiedBy = LastModifiedBy;
        this.ArrivalInfo = ArrivalInfo;
        this.Description = Description;
        this.End_DateTime = End_DateTime;
        this.Location = Location;
        this.Purpose = Purpose;
        this.Room = Room;
        this.SessionId = SessionId;
        this.Start_DateTime = Start_DateTime;
        this.Attendees = Attendees;
        this.AgendumList = AgendumList;
        this.PreSessionAttachmentList = PreSessionAttachmentList;
        this.DuringSessionAttachmentList = DuringSessionAttachmentList;
        this.PostSessionAttachmentList = PostSessionAttachmentList;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map