export class ActorDTO {
  constructor({ name, biography, photo }) {
    this.name = name ? String(name).trim() : '';
    this.biography = biography ? String(biography).trim() : '';
    this.photo = photo ? String(photo).trim() : '';
  }
}

export default ActorDTO;
