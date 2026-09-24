export class CharacterDTO {
  constructor({ programId, name, role, description, actorId }) {
    this.programId = programId ? String(programId).trim() : '';
    this.name = name ? String(name).trim() : '';
    this.role = role ? String(role).trim() : '';
    this.description = description ? String(description).trim() : '';
    this.actorId = actorId ? String(actorId).trim() : '';
  }
}

export default CharacterDTO;
