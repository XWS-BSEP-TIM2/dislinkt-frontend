export class LoginRequest {
    constructor(
        public username: string = '',
        public password: string = '',
    ) { }

    validateProperty(): boolean {
        return this.username !== '' && this.password !== ''
    }

}
