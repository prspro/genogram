export interface Person {
    name: string
    middleName?: string
    surName: string
    birthday: Date
    sex: "male" | "female"
}