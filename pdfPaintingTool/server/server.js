const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const merge = require('easy-pdf-merge');
const fs = require('fs');

const port = 4201;

app.use(cors());

app.get('/api/test-api', (req, res) => {
    res.end('Hello World !');
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(fileUpload());

app.post('/api/pdf-upload', (req, res) => {
    const fileName = `pdf${getRandom()}.pdf`;
    const uploadFile = req.files.uploadedFile;
    uploadFile.mv(path.join(__dirname, `/files/import/${fileName}`), (err) => {
        if (err)
            res.send({ sucess: false, error: err });
        res.send({ sucess: true, fileName: fileName });
    });
});

app.post('/api/merge-pdf', (req, res) => {
    const files = req.body.files;
    let requiredFileToMerge = [];
    if (Array.isArray(files)) {
        files.forEach(item => {
            let filePath = path.join(__dirname, `/files/import/${item}`);
            if (fs.existsSync(filePath)) {
                requiredFileToMerge.push(filePath);
            }
        });
        merge(requiredFileToMerge, path.join(__dirname, `/files/import/${resultFileName}`),
            (err) => {
                if (err)
                    res.send({ sucess: false, error: err });
                res.send({ sucess: true, fileName: resultFileName });
            });
    }
    else {
        if (fs.existsSync(path.join(__dirname, `/files/import/${files}`))) {
            res.send({ sucess: true, fileName: files });
        }
        else {
            res.send({ sucess: false, error: 'File not found.' });
        }
    }
});

app.get('/api/get-stamps', (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, `/files/export/stamp`), { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name.toString());
    res.send({
        sucess: true, files: files
    });
});

app.get('/api/get-headers', (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, `/files/export/header`), { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name.toString());
    res.send({
        sucess: true, files: files
    });
});

app.get('/api/get-footers', (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, `/files/export/footer`), { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name.toString());
    res.send({
        sucess: true, files: files
    });
});

app.listen(port, () => {
    console.log(`PDF painting tool api running on http://localhost:${port}`);
});



function getRandom() {
    const max = 9999999999999;
    return Math.floor(Math.random() * Math.floor(max));
};