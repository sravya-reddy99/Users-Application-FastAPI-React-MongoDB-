
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# from motor.motor_asyncio import AsyncIOMotorClient

uri = "mongodb+srv://gudipellysravya_db_user:sravya_password_123@clustersrav.hnppqmf.mongodb.net/?appName=ClusterSrav"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# client = AsyncIOMotorClient(uri)

db = client.full_stack_db
users_collection = db.full_stack_collection
