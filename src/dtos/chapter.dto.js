export class ChapterDTO {
  constructor({ programId, number, title, synopsis, duration, season }) {
    this.programId = programId ? String(programId).trim() : '';
    this.number = number !== undefined && number !== null ? Number(number) : 1;
    this.title = title ? String(title).trim() : '';
    this.synopsis = synopsis ? String(synopsis).trim() : '';
    this.duration = duration ? String(duration).trim() : '';
    this.season = season !== undefined && season !== null ? Number(season) : 1;
  }
}

export default ChapterDTO;
