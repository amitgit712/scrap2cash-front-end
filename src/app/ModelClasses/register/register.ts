export class Register {

    constructor(
        public email: string,
        public first_name: string,
        public last_name: string,
        public password: string,
        

    ){} 
}


export class UserProfile {

    constructor(
        public user_conatct: string,
        public country: string,
        public state: string,
        public city: string,
        public zip_code: string,
        public detail_address: string,
        

    ){} 
}
