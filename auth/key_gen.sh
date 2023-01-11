 #!/bin/sh
 openssl req -x509 -newkey rsa:2048 -keyout server_key.pem -out cert.pem -nodes