export class ConnectionPanelModel {
    constructor(
        public userIDa: string = '',
        public userIDb: string = '',
        public isPrivate: boolean = false,
        public relation: string = '',
        public msgID: string = '',
        public error: string = '',
    ) { }

    /*
    messageAvailable(): boolean {
        return this.Relation === 'CONNECTED';
    }

    connectedOptionsAvailable(): boolean {
        return this.Relation === 'CONNECTED';
    }

    connectPrivateAvailable(): boolean{
        return this.Relation === 'NO_RELATION' && this.IsPrivate;
    }

    connectAvailable(): boolean {
        return this.Relation === 'NO_RELATION' && !this.IsPrivate;
    }

    blockAvailable(): boolean{
        return this.Relation !== 'B_BLOCK_A' && this.Relation !== 'A_BLOCK_B';
    }

    unblockAvailable(): boolean{
        return this.Relation === 'A_BLOCK_B';
    }

    acceptAvailable(): boolean{
        return this.Relation === 'ACCEPT';
    }

    pendingAvailable(): boolean{
        return this.Relation === 'PENDING';
    }
    */
}
