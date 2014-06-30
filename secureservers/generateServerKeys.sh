#!/bin/bash
privatekey=my_key.pem;
certificateSignRequest=my_csr.pem;
selfsignedCertificate=my_cert.pem;
# create a private key for server
openssl genrsa -out $privatekey 1024;
# create certificate signing request
openssl req -new -key $privatekey -out $certificateSignRequest;
# create self signed certificate based on the csr
openssl x509 -req -in $certificateSignRequest -signkey $privatekey -out $selfsignedCertificate;
