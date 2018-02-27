export type Id = string;

export interface ISObject {

    Id?: Id;
    CreatedBy?: Id;
    LastModifiedBy?: Id;
    Name?: string;
    fieldsToNull?: string[];

}

export interface IRetrieveResult {
    
}

export interface IContact extends ISObject {

    Account?: Id;
    AssistantName?: string;
    AssistantPhone?: number;
    Birthdate?:     number|string;
    CleanStatus?: string;
    Owner?: Id;
    Jigsaw?: string;
    Department?: string;
    Description?: string;
    DoNotCall?: boolean;
    Email?: string;
    HasOptedOutOfEmail?: boolean;
    Fax?: number;
    HasOptedOutOfFax?: boolean;
    HomePhone?: number;
    LastCURequestDate?: number|string;
    LastCUUpdateDate?: number|string;
    LeadSource?: string;
    MailingAddress?: string;
    MobilePhone?: number;
    Name?: string;
    Salutation?: string;
    //* Excercise one;
    FirstName?: string;
    LastName?: string;
    OtherAddress?: string;
    OtherPhone?: number;
    Phone?: number;
    PhotoUrl?: string;
    ReportsTo?: Id;
    Title?: string;

}

export interface IUser extends ISObject {

    AboutMe?: string;
    IsActive?: boolean;
    Address?: string;
    ReceivesAdminInfoEmails?: boolean;
    Alias?: string;
    ForecastEnabled?: boolean;
    CallCenter?: any; // CallCenter
    MobilePhone?: number;
    DigestFrequency?: string;
    CompanyName?: string;
    Contact?: IContact;
    JigsawImportLimitOverride?: number;
    DefaultGroupNotificationFrequency?: string;
    DelegatedApprover?: Id; // User | Group
    Department?: string;
    Division?: string;
    Email?: string;
    EmailEncodingKey?: string;
    SenderEmail?: string;
    SenderName?: string;
    Signature?: string;
    EmployeeNumber?: string;
    EndDay?: string;
    Extension?: number;
    Fax?: number;
    LoginLimit?: number;
    Workspace?: any; // Workspace
    ReceivesInfoEmails?: boolean;
    UserSubtype?: string;
    IsSystemControlled?: boolean;
    LanguageLocaleKey?: string;
    LocaleSidKey?: string;
    Manager?: any; // Hierchy
    CommunityNickname?: string;
    Phone?: number;
    Profile?: any; // Profilr
    UserRole?: any; // Role
    FederationIdentifier?: string;
    StartDay?: string;
    StayInTouchNote?: string;
    StayInTouchSignature?: string;
    StayInTouchSubject?: string;
    TimeZoneSidKey?: string;
    Title?: string;
    Username?: string;

}

export interface IAccount extends ISObject {

}

export interface ISessions extends ISObject{
    Name?: string;
    Start__c?: string;
}

export interface IFaq extends ISObject {
    Answer__c?: string;
    Question__c?: string; 
}

export interface IAgendum extends ISObject {
    Agendum_Image__c?: string;
    Agendum_Presenter__c?: string;
    Description__c?: string;
    End__c?: string;
    Location__c?: string;
    Purpose__c?: string;
    Start__c?: string;
    Session__c?: string;
    Name?: string;
}

export interface IAttachment extends ISObject {
    Description__c?: string;
    Reading_Material_Phase__c?: string; 
    Session__c?: string; 
}

export interface IInvitation extends ISObject {
    Contact__c?: string;
    Reference_Code__c?: string; 
    Session__c?: string; 
    Status__c?: string; 
    Name?: string;
}