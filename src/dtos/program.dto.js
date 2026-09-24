export class ProgramDTO {
  constructor({ categoryId, title, synopsis, poster, trailer, producer }) {
    this.categoryId = categoryId ? String(categoryId).trim() : '';
    this.title = title ? String(title).trim() : '';
    this.synopsis = synopsis ? String(synopsis).trim() : '';
    this.poster = poster ? String(poster).trim() : '';
    this.trailer = trailer ? String(trailer).trim() : '';
    this.producer = producer ? String(producer).trim() : '';
  }
}

export default ProgramDTO;
