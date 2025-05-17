import http.server
import ssl

PORT = 4443

httpd = http.server.HTTPServer(('0.0.0.0', PORT), http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
                               certfile='server.crt',
                               keyfile='server.key',
                               server_side=True)

print(f"Serving HTTPS on https://localhost:{PORT}")
httpd.serve_forever()
