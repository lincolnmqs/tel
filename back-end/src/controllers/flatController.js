const Flat = require('../models/flat');

class FlatController {
    async index(req, res) {
        try {
            await Flat.find(function(err, flats) {
                if(err)
                    res.send(err);
     
                res.json(flats);
            });

        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' })
        }
    }
    
    async indexId(req, res) {
        try {
            const { id } = req.params;

            await Flat.findById({ _id: id }, function(err, flat) {
                if(err)
                    res.send(err);
     
                res.json(flat);
            });

        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' })
        }
    }
    
    async store(req, res) {
        try {
            const flat = await Flat.create(req.body);
            
            return res.send({ flat });
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }

    async put(req, res) {
        try {
            const { id } = req.params;
            
            const flat = await Flat.updateOne({ _id: id }, req.body);

            return res.send( flat );
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Flat.remove({ _id: id });

            return res.send({ message: 'Successfully deleted!' });
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }
}

module.exports = new FlatController();