export class LoginRespons {
    constructor(
        public status: number = 0,
        public error: string = '',
        public token: string = '',
        public username: string = '',
        public role: string = '',
        public userID: string = '',
    ) { }
}
