export class generateTeam {
    private nomeTime:string;
    private qtdLetras:Number;

    constructor(qtdLetras:Number){
        this.qtdLetras = qtdLetras;
        this.nomeTime = this.generateRandomTeam();
    }

    private generateRandomTeam(){
        let result:string = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < this.qtdLetras; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public getNomeTime(){
        return this.nomeTime;
    }

    public setNomeTime(nomeTime:string){
        this.nomeTime = nomeTime;
    }

}