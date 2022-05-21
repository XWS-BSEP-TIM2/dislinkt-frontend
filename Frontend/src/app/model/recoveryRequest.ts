export class RecoveryRequest {
    constructor(
        public username: string = '',
        public recoveryCode: string = '',
        public newPassword: string = '',
        public confirmNewPassword: string = '',
    ) { }

    validateProperty(): boolean {
        return this.username !== '' && this.recoveryCode !== '' && this.newPassword !== '' && this.newPassword === this.confirmNewPassword
    }
}
