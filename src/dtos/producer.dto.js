export class ProducerDTO {
  constructor({ name, country, foundationYear, description, logo }) {
    this.name = name ? String(name).trim() : '';
    this.country = country ? String(country).trim() : '';
    this.foundationYear = foundationYear !== undefined && foundationYear !== null ? Number(foundationYear) : 0;
    this.description = description ? String(description).trim() : '';
    this.logo = logo ? String(logo).trim() : '';
  }
}

export default ProducerDTO;
