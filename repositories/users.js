class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a file name');
        } 

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
}

const repo = new UsersRepository('users.json');