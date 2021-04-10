class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {

        this.setDisplayDateTime(); //Inicia Hora e data na tela da calculadora
        setInterval(()=>{ //setInterval: função executada em um intervalo de tempo, de forma intermintente. O tempo é marcado em milisegundos.
            this.setDisplayDateTime();
        }, 1000);      

    }

    //define exibição de data e hora.
    setDisplayDateTime() { 

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);//retorna uma string com a representação de parte da data baseando-se no idioma.
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);//retorna uma string com a representação da hora baseando-se no idioma.
    }


    //Metodo criado para passar mais de um evento para o escutador de eventos.
    addEventListenerAll(element, events, fn) {  
       
        events.split(' ').forEach(event => { //Split tem a tarefa de pegar os eventos passados como strings ("click drag") e transformar em um array ['click', 'drag']. (" ") separa as strings pelo espaco.
            element.addEventListener(event, fn, false);
        });
    }


    //Operações dos botões
    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    addOperation(value) {
        this._operation.push(value);
        console.log(this._operation);
    }

    setError() {
        this.displayCalc = 'Error';
    }

    execBtn(value) {
        switch (value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                ;
                break;

            case 'subtracao':
                ;
                break;

            case 'divisao':
                ;
                break;

            case 'multiplicacao':
                ;
                break;

            case 'porcento':
                ;
                break;

            case 'igual':
                ;
                break;            

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

            ;

        }
    }
    

    //Evento do botão
    initButtonsEvents() {

        let buttons = document.querySelectorAll('#buttons > g, #parts > g');
        buttons.forEach((button, index) => {

            this.addEventListenerAll(button, 'click drag', e => { //Passando mais de um eventos.
                let textBtn = button.className.baseVal.replace('btn-', "");//replace muda a exibição da classe. ex: ('btn-1' >>> '1')
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(button, 'mouseover mouseup mousedown', e => {
                button.style.cursor = 'pointer';// Muda o estilo do cursor ao passar o mouse em cima do botão.
            })

        });     
         
                
    }   
    


    //getters
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    get displayTime() {
        return this._displayTime.innerHTML;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    get currentDate() {
        return new Date();
    }

    //setters

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }    

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }    

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }   

    set currentDate(value) {
        this._currentDatec = value;
    }
}