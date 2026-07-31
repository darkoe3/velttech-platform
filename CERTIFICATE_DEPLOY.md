# Certificate Implementation - Quick Deploy Guide

## 🚀 QUICK START

### Backend Deployment

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies (if not already done)
pip install -r requirements.txt

# 3. Run migrations
python manage.py migrate

# 4. Create media directory for certificates
mkdir -p media/certificates

# 5. Run tests to verify installation
python manage.py test certificates.tests

# 6. Create superuser (if needed)
python manage.py createsuperuser

# 7. Collect static files (production)
python manage.py collectstatic --noinput

# 8. Start development server
python manage.py runserver
```

### Frontend Deployment

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if needed - should already be done)
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

---

## 📋 VERIFICATION CHECKLIST

### Backend Verification
- [ ] Migrations run successfully
- [ ] Certificates app appears in Django admin
- [ ] Tests pass: `python manage.py test certificates`
- [ ] API endpoints accessible:
  - [ ] `/api/certificates/`
  - [ ] `/api/certificates/issue/`
  - [ ] `/api/certificates/verify/?code=UUID`

### Frontend Verification
- [ ] Admin can access `/admin/certificates`
- [ ] Instructor can access `/instructor/certificates`
- [ ] Student can access `/my-certificates`
- [ ] Public can access `/certificates/verify/[code]`

### Integration Verification
- [ ] Admin can issue certificate
- [ ] Certificate PDF generates
- [ ] PDF downloads correctly
- [ ] Public verification works
- [ ] Parent can see child certificates (if component integrated)

---

## 🔧 TROUBLESHOOTING

### Issue: "certificates app not found"
**Solution:** 
```bash
# Make sure to add to INSTALLED_APPS in settings.py
# Check: backend/velttech/settings.py contains "certificates"
python manage.py migrate
```

### Issue: "ModuleNotFoundError: No module named 'reportlab'"
**Solution:**
```bash
pip install reportlab Pillow qrcode
pip install -r requirements.txt
```

### Issue: "Certificate PDF generation fails"
**Solution:**
```bash
# Install Pillow for image processing
pip install Pillow==10.1.0
# Check media/certificates directory exists and is writable
chmod 755 media/certificates
```

### Issue: Frontend API calls failing
**Solution:**
```bash
# Ensure CORS is configured in backend settings
# Check: backend/velttech/settings.py CORS_ALLOWED_ORIGINS
# Production Academy frontend origin:
# https://academy.velttech.org
# Restart backend server
python manage.py runserver
```

---

## 📝 CERTIFICATE NUMBER FORMAT

Format: `VTA-CERT-YYYY-XXXXXX`

Example: `VTA-CERT-2026-000001`

- VTA: Velttech Academy prefix
- CERT: Certificate indicator
- YYYY: Year of completion
- XXXXXX: Sequential 6-digit number (auto-incrementing per year)

---

## 🔐 VERIFICATION CODE FORMAT

UUID format (example): `550e8400-e29b-41d4-a716-446655440000`

- Unique for each certificate
- Used for public verification
- Cannot be guessed (UUID v4)

---

## 📊 DATABASE SCHEMA

### Certificate Table
```
id (PK)
certificate_number (UNIQUE)
student_id (FK to students.student)
enrollment_id (FK to enrollments.enrollment, ONE-TO-ONE)
course_id (FK to courses.course)
issued_by_id (FK to users.user, nullable)
issued_at (DateTime, nullable)
completion_date (Date)
status (Choice: draft, issued, revoked)
verification_code (UNIQUE)
certificate_file (FileField, nullable)
revoked_at (DateTime, nullable)
revoke_reason (TextField)
created_at (DateTime)
updated_at (DateTime)

UNIQUE CONSTRAINT: (student_id, course_id) WHERE status='issued'
```

---

## 🎨 BRANDING COLORS

Used in certificate PDF:

```
Gold:       #F4C318
Orange:     #F28A1A
Green:      #7AC943
Tech Blue:  #9CCED9
Dark:       #0F172A
```

---

## 📱 RESPONSIVE DESIGN

All frontend pages are responsive for:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px-1023px)
- ✅ Mobile (< 768px)

---

## 🔄 API RATE LIMITING

No rate limiting is currently implemented. Add if needed:

```python
# In settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}
```

---

## 🧪 RUNNING TESTS

### All Certificate Tests
```bash
python manage.py test certificates
```

### Specific Test
```bash
python manage.py test certificates.tests.CertificateModelTests.test_certificate_creation
```

### With Coverage
```bash
pip install coverage
coverage run --source='certificates' manage.py test certificates
coverage report
```

---

## 📚 API DOCUMENTATION

### Issue Certificate
```bash
POST /api/certificates/issue/
{
  "enrollment_id": 123,
  "completion_date": "2026-06-11"
}
```

### List Certificates
```bash
GET /api/certificates/
GET /api/certificates/?status=issued
```

### Download Certificate
```bash
GET /api/certificates/{id}/download/
# Returns: PDF file
```

### Verify Certificate (Public)
```bash
GET /api/certificates/verify/?code=550e8400-e29b-41d4-a716-446655440000
# Returns: {certificate_number, student_name, course_title, completion_date, issued_at, status}
```

### Revoke Certificate
```bash
POST /api/certificates/{id}/revoke/
{
  "reason": "Student requested revocation"
}
```

---

## 📞 SUPPORT

For additional help:
1. Check `CERTIFICATE_IMPLEMENTATION.md` for full documentation
2. Review test file: `backend/certificates/tests.py`
3. Check Django admin: `/admin/certificates/`
4. Review frontend components: `frontend/components/certificates/`

---

**Last Updated:** 2026-06-11
**Status:** Ready for Deployment ✅
