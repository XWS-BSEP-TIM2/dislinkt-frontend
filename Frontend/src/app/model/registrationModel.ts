export class RegistrationModel {
    constructor(
        public name: string = '',
        public surname: string = '',
        public username: string = '',
        public email: string = '',

        public birthday: string = '',
        public gender: string = '',
        
        public phoneNumber: string = '',
        public isPrivate: boolean = false,

        public password: string = '',
        public confirmPassword: string = '',
        
    ) { }

    passwordMatch(): boolean {
        return this.password === this.confirmPassword;
    }

    validateProperty(): boolean {
        for (const property in this) {
            if (property!=='isPrivate' && !this[property]) {
                return false;
            }
        }
        return this.passwordMatch();
    }

}
