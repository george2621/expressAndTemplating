import request from "supertest";
import app from "../index.js";
import { v4 as uuidv4 } from "uuid";


describe("GET /", () => {

    it("Quick test", () => {
        expect(1).toBe(1);
    })
    it("Return all elements from members array", async () => {
        const response = await request(app).get('/api/members');
        expect(response.statusCode).toBe(200);
    })
})

describe('GET /:id', () => {

    it('Return member with the given id', async () => {
        const response = await request(app).get('/api/members/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
    })
    it('Returns -No member with that ID: exists-', async () => {
        const response = await request(app).get('/api/members/4');
        expect(response.statusCode).toBe(400);
    })

})

describe('POST /', () => {

    it('Should respond with a 200 status code when the entries are valid', async () => {
        const response = await request(app).post('/api/members').send({
            id: uuidv4(),
            name: "george",
            email: "george95.2621@gmail.com",
            active: 'active'
        })
        expect(response.statusCode).toBe(200);
    })
    it('When the name is missing return -"name" is required-', async () => {
        const response = await request(app).post('/api/members').send({
            id: uuidv4(),
            email: "george95.2621@gmail.com",
            active: 'active'
        })
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toContain('name');
        expect(response.body.msg).toContain('required');
    })
    it('When the email is missing return -"email" is required-', async () => {
        const response = await request(app).post('/api/members').send({
            id: uuidv4(),
            name: "george",
            active: 'active'
        })
        expect(response.statusCode).toBe(400);
        expect(response.body.msg).toContain('email');
        expect(response.body.msg).toContain('required');
    })
})

describe('POST /:id', () => {
    it('Should response with 200 when find the member and delete it', async () => {
        const response = await request(app).post('/api/members/1');
        expect(response.statusCode).toBe(200);
    });
    it('Should response with 400 when the member is not exist', async () => {
        const response = await request(app).post('/api/members/4');
        expect(response.statusCode).toBe(400);
    });

})