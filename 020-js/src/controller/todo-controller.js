import { TarefaModel } from "../model/todo-model.js";

export class TodoListController{
    // view = new TodoListView
    // todoListModel = new TodoListModel
    constructor(todoListModel, view){
        this.todoListModel = todoListModel
        this.view = view
    }

    async addItem(){
        const {title, dueDate} = await this.view.displayAddItem()
        try{
            const tarefa = new TarefaModel(title, dueDate);
            await this.todoListModel.add(tarefa)
            this.view.log(`\nTarefa "${title}" adicionado\n`);
        } catch(error){
            this.view.log(`Erro ao adionar tarefa ${title}`);
        }
    }

    async listarTarefa(){
        try {
            const todoList = await this.todoListModel.getAll();
            this.view.displayItens(todoList);
        } catch (error) {
            this.view.log("\nErro ao buscar tarefa\n")
        }

    }

    async completarTarefa(){
        try {
        const todoList = await this.todoListModel.getAll();
        if(!todoList.length){
            this.view.log("\nNenhuma tarefa encontrada\n");
            return;
        }   
        const id = await this.view.displaySelectItem(todoList);
        await this.todoListModel.complete(id);
        this.view.log(`\nTarefa marcado como concluido\n`);
        } catch (error) {
            this.view.log("\nErro ao completar tarefa\n");
        }
        
    }

    async editarTarefa(){
        try {
            const todoList = await this.todoListModel.getAll();
            if(!todoList.length){
                this.view.log("\nNenhuma tarefa encontrada\n");
                return;
            }   
            const id = await this.view.displaySelectItem(todoList);
            const tarefa = await this.todoListModel.get(id);
            const {title, dueDate} = await this.view.displayEditItem(tarefa);
            await this.todoListModel.update(id,{title, dueDate});
            this.view.log(`\nTarefa ${title} editada com sucesso\n`);
        } catch (error) {
            this.view.log("\nNão foi possivel editar tarefa")
        }

    }
    async deletarTarefa(){
        try {
            const todoList = await this.todoListModel.getAll();
             if(!todoList.length){
                this.view.log("\nNenhuma tarefa encontrada\n");
             return;
            }   
            const id = await this.view.displaySelectItem(todoList);
            await this.todoListModel.delete(id);
            this.view.log(`\nTarefa deletada com sucesso\n`)
        } catch (error) {
            this.view.log("\nNão foi possivel editar tarefa\n")
        }
    }
}
        