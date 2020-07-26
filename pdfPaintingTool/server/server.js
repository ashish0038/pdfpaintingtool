const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const merge = require('easy-pdf-merge');
const fs = require('fs');
const pdf = require('pdf-poppler');
const sizeOf = require('image-size');
const imagesToPdf = require("images-to-pdf")

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

app.post('/api/save-image', (req, res) => {
    const uploadFile = req.files.uploadedFile;
    const imageFileName = req.body.fileName;
    uploadFile.mv(path.join(__dirname, `/files/import/${imageFileName}`), (err) => {
        res.send({ sucess: true });
    });
});

app.post('/api/pdf-upload', (req, res) => {
    const fileName = `pdf${getRandom()}.pdf`;
    const fileNameJpg = `pdf${getRandom()}`;
    const uploadFile = req.files.uploadedFile;
    uploadFile.mv(path.join(__dirname, `/files/import/${fileName}`), (err) => {
        const file = path.join(__dirname, `/files/import/${fileName}`);
        const opts = {
            format: 'jpeg',
            out_dir: path.dirname(file),
            out_prefix: fileNameJpg,
            page: null
        }
        pdf.convert(file, opts)
            .then(() => {
                const dimensions = sizeOf(path.join(__dirname, `/files/import/${fileNameJpg}-1.jpg`));
                res.send({
                    sucess: true, imgfileName: `${fileNameJpg}-1.jpg`,
                    fileName: `${fileName}`, imgWidth: dimensions.width,
                    imgHeight: dimensions.height
                });
            })
            .catch(err => {
                res.send({ sucess: false, error: err });
            })
    });
});

app.post('/api/merge-pdf', async (req, res) => {
    const resultFileName = `ResultPdf${getRandom()}.pdf`
    const jpgfiles = req.body.files;
    var files = [];
    jpgfiles.forEach(x => {
        files.push(path.join(__dirname, `/files/import/${x}`));
    });
    await imagesToPdf(files, path.join(__dirname, `/files/import/${resultFileName}`));

    if (fs.existsSync(path.join(__dirname, `/files/import/${resultFileName}`))) {
        res.send({ sucess: true, fileName: resultFileName });
    }
    else {
        res.send({ sucess: false, error: 'Error to process generate PDF.' });
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