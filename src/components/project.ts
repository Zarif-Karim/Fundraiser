type ProjectStatus = 'active' | 'inactive' | 'completed';

class Project {
    // unique identifier
    id: string;

    // project's name
    name: string;

    // project's description
    description: string;

    // project's goal/target amount
    goal_amount: number;

    // date of project creation
    createdAt: Date;

    // status of project
    status: ProjectStatus;

    constructor(
        id: string,
        name: string,
        description: string,
        goal_amount: number,
        status: ProjectStatus,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.goal_amount = goal_amount;
        this.createdAt = new Date();
        this.status = status;
    }

    info() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            goal_amount: this.goal_amount,
            createdAt: this.createdAt,
            status: this.status,
        };
    }
}