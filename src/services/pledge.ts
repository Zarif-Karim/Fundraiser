class PledgeService {
  async createPledge(userId: string, projectId: string, amount: number) {
    // Create a new pledge

    // 1. Check if the user exists
    // 2. Check if the project exists
    // 3. Check if the user has already pledged to the project
    // 4. Check if the project has already reached its goal
    // 5. Create the pledge
    
    throw new Error('Not implemented');
  }

  async updatePledge(pledgeId: string, amount: number) {
    // Update the pledge
    throw new Error('Not implemented');
  }

  async deletePledge(pledgeId: string) {
    // Delete the pledge
    throw new Error('Not implemented');
  }

  async getPledge(pledgeId: string) {
    // Get the pledge
    throw new Error('Not implemented');
  }

  async getAllPledges() {
    // Get all pledges
    throw new Error('Not implemented');
  }

  async getAllPledgesByUser(userId: string) {
    // Get all pledges by user
    throw new Error('Not implemented');
  }

  async getAllPledgesByProject(projectId: string) {
    // Get all pledges by project
    throw new Error('Not implemented');
  }
}
