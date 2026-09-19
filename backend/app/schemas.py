from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List
from .models import RoleEnum, RFQStatusEnum

# Auth
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: RoleEnum

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: RoleEnum

# RFQ
class RFQCreate(BaseModel):
    product_name: str
    description: str
    quantity: int = Field(..., gt=0)
    delivery_location: str
    deadline: datetime

class RFQUpdate(BaseModel):
    product_name: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = Field(None, gt=0)
    delivery_location: Optional[str] = None
    deadline: Optional[datetime] = None
    status: Optional[RFQStatusEnum] = None

class RFQOut(BaseModel):
    id: int
    buyer_id: int
    product_name: str
    description: str
    quantity: int
    delivery_location: str
    deadline: datetime
    status: RFQStatusEnum
    created_at: datetime
    updated_at: Optional[datetime] = None

# Quotation
class QuotationCreate(BaseModel):
    price: float = Field(..., gt=0)
    delivery_time: str
    message: Optional[str] = None

class QuotationOut(BaseModel):
    id: int
    rfq_id: int
    supplier_id: int
    price: float
    delivery_time: str
    message: Optional[str] = None
    created_at: datetime