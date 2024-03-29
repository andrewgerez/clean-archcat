import { RegisterStudentUseCase } from './register-student'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    fakeHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'Andrew Gerez',
      email: 'andrew-dev@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Andrew Gerez',
      email: 'andrew-dev@email.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
