export class User {
  constructor(name, id) {
    this.name = name
    this.id = id
    this.uncertainty = 'N/A'
    this.complexity = 'N/A'
    this.effort = 'N/A'
  }

  updateVotes({ uncertainty, complexity, effort }) {
    this.uncertainty = uncertainty
    this.complexity = complexity
    this.effort = effort
  }
}
