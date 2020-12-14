/* eslint-disable linebreak-style */
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	async comparePasswords(saved, supplied) {
		// saved -> pwd saved in our database, 'hashed.salt'
		// supplied -> pwd given to us by a user signing in
		const [ hashed, salt ] = saved.split('.');
		const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

		return hashed === hashedSuppliedBuf.toString('hex');
	}

	async create(attrs) {
		// attrs === { email: '', password: '' }
		attrs.id = this.randomId();

		const salt = crypto.randomBytes(8).toString('hex');
		const buf = await scrypt(attrs.password, salt, 64);

		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${buf.toString('hex')}.${salt}`
		};
		records.push(record);

		await this.writeAll(records);

		return record;
	}
}

module.exports = new UsersRepository('users.json');
