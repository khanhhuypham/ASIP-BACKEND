import { Equipment } from 'src/equipment/entities/equipment.entity';
// Define the Gender enum
export enum Gender {
    Male = 1,
    Female = 2,
    Other = 3,
}


//---------------- EQUIPMENT----------------
export enum Equipment_condition {
    New = 1,
    Good = 2,
    Need_Repair = 3,
}

export enum Equipment_type {
    Furniture = 1,
    Appliance = 2,
    Electronics = 3,
}


//---------------- ROOM----------------
export enum Room_Status {
    Available = 1,
    Occupied = 2,
    Reserved = 3,
    Under_Maintenance = 4,
}

export enum Room_Cleanliness {
    Cleaned = 1,
    Dirty = 2,
}


//---------------- ROOM TYPE----------------

export enum RoomType_Status {
    ACTIVE = 1,
    INACTVIE = 0,
}



//---------------- BOOKING----------------

export enum Booking_Status {
    Confirmed = 1,
    Pending_Payment = 2,
    Cancelled = 3,
    Checked_In = 4,
    Checked_Out = 5,
    Expired = 6,
    On_Hold = 7,
    Completed = 8,
//     (1, 'Confirmed'),
// (2, 'Pending Payment'),
// (3, 'Cancelled'),
// (4, 'Checked In'),
// (5, 'Checked Out'),
// (6, 'No Show'),
// (7, 'Modified'),
// (8, 'Expired'),
// (9, 'On Hold'),
// (10, 'Completed');
}



//---------------- MEDIA----------------


export enum Media_Type{
    image = 1,
    video = 2,
}


//---------------- GUEST----------------


export enum Guest_Type{
    individual = 1,
    enterprise = 2,
}