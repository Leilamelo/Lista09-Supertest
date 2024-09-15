// Bibliotecas e Framework
const supertest = require('supertest')
const userId = 133211201
const username = 'belaM'

describe('PetStore Swagger - Entidade User', () => {

    // Atributos do grupo/describe
    const request = supertest('https://petstore.swagger.io/v2') // baseURL
    const massaUser = require('../../vendors/json/massaUsers')

    it('POST User', async () => {

        // Atributos, Campos, Características, Configurações
        const user = await require('../../vendors/json/user.json')

        return await request
            .post('/user')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe(userId.toString())
            })
    })// Fim do método POST

    // GET
    it('GET User', async () => {
        return await request
            .get(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.id).toBe(userId)
                expect(res.body.username).toBe('belaM')
                expect(res.body.firstName).toBe('Isabela')
                expect(res.body.lastName).toBe('Melo')
                expect(res.body.email).toBe('teste2qa@gmail.com')
                expect(res.body.password).toBe('TST#001')
                expect(res.body.phone).toBe('027999010203')
                expect(res.body.userStatus).toBe(1)
            })
    })// Fim do método GET

    it('PUT User', async () => {
        const userUpate = await require('../../vendors/json/userUpate.json')
        return await request
            .put(`/user/${username}`)
            .send(userUpate)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe('133211202')
            })
    })//Fim do PUT

    it('DELETE User', async () => {
        // const username = 'isaM'
        const user = await require('../../vendors/json/userUpate.json')
        return await request
            .delete(`/user/${username}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.code).toEqual(200)
                expect(res.body.type).toBe('unknown')
                expect(res.body.message).toBe('belaM')
            })
    })

    // Testes Data Driven for Each da massa
    massaUser.array.forEach(({ id, username, firstName, lastName, email, password, phone, userStatus }) => {

        it(`POST User Data Driven ForEach - ${username}`, () => {

            // Atributos, Campos, Características, Configurações
            const userJson = require('../../vendors/json/user.json')

            userJson.id = id
            userJson.username = username
            userJson.firstName = firstName
            userJson.lastName = lastName
            userJson.email = email
            userJson.password = password
            userJson.phone = phone
            userJson.userStatus = userStatus

            // Função de teste
            return request
                .post('/user')
                .send(userJson)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.message).toBe(id.toString())
                })
        })// termina o Post

        

        it(`DELETE User Data Driven ForEach -- ${username}`, () => {
            return request
                .delete(`/user/${username}`)
                .then((res) => {
                    expect(res.statusCode).toBe(200)
                    expect(res.body.code).toEqual(200)
                    expect(res.body.type).toBe('unknown')
                    expect(res.body.message).toBe(username)
                })
        })// termina o DELETE

    }) // termina o For Each da massa

})//Fim describe
