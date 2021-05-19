const request   = require('supertest');
const CallValue = require('../models/callValue');
const app       = require('../app');
const mongoose  = require('mongoose');

describe('CallValue', () => {
    afterEach(async function () {
        const collections = await mongoose.connection.db.collections();
      
        for (let collection of collections) {
          await collection.remove();
        }
    });

    it('Deve cadastrar e buscar um valor de chamada', async () => {
        const callValue = await CallValue.create({
            origin: '020',
            destiny: '021',
            price: 3.0
        });

        await CallValue.findById({ _id: callValue._id }, function(err, value) {
            expect(value.origin).toBe('020'); 
            expect(value.destiny).toBe('021'); 
            expect(value.price).toBe(3.0); 
        });       
    });

    it('Deve cadastrar um valor de chamada', async () => {
        const response = await request(app)
            .post('/api/newCallValue')
            .send({
                origin: '022',
                destiny: '023',
                price: 3.5
            });

        expect(response.status).toBe(200);        
    });

    it('Deve cadastrar e editar um valor de chamada', async () => {
        const callValue = await CallValue.create({
            origin: '024',
            destiny: '025',
            price: 4.0
        });

        const response = await request(app)
            .put(`/api/updateCallValue${callValue._id}`)
            .send({
                origin: '026',
                destiny: '027',
                price: 3.7
            });

        expect(response.status).toBe(200);
    });

    it('Deve cadastrar e excluir um valor de chamada', async () =>{
        const callValue = await CallValue.create({
            origin: '028',
            destiny: '029',
            price: 3.2
        });

        const response = await request(app)
            .delete(`/api/deleteCallValue${callValue._id}`);

        expect(response.status).toBe(200);
    })
});