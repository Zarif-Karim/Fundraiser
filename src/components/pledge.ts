type PledgeStatus = 'pending' | 'partial' | 'paid';

class Pledge {
    // unique identifier
    id: string;

    // user who made the pledge
    user: string;

    // project for which the pledge was made
    project: string;

    // amount pledged
    amount: number;

    // date of pledge
    createdAt: Date;

    // status of pledge
    status: PledgeStatus;

    constructor(
        id: string,
        user: string,
        project: string,
        amount: number,
        status: PledgeStatus,
    ) {
        this.id = id;
        this.user = user;
        this.project = project;
        this.amount = amount;
        this.createdAt = new Date();
        this.status = status;
    }

    info() {
        return {
            id: this.id,
            user: this.user,
            project: this.project,
            amount: this.amount,
            createdAt: this.createdAt,
            status: this.status,
        };
    }
}