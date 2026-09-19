
export const Booking_fee= 200;

export const Pricing= {
    "WATER TANK":      {"Small":500,"Medium":1000, "Large":1500, "Extra Large":2000},
    "Overhead Tank":   {"Small":600,"Medium":1200, "Large":1800, "Extra Large":2400},
    "Underground Tank":{"Small":700,"Medium":1400, "Large":2100, "Extra Large":2800},
    "Septic Tank":     {"Small":800,"Medium":1600, "Large":2400, "Extra Large":3200},
    "Other":           {"Small":500,"Medium":1000, "Large":1500, "Extra Large":2000}
}

export const getPrice= (tankType, tankSize)=>{
    return Pricing[tankType]?.[tankSize] || 0;
}