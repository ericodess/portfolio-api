const express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');

const router = express.Router();


const getBlobLink = async (containerName, subContainerName, fileName) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const hostName = 'https://namahaassetdev.blob.core.windows.net';

    let blobLink;
    
    for await (const blob of containerClient.listBlobsFlat()){
        if(blob.name.split('/')[0] === subContainerName && blob.name.split('/')[1] === fileName){
            blobLink = `${hostName}/${containerName}/${blob.name}`
        }
    }

    return blobLink;
};

router.get('/:containerName/:subContainerName/:fileName', (req, res, next) => {
    getBlobLink(req.params.containerName, req.params.subContainerName, req.params.fileName)
    .then(result => {
        if(result === undefined){
            res.status(404).json({
                success: false,
                description: 'File not found'
            });
        }else{
            res.status(200).json({
                success: true,
                blobLink: result
            });
        }
    })
    .catch(error => {
        if(error.name === "RestError"){
            res.status(404).json({
                success: false,
                description: 'Container not found'
            });
        }
    })
});

module.exports = router;