export default class Task {
    constructor(
        title,
        whatWatch,
        time,
        tags,
        description,
        completed,
        editing,
        user = null,
        id = null
    ) {
        this.title = title,
            this.whatWatch = whatWatch,
            this.time = time,
            this.tags = tags,
            this.description = description,
            this.completed = completed,
            this.editing = editing,
            this.user = user,
            this.id = id
    }
}