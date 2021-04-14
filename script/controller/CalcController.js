class CalcController {

    constructor() {

        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    // Metodo initialize define hora e data, quando a pagina da calculadora eh iniciada.
    initialize() {

        this.setDisplayDateTime(); //Inicia Hora e data na tela da calculadora
        setInterval(()=>{ //setInterval: função executada em um intervalo de tempo, de forma intermintente. O tempo é marcado em milisegundos.
            this.setDisplayDateTime();
        }, 1000);  

        this.setLastNumberToDisplay();
    }

    //define exibição de data e hora.
    setDisplayDateTime() { 

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);//toLocaleDateString retorna uma string com a representação de parte da data e da hora baseando-se no idioma.
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
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
        this._lastNumber = '';
        this._lastOperator = '';
        this._operation = []; 
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop(); //pop retira o ultimo elemento do array.
        this.setLastNumberToDisplay();
    }

    getLastOperation() { // retorna o ultimo item do array, pois length retorna a quantidade de itens.
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) { //o ultimo item do array recebe Value.
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) { //validação dos sinais.
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)  //indexOf busca o value dentro do array.
    }

    pushOperation(value) { // coloca os sinais no array.
        this._operation.push(value);

        if(this._operation.length > 3) { //quando a calculado tem uma operaçao mais um sinal(quatro itens no array [35, '+', 30, -]), ele executa o calculo e armazena o sinal
            this.calc();
        }
    }

   getResult() {
        return eval(this._operation.join(''));// eval transforma td em operação e realiza o calculo. Join passa td pra string. É preferivel nesse caso usar join do que toString por causa do seu retorno.    

   }

    calc() { //calcula a primeira operação, retorna o total da operação e o novo sinal.
       
        let last = ''; 
        this._lastOperator = this.getLastItem() //salva o sinal(_operation[3]) em _lastOperatos

        //no caso de apertar o igual mais de uma vez com apenas 3 itens no array
        if(this._operation.length < 3) { 

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        //esse if e else if representam as operações com sinal de igual.
        if(this._operation.length > 3) { //verificação para salvar o sinal. No caso, se o array _operation tem mais de 3 itens o 4 é um sinal.
            
            last = this._operation.pop(); //O método pop() remove o último elemento de um array e retorna aquele elemento. Salva o quarto item, o sinal, na variavel Last.
            this._lastNumber = this.getResult();

        } else if(this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

                
        let result = this.getResult();

        if(last == '%') { //Operação do sinal  porcento. Se last for % executa o if.
            result /= 100;//result = result / 100;
            this._operation = [result]; //devolve um array com um elemento pq o '%' já é o quarto elemento.
        
        } else { // se não for "%", sera outro sinal

            this._operation = [result];    
            if (last) this._operation.push(last); //se last for diferente de vazio.
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) { // Pega o ultimo item.
        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--) { // sempre o array vai ter quatro itens, o quarto item sera um sinal.
           
            if(this.isOperator(this._operation[i]) == isOperator) { //se o ultimo item for um sinal, salva na variavel
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this.lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() { //atualiza o display.
        let lastNumber =  this.getLastItem(false);

        if (!lastNumber) lastNumber = 0; // Se lastNumber é vazio coloca 0; (para os casos ce e ac)

        this.displayCalc = lastNumber;
    }

    addOperation(value) { //recebe o valor dos botões  .

        if(isNaN(this.getLastOperation())) { //Se a ultima coisa digitada não é um numero.
            
            if(this.isOperator(value)){  
                this.setLastOperation(value);
               
            } else { //primeiro numero a ser inserido na calculadora e primeiro numero depois do sinal de operação  vão ser inserido nesse else
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else { //numeros e sinais ['*', '-', '+', '/', ]

            if(this.isOperator(value)) { //valida se é um sinal de operação ['*', '-', '+', '/', ]
                this.pushOperation(value);
                
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseFloat(newValue));
                this.setLastNumberToDisplay();
                
            }
        }
    }

    setError() { //mensagem de erro
        this.displayCalc = 'Error';
    }

    addDot() {
        let lastOperation = this.getLastOperation(); //pega a ultima operação
        console.log(lastOperation)
        if(this.isOperator(lastOperation) || !lastOperation) { // !lastOperation: se ele não existir.
            this.pushOperation('0.');
        } else{
            this.setLastOperation(lastOperation.toString() + '.'); //
        }

        this.setLastNumberToDisplay();
    }

    execBtn(value) { //metodo da execução dos botoes.
        switch (value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.calc();
                break;  

            case 'ponto':
                this.addDot('.');
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
        }
    }
    

    //Evento dos botões
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