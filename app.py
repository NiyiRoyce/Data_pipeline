from flask import Flask, render_template, request, jsonify
import pytesseract
import cv2
import numpy as np
import re

app = Flask(__name__)

def extract_product_from_image(image_bytes):
    #convert bytes to opencv images
    nparr = np.frombuffer(image_bytes,np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    text = pytesseract.image_to_string(thresh)

    # PARSE Text to Products
    products = []
    for line in text.split("/n"):
        line = line.strip()
        if not line:
            continue
         price_match = re.search(r"\$\d+(\.\d{2})?", line)
        if price_match:
            price = price_match.group()
            name = line.replace(price, "").strip()
            products.append({"name": name, "price": price})
    return products
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    if 'leaflet' not in request.files:
        return jsonify([])
    file = request.files['leaflet']
    products = extract_products_from_image(file.read())
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True)
