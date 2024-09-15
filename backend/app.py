# app.py or your Flask application file
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
faqs = [
    {"id": 1, "question": "What is a fruit?", "answer": "A fruit is the seed-bearing structure in flowering plants."},
    {"id": 2, "question": "What is an apple?", "answer": "An apple is a sweet fruit from the apple tree."},
]

@app.route('/api/faqs', methods=['GET'])
def get_faqs():
    return jsonify(faqs)

@app.route('/api/faqs/<int:id>', methods=['GET'])
def get_faq(id):
    faq = next((faq for faq in faqs if faq['id'] == id), None)
    if faq:
        return jsonify(faq)
    else:
        return jsonify({"error": "FAQ not found"}), 404

@app.route('/api/faqs', methods=['POST'])
def create_faq():
    new_faq = request.get_json()
    faqs.append(new_faq)
    return jsonify(new_faq), 201

@app.route('/api/faqs/<int:id>', methods=['PUT'])
def update_faq(id):
    updated_faq = request.get_json()
    for i, faq in enumerate(faqs):
        if faq['id'] == id:
            faqs[i] = updated_faq
            return jsonify(updated_faq)
    return jsonify({"error": "FAQ not found"}), 404

@app.route('/api/faqs/<int:id>', methods=['DELETE'])
def delete_faq(id):
    global faqs
    faqs = [faq for faq in faqs if faq['id'] != id]
    return jsonify({"message": "FAQ deleted"})

if __name__ == '__main__':
    app.run(debug=True)
