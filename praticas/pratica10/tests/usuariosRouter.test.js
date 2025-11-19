const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

const url = "/usuarios"

let id  = null;
let token = null;

describe('Testes API pratica10', function(){
    test('POST/usuarios 201', async function(){
        const response = await request.post(url).send({ email: "usuario@email.com", senha: "abcd1234"});
        expect(response.status).toBe(201);
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe("usuario@email.com");
        expect(response.body.senha).toBe("abcd1234");
        id = response.body._id;
    });
    test("POST/usuarios 422", async function(){
        const response = await request.post(url).send({ email: ""});
        expect(response.status).toBe(422);
        expect(response.body.msg).toBe("Email e Senha são obrigatórios");
    });
    test("POST /usuarios/login 200", async function (){
        const response = await request.post('/usuarios/login').send({usuario: "usuario@email.com", senha: "abcd1234"});
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });
    test('POST/usuarios/login 401', async function() {
        const response = await request.post('/usuarios/login');
        expect(response.status).toBe(401);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("Credenciais inválidas");
    });
    test('POST/usuarios/renovar 200', async function() {
        const response = await request.post('/usuarios/renovar').set('authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
    });
    test('POST/usuarios/renovar 401 (token inválido)', async function() {
        const response = await request.post('/usuarios/renovar').set('authorization', "Bearer 123456789");
        expect(response.status).toBe(401);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("Token inválido");
    });
    test("DELETE/usuarios/:id 204", async function(){
        const response = await request.delete(`${url}/${id}`)
        expect(response.status).toBe(204);
    });
})