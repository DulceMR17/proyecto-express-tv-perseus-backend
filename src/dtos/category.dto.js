// DTO para la transferencia y limpieza de datos
export class CategoryDTO {
    constructor({ name, description }) {
        this.name = name ? name.trim() : '';
        this.description = description ? description.trim() : '';
    }
}

