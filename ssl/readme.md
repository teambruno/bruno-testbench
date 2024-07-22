---
Creating client certs:

Execute the following commands inside the `client_certs` folder.

```sh
# Generate a private key for the CA
openssl genrsa -out ca.key 2048

# Create a self-signed CA certificate
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt -subj "/CN=My Test CA"

# Generate a private key for the client
openssl genrsa -out client.key 2048

# Create a CSR using the client key
openssl req -new -key client.key -out client.csr -subj "/CN=My Client"

# Sign the client CSR with the CA
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256

# Combine the client certificate, private key, and CA certificate into a PFX file
openssl pkcs12 -export -out client.pfx -inkey client.key -in client.crt -certfile ca.crt -passout pass:bruno
```

---

Creating server certs:

Execute the following commands inside the `server_certs` folder.

```sh
# Creating the server.key file
openssl genrsa -out server.key 2048

# Creating the server.crt file
openssl req -new -x509 -key server.key -out server.crt -days 365 -subj "/CN=localhost"
```

---
