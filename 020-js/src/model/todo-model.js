import { method } from "lodash";

export class TarefaModel{
    #title;
    #dueDate;
    #status;
    #id;

    constructor(title, dueDate, status, id){
        this.#title = title;
        this.#dueDate = dueDate;
        this.#status = status;
        this.#id = id;
    }

    get title() {
        return this.#title;
    }
    set title(value){
        this.#title = value;
    }
    get dueDate(){
        return this.#dueDate;
    }
    set dueDate(value){
        this.#dueDate = value;
    }
    get status(){
        return this.#status;
    }
    get id(){
        return this.#id;
    }
    toJson(){
        return{
            title: this.#title,
            dueDate: this.#dueDate,
        }
    }
}

export class TodoListModel{
    #BASE_URL = "https://alunos.treinaweb.com.br/tw-todos/api/v1";
    constructor(){ };

    #convertDatePTBRoISO(datePTBR){
        const [dia, mes, ano] = datePTBR.split('/');
        return `${ano}-${mes}-${dia}`;
    }
    #convertDateISOToPTBR(dateISO) {
        const [ano, mes, dia] = dateISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    async add(tarefa){
        tarefa.dueDate = this.#convertDatePTBRoISO(tarefa.dueDate);
        const response = await fetch(`${this.#BASE_URL}/todos`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa.toJson()),
        })
        if(!response.ok){
            throw "";
        }
        // this.todoList.push(tarefa);
    }
    async getAll(){
        const response = await fetch(`${this.#BASE_URL}/todos`);
        if(!response.ok){
            throw "";
        }
        const todoList = await response.json();
        return todoList.map(tarefa => new TarefaModel(
            tarefa.title, 
            this.#convertDateISOToPTBR(tarefa.dueDate),
            tarefa.status,
            tarefa.id,
    ))
    }
    async get(id){
        const response = await fetch(`${thi.#BASE_URL}/todos/${id}`);
        if(!response){
            throw ""
        }
        const tarefa = await response.json();
        return new TarefaModel(tarefa.title, this.#convertDateISOToPTBR(tarefa.dueDate), tarefa.status, tarefa.id);
    }
    async update(id,data){
        data.dueDate = this.#convertDatePTBRoISO(data.dueDate);
        const response = await fetch(`${this.#BASE_URL}/todos/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if(!response){
            throw ""
        }
    }
    async delete(id){
        const response = await fetch(`${this.#BASE_URL}/todos/${id}`,{
            method: 'DELETE'
        });
        if(!response){
            throw ""
        }
    }
    async complete(id){
        const response = await fetch(`${this.#BASE_URL}/todos/${id}/finish`,{
            method: "POST"
        })
        if(!response){
            throw ""
        }
    }
}