class Project {
    // unique identifier
    id: string;

    // project's name
    name: string;

    // project's description
    description: string;

    // project's goal/target amount
    goal_amount: number;

    constructor(
        id: string,
        name: string,
        description: string,
        goal_amount: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.goal_amount = goal_amount;
    }

    info() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            goal_amount: this.goal_amount,
        };
    }
}