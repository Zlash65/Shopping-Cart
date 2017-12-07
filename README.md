# Shopping Website
Building something similar to a shopping website, where user can see items that are available and can add them to their cart and afterwards when they are done with adding, they can go to the cart and see a final list of items after which they can proceed to checkout.

Right now its just a simplistic app. More functionality will be added [hope so].

### Prerequisites

You need to have [Python](https://www.python.org/downloads/).


## How to Run the App

1. Open cmd in the current directory where the files have been extracted. And type...
```
  pip install
```
* Install all the required packages, eg. Flask and flask_pymongo.

2. You can either use the default location to create the database that'd be [ C:\data\db or \data\db depending whether you're using windows or linux/mac ] or you can locally create one in your current 
directory by running the command...
```
mkdir data
```
* This will create a directory in your current workspace.
* For now I've included the data folder with some data in it already since the page to add items to the database hasn't been created yet. So I've stored some dummy data in it for the sake of functioning.

4. Open terminal, go to the path where the project directory exists, type
```
python server.py
```

5. Open up your browser and type 
```
127.0.0.1:5000/
```
