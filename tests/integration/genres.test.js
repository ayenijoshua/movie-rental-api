const request = require('supertest')
const {Genre}  = require('../../models/genres')
const {User} = require('../../models/user')

let server;

let populateGenre = async function(){
    await Genre.collection.insertMany([
        {name:'genre1'},
        {name:'genre2'}
    ])
}

describe('/api/genres', ()=>{
    beforeEach(()=>{server = require('../../index')})
    afterEach(async ()=>{ 
        await Genre.remove({})
        await server.close()
    })

    describe('GET /', ()=>{
        it('should return all genres', async ()=>{
           await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'}
            ])
            const res = await request(server).get('/api/genres') 
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some((ele)=>ele.name==='genre1')).toBeTruthy()
            expect(res.body.some((ele)=>ele.name==='genre2')).toBeTruthy()
        })
    })

    describe('GET /:id', ()=>{
        it('should return a genre if valid id is passed', async ()=>{
            await populateGenre()

           let res = await request(server).get('/api/genres')
           const genre = res.body[0]

           res = await request(server).get(`/api/genres/${genre._id}`)
           expect(res.status).toBe(200) 
           expect(res.body._id).toBe(genre._id)
           expect(res.body).toMatchObject({name:genre.name}) 
        })

        it('should return a 404 if invalid id is passed', async ()=>{
            await populateGenre()

           res = await request(server).get(`/api/genres/1`)
           expect(res.status).toBe(404)  
        })
    })

    describe('POST /', ()=>{

        let token
        let name

        const exec =  function(){
          return request(server)
                .post('/api/genres')
                .set('x-auth-token',token)
                .send({name})
        }

        beforeEach(()=>{
            token =  new User().generateAuthToken()
            name = 'genre1'
        })

        it('should return a 401 if the client is not logged in', async ()=>{ 
            const res = await request(server).post('/api/genres') 
            expect(res.status).toBe(401) 
        })

        it('should return 400 if genre is less than 5 characters', async()=>{
            name = '1234'
            const res = await exec()

            expect(res.status).toBe(400) 
        })

        it('should return 400 if genre is more than 50 characters', async()=>{
            name = new Array(55).join('a')
            const res = await exec()

            expect(res.status).toBe(400) 
        })

        it('should save the genre if valid', async()=>{
            
            const res = await exec()

            expect(res.status).toBe(200) 
        })

        it('should return the genre if valid', async()=>{
            
            const res = await exec()

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name')  
        })
    })
})