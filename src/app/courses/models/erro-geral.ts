
export class ErroGeral {
    mensagem!: string;
    nome!: string;
    constructor(err: Error) {
        this.mensagem = err.message
        this.nome = err.name
        console.log(this.mensagem)
        console.log(this.nome)
    }
}