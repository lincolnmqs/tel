const request = require('supertest');
const Flat    = require('../models/flat');
const app     = require('../app');
const mongoose = require('mongoose');

describe('Flat', () => {
    afterEach(async function () {
        const collections = await mongoose.connection.db.collections();
      
        for (let collection of collections) {
          await collection.remove();
        }
    });

    it('Deve cadastrar e buscar um plano', async () => {
        const flat = await Flat.create({
            name: 'FaleMais 140',
            time: 140
        });

        await Flat.findById({ _id: flat._id }, function(err, flatAux) {
            expect(flatAux.name).toBe('FaleMais 140'); 
            expect(flatAux.time).toBe(140); 
        });       
    });

    it('Deve cadastrar um plano', async () => {
        const response = await request(app)
            .post('/api/newFlat')
            .send({
                name: "FaleMais 150",
                time: 150
            });

        expect(response.status).toBe(200);        
    });

    it('Deve cadastrar e editar um plano', async () => {
        const flat = await Flat.create({
            name: "FaleMais 180",
            time: 180
        });

        const response = await request(app)
            .put(`/api/updateFlat${flat._id}`)
            .send({
                name: "FaleMais 200",
                time: 200
            });

        expect(response.status).toBe(200);
    });

    it('Deve cadastrar e excluir um plano', async () =>{
        const flat = await Flat.create({
            name: "FaleMais 220",
            time: 220
        });

        const response = await request(app)
            .delete(`/api/deleteFlat${flat._id}`);

        expect(response.status).toBe(200);
    })
});