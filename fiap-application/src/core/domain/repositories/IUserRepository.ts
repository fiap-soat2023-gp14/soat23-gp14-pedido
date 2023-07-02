export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  getByCpf(cpf: string): Promise<User>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
}
