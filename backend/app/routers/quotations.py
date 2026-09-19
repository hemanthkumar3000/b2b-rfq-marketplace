from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User, RFQ, Quotation, RFQStatusEnum
from ..schemas import QuotationCreate, QuotationOut
from ..dependencies import get_current_user, require_role
from ..models import RoleEnum

router = APIRouter()

@router.post("/rfqs/{rfq_id}/quotations", response_model=QuotationOut, status_code=201)
def create_quotation(
    rfq_id: int,
    quotation_in: QuotationCreate,
    current_user: User = Depends(require_role(RoleEnum.supplier)),
    db: Session = Depends(get_db),
):
    rfq = db.query(RFQ).filter(RFQ.id == rfq_id).first()
    if not rfq:
        raise HTTPException(status_code=404, detail="RFQ not found")
    if rfq.status != RFQStatusEnum.open:
        raise HTTPException(status_code=400, detail="RFQ is not open for quotations")
    existing = db.query(Quotation).filter(
        Quotation.rfq_id == rfq_id,
        Quotation.supplier_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You have already submitted a quotation for this RFQ")
    quotation = Quotation(**quotation_in.dict(), rfq_id=rfq_id, supplier_id=current_user.id)
    db.add(quotation)
    db.commit()
    db.refresh(quotation)
    return quotation

@router.get("/quotations/my", response_model=List[QuotationOut])
def get_my_quotations(
    current_user: User = Depends(require_role(RoleEnum.supplier)),
    db: Session = Depends(get_db),
):
    return db.query(Quotation).filter(Quotation.supplier_id == current_user.id).all()