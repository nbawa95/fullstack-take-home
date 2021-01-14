import { User } from '../entity/user';
import { getRepository } from 'typeorm';

export class UserService {
	private userRepository = getRepository(User);

	async all() {
		return this.userRepository.find();
	}

  async one(id: number) {
		return this.userRepository.findOne(id);
  }
  
	async findOrCreate(newUser: any) {
		const users = await this.userRepository.find({
			where: { email: newUser.email },
		});
		if (!!users.length) {
			return users[0];
		} else {
			return this.save(newUser);
		}
	}

	async save(newUser: any) {
		return this.userRepository.save(newUser);
	}

	async remove(id: number) {
		let userToRemove = await this.userRepository.findOne(id);
		await this.userRepository.remove(userToRemove);
	}
}
