export class ChangePasswordRequest {
    constructor(
        public username: string = '',
        public oldPassword: string = '',
        public newPassword: string = '',
        public confirmNewPassword: string = '',
    ) { }

    validateProperty(): boolean {
        let [t, b] = this.passwordStrength();
        return this.username !== '' && this.oldPassword !== '' && this.newPassword !== '' && this.newPassword === this.confirmNewPassword && b
    }

    passwordStrength(): [string, boolean] {

        if (this.newPassword === '') return ["", false];

        if (this.username !== '' && this.newPassword.toLowerCase().includes(this.username.toLowerCase())) {
            return ["Password should not contain you Username", false]
        }

        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,40}$/;
        if (this.newPassword.match(decimal)) {
            return ["Password is strong", true];
        }
        return ["Password is week (password must contain at least 8 charters with lower, upper, digit and special character)", false];
    }

    passwordMatch(): boolean {
        return this.newPassword === this.confirmNewPassword;
    }
}
