import { AppModule } from '@/infra/app.module'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { test } from 'vitest'
import { JwtService } from '@nestjs/jwt'
import { StudentFactory } from 'test/factories/make-student'
import { QuestionFactory } from 'test/factories/make-question'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'

describe('E2E: Fetch question comments', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        QuestionCommentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const acessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    await Promise.all([
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 01'
      }),
      questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 02'
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${acessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({ content: 'Comment 01' }),
        expect.objectContaining({ content: 'Comment 02' }),
      ]),
    })
  })
})
