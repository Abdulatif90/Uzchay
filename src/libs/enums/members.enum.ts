/* enum - bu u turli qiymatlarni birlashtirish uchun ishlatiladigan 
 TypeScript xususiyatidir, bu orqali o'zgaruvchilarga aniq va nomlangan qiymatlar tayinlash mumkin.*/
//  MemberType va MemberStatus enumlarini yaratamiz
//  MemberType enumi USER va RESTARAUNT qiymatlarini o'z ichiga oladi
//  MemberStatus enumi ACTIVE, BLOCK va DELETE qiymatlarini o'z ichiga oladi
//  MemberType va MemberStatus enumlarini export qilamiz
//  MemberType va MemberStatus enumlarini ishlatish
//  MemberType va MemberStatus enumlarini ishlatish uchun Member.model.ts faylini o'zgartiramiz

export enum MemberType {
    USER = "USER",
    RESTARAUNT = "RESTARAUNT"
}

export enum MemberStatus {
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    DELETE = "DELETE"
}

