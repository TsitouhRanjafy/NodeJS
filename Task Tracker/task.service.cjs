const { chalk } = require("chalk");
const DA = require("./task.dataaccess.cjs");



const newTask = (description) => {
    let id = DA.getLastId();
    const task = {
        id:++id,
        desciption: description,
        status: "todo",
        createdAt: new Date,
        updatedAt: new Date,
    }
    
    DA.newTask(task);
    console.log("     --new task added--\n");
    console.log("       numero     : "+task.id);
    console.log("       Description: "+task.desciption);
    console.log("       Status     : "+task.status+"\n");
}

const getAllTask = () => {
    const data = DA.getAllTask();
    if (!data) return;
    data.forEach((element) => {
        if (element.id) {
            console.log("       numero     : "+element.id);
            console.log("       Description: "+element.desciption);
            console.log("       Status     : "+element.status+"\n");
        }
    });
}

const getTaskById = (id) => {
    const data = DA.getTaskById(id)
    if (!data || data.id) return;
    console.log("       numero     : "+data.id);
    console.log("       Description: "+data.desciption);
    console.log("       Status     : "+data.status+"\n");
}

const updateTaskById = (id,description) => {
    const lastData = DA.getTaskById(id);
    if (!lastData) {
        console.log("     --id not found--\n");
        return;
    }
    const task = {
        id:lastData.id,
        desciption: description,
        status: lastData.status,
        createdAt: lastData.createdAt,
        updatedAt: new Date,
    }
    DA.updateTaskById(id,task);
    console.log("     --task deleted--\n");
}

const deleteById = (id) => {
    DA.deleteById(id);
    console.log(" task "+id+" deleted");
}

module.exports = {
    newTask,
    getAllTask,
    getTaskById,
    updateTaskById,
    deleteById
}


