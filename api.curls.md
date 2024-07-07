# Base URL - replace with your actual server URL if different
BASE_URL="http://localhost:4000/api"
BASE_URL="http://localhost:4000/api"

# Register user
curl -X POST ${BASE_URL}/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"piyush@gg.gg.co","password":"piyush@gg.gg.co"}'

# Login user
curl -X POST ${BASE_URL}/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"piyush@gg.gg.co","password":"piyush@gg.gg.co"}'

# After login, you'll receive a token. Replace YOUR_TOKEN_HERE with that token in the following requests
YOUR_TOKEN_HERE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Y2M5ODA3Ni1mMTBkLTQ5YjUtOGNmYS00YWZmMTBlMWM1ZTEiLCJpYXQiOjE3MjAzNjYzMzQsImV4cCI6MTcyMDQ1MjczNH0.XvuOLG3h83RbM_DteviJNlvK4Xe5kyCq_AKZ-srMjJk"

# Get all companies
curl -X GET ${BASE_URL}/companies \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get company by ID
curl -X GET ${BASE_URL}/companies/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get all colleges
curl -X GET ${BASE_URL}/colleges \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get college by ID
curl -X GET ${BASE_URL}/colleges/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Upload online assessment
curl -X POST ${BASE_URL}/online-assessments/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: multipart/form-data" \
  -F "companyName=Test Company" \
  -F "collegeName=Test College" \
  -F "year=2023" \
  -F "pdf=@/path/to/your/file.pdf"

# Get all online assessments
curl -X GET ${BASE_URL}/online-assessments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get online assessment by ID
curl -X GET ${BASE_URL}/online-assessments/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"