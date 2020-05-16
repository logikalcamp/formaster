const initialData = {
    tasks:{
        'task-1':{id:'task-1',content:'take out'},
        'task-2':{id:'task-2',content:'get out'},
        'task-3':{id:'task-3',content:'walk out'},
        'task-4':{id:'task-4',content:'set out'}
    },
    columns:{
        'column-1':{
            id:'form',
            title:'form',
            taskIds:['task-1','task-2','task-3']
        }
    },
    columnOrder:['column-1']
}

export default initialData;