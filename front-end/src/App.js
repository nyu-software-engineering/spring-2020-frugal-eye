import React from 'react';
import logo from './logo.svg';
import './App.css';

const http = require('http');
const express = require('express');
const app = express();
const path = require("path");
require('./db');

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

const mongoose = require('mongoose');
const Showdb = mongoose.model('Showdb');

app.get('/', (req, res) => {
  print(
    <h1>Hello World</h1>
    );
});