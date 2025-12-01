from bson import ObjectId
from fastapi import APIRouter, HTTPException
from models.user import User
from config.db import users_collection
from schemas.user import userEntity, usersEntity

user_router = APIRouter()

@user_router.get("/")
async def find_all_users():
    # users = await users_collection.find().to_list(None)
    users = users_collection.find()
    return usersEntity(users)

@user_router.get("/{id}")
def find_by_userId(id:str):
    user = users_collection.find_one({"_id": ObjectId(id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        # raise HTTPException(status_code=404, detail={"error": "NOT FOUND", "message": "No User Found"})
    return userEntity(user)

@user_router.post("/", status_code=201)
async def create_user(user: User):
    users_collection.insert_one(dict(user))
    return usersEntity(users_collection.find())

@user_router.put("/")
async def update_user(id:str, user: User):
    users_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)})
    return userEntity(users_collection.find_one({"_id": ObjectId(id)}))

@user_router.delete("/", status_code=204)
async def delete_user(id:str):
    return userEntity(users_collection.find_one_and_delete({"_id": ObjectId(id)}))