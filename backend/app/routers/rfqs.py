from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from ..database import get_db
from ..models import User, RFQ, RFQStatusEnum
from ..schemas import RFQCreate, RFQUpdate, RFQOut, QuotationOut
from ..dependencies import get_current_user, require_role
from ..models import RoleEnum

router = APIRouter()

@router.post("/", response_model=RFQOut, status_code=201)
def create_rfq(
    rfq_in: RFQCreate,
    current_user: User = Depends(require_role(RoleEnum.buyer)),
    db: Session = Depends(get_db),
):
    if rfq_in.deadline <= datetime.utcnow():
        raise HTTPException(status_code=400, detail="Deadline must be in the future")
    rfq = RFQ(**rfq_in.dict(), buyer_id=current_user.id)
    db.add(rfq)
    db.commit()
    db.refresh(rfq)
    return rfq

@router.get("/my", response_model=List[RFQOut])
def get_my_rfqs(
    current_user: User = Depends(require_role(RoleEnum.buyer)),
    db: Session = Depends(get_db),
):
    return db.query(RFQ).filter(RFQ.buyer_id == current_user.id).all()

@router.get("/", response_model=List[RFQOut])
def list_rfqs(
    search: Optional[str] = Query(None),
    status: Optional[RFQStatusEnum] = Query(None),
    current_user: User = Depends(require_role(RoleEnum.supplier)),
    db: Session = Depends(get_db),
):
    q = db.query(RFQ)
    if search:
        q = q.filter(RFQ.product_name.ilike(f"%{search}%"))
    if status:
        q = q.filter(RFQ.status == status)
    else:
        q = q.filter(RFQ.status == RFQStatusEnum.open)
    return q.all()

@router.get("/{rfq_id}", response_model=RFQOut)
def get_rfq(
    rfq_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    rfq = db.query(RFQ).filter(RFQ.id == rfq_id).first()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    return rfq

@router.get("/{rfq_id}/quotations", response_model=List[QuotationOut])
def get_rfq_quotations(
    rfq_id: int,
    current_user: User = Depends(require_role(RoleEnum.buyer)),
    db: Session = Depends(get_db),
):
    rfq = db.query(RFQ).filter(RFQ.id == rfq_id).first()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    if rfq.buyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view these quotations")
    return rfq.quotations

@router.put("/{rfq_id}", response_model=RFQOut)
def update_rfq(
    rfq_id: int,
    rfq_in: RFQUpdate,
    current_user: User = Depends(require_role(RoleEnum.buyer)),
    db: Session = Depends(get_db),
):
    rfq = db.query(RFQ).filter(RFQ.id == rfq_id).first()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    if rfq.buyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this RFQ")
    update_data = rfq_in.dict(exclude_unset=True)
    if "deadline" in update_data and update_data["deadline"] <= datetime.utcnow():
        raise HTTPException(status_code=400, detail="Deadline must be in the future")
    for k, v in update_data.items():
        setattr(rfq, k, v)
    db.commit()
    db.refresh(rfq)
    return rfq