from flask import Flask,request,json,jsonify,render_template
from pymongo import MongoClient
from bson.objectid import ObjectId
import numpy as np

app = Flask(__name__)
client = MongoClient("localhost:27017")
db = client.shopping

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/admin')
def admin():
	return render_template('admin.html')

@app.route('/showProducts', methods=['POST'])
def showProducts():
	try:	
		items = db.inventory.find()
		products = []
		for item in items:
			productItem = {
				'name': item['name'],
				'category': item['category'],
				'price': item['price'],
				'quantity': item['quantity'],
				'_id': str(item['_id'])
			}
			products.append(productItem)
		x = len(products)
		while True:
			if x%4!=0:
				products.append({'_id': '0'})
				x=x+1
			else:
				break

	except Exception,err:
		return str(err)
	return json.dumps(products)

# Updating Value in database about quantity of item sold
@app.route("/checkout", methods=['POST'])
def checkout():
	try:
		cart = request.json['cart']
		for item in cart:
			x = item['quantity']
			id = item['_id']
			db.inventory.update_one({'_id': ObjectId(id)}, {'$set':{'quantity': x}})
		return jsonify(status= 'OK',message = 'Update successful')
	except Exception,e:
		return jsonify(status = 'ERROR',message=str(e))

if __name__ == "__main__":
    app.run(debug=True)