// models/Livre.js
const mongoose = require('mongoose');

// Définition du schéma d'un livre
const livreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
  },
  date_publication: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

// Création du modèle à partir du schéma
const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;
