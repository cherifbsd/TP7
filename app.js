// app.js
const express = require('express');
const bodyParser = require('body-parser');
const Livre = require('./models/Livre');
require('./database'); // importe la connexion MongoDB

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(bodyParser.json());

/**
 * 1) Ajouter un livre  - POST /livres
 */
app.post('/livres', async (req, res) => {
  try {
    const { titre, auteur, date_publication, genre, disponible } = req.body;

    const livre = new Livre({
      titre,
      auteur,
      date_publication,
      genre,
      disponible,
    });

    const savedLivre = await livre.save();

    res.status(201).json({
      message: 'Livre ajouté avec succès',
      livre: savedLivre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout du livre',
      error: err.message,
    });
  }
});

/**
 * 2) Récupérer tous les livres  - GET /livres
 */
app.get('/livres', async (req, res) => {
  try {
    const livres = await Livre.find();
    res.status(200).json(livres);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération des livres',
      error: err.message,
    });
  }
});

/**
 * 3) Mettre à jour un livre par ID  - PUT /livres/:id
 */
app.put('/livres/:id', async (req, res) => {
  try {
    const { titre, auteur, date_publication, genre, disponible } = req.body;

    const livre = await Livre.findByIdAndUpdate(
      req.params.id,
      { titre, auteur, date_publication, genre, disponible },
      { new: true } // renvoyer le document mis à jour
    );

    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.status(200).json({
      message: 'Livre mis à jour',
      livre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du livre',
      error: err.message,
    });
  }
});

/**
 * 4) Supprimer un livre par ID  - DELETE /livres/:id
 */
app.delete('/livres/:id', async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);

    if (!livre) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    res.status(200).json({ message: 'Livre supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la suppression du livre',
      error: err.message,
    });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${port}`);
});
