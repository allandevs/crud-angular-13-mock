export class Course {
    id!: string
    nome!: string;
    categoria!: string;

    constructor(json?: any) {
        this.id = json._id;
        this.nome = json.name;
        this.categoria = json.category;
    }

}
