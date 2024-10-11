import { initializeTestDb,insertTestUser, getToken } from './helpers/test.js'
import request from "supertest"
import app from "./index.js"
import { expect } from 'chai'

describe('GET tasks with supertest',() => {
  before(() => {
    initializeTestDb()
  })

  it ('should get all tasks using supertest',async() => {
    const response = await request(app)
      .get('/')  
    
    expect(response.status).to.equal(200,response._body.error)
    expect(response._body).to.be.an('array')
    expect(response._body[0]).to.include.all.keys('id','description')
  })
})

describe('POST task with supertest',() => {
  const email = 'post@foo.com'
  const password = 'post123'
  insertTestUser(email,password)
  const token = getToken(email)
  it ('should post a task using supertest',async() => {
    const response = await request(app)
      .post('/create')
      .set('Content-Type','application/json')
      .set('Authorization', token)
      .send(JSON.stringify({'description':'Task from unit test'}))

    expect(response.status).to.equal(200,response._body.error)
    expect(response._body).to.be.an('object')
    expect(response._body).to.include.all.keys('id')
  }) 
})