# Phase 5: Admin & Polish - QA Test Plan

**Project:** OrderUp (Multi-tenant Restaurant System)
**Phase:** 5 - Admin Dashboard, CI/CD, Unit Tests
**QA Lead:** Queue Team
**Date:** 2026-02-06

## 🎯 Phase 5 Overview

### Features to Test
1. **Admin Dashboard APIs** (Backend - Dev Team)
   - Super Admin Dashboard APIs for aggregated statistics
   - System-wide monitoring and management endpoints

2. **Admin Dashboard UI** (Frontend - Fron Team)  
   - Platform owner view and management interface
   - Real-time statistics and monitoring

3. **CI/CD Pipeline** (DevOps - Deeploy Team)
   - GitHub Actions workflow enhancements
   - Automated testing, building, and deployment

4. **Unit Tests** (Backend - Back Team)
   - Critical path test coverage
   - Model, service, and API testing

### Testing Types Required
- **Functional Tests**: Verify features work correctly
- **Integration Tests**: Ensure components connect properly  
- **UI/UX Tests**: Validate user experience quality
- **Performance Tests**: Load testing and response time validation
- **Security Tests**: Authorization and input validation checks

---

## 📋 Detailed Test Plan

### 1. Admin Dashboard APIs (Backend)

#### 1.1 Functional Tests

**Test Case AD-API-001: System Statistics API**
- **Endpoint**: `/api/admin/stats/overview`
- **Method**: GET
- **Authentication**: Super Admin required
- **Test Data**: 
  - Multiple tenants with different activity levels
  - Recent orders, customers, and revenue data
- **Expected Response**:
  ```json
  {
    "total_tenants": 15,
    "active_tenants": 12,
    "total_orders_today": 234,
    "total_revenue_today": 45678.50,
    "total_customers": 892,
    "active_customers_30d": 456,
    "system_status": "healthy"
  }
  ```
- **Pass Criteria**: 
  - Returns aggregated data correctly
  - Response time < 500ms
  - Status code 200 for super admin
  - Status code 403 for non-admin users

**Test Case AD-API-002: Tenant Management API**
- **Endpoint**: `/api/admin/tenants/`
- **Method**: GET, POST, PUT, DELETE
- **Authentication**: Super Admin required
- **Test Scenarios**:
  - List all tenants with pagination
  - Create new tenant
  - Update tenant settings
  - Delete tenant (with confirmation)
- **Pass Criteria**:
  - CRUD operations work correctly
  - Tenant isolation maintained
  - Proper validation of tenant data
  - Audit logging for all operations

**Test Case AD-API-003: Revenue Analytics API**
- **Endpoint**: `/api/admin/analytics/revenue`
- **Method**: GET
- **Parameters**: `start_date`, `end_date`, `tenant_id` (optional)
- **Expected Response**:
  ```json
  {
    "total_revenue": 123456.78,
    "order_count": 789,
    "average_order_value": 156.59,
    "revenue_by_tenant": [...],
    "revenue_by_day": [...],
    "top_tenants": [...]
  }
  ```
- **Pass Criteria**:
  - Correct revenue calculations
  - Date range filtering works
  - Tenant-specific and system-wide views
  - Caching improves performance

#### 1.2 Security Tests

**Test Case AD-SEC-001: Authorization Testing**
- **Objective**: Verify only super admins can access admin APIs
- **Test Scenarios**:
  - Unauthenticated user access → 401
  - Regular authenticated user → 403  
  - Tenant admin → 403
  - Super admin → 200
- **Pass Criteria**: Proper role-based access control

**Test Case AD-SEC-002: Input Validation**
- **Objective**: Prevent injection attacks and invalid data
- **Test Scenarios**:
  - SQL injection attempts in parameters
  - XSS attempts in text fields
  - Large payload testing (DoS protection)
  - Malformed JSON handling
- **Pass Criteria**: Input sanitized, proper error responses

#### 1.3 Performance Tests

**Test Case AD-PERF-001: Load Testing**
- **Objective**: System performance under heavy load
- **Test Configuration**:
  - Simulate 100 concurrent users
  - Duration: 10 minutes
  - Ramp-up: 2 minutes
  - Endpoints: All admin APIs
- **Metrics**:
  - Response time < 1000ms (95th percentile)
  - Error rate < 1%
  - Throughput > 50 requests/second
- **Pass Criteria**: All metrics met

### 2. Admin Dashboard UI (Frontend)

#### 2.1 Functional Tests

**Test Case AD-UI-001: Dashboard Loading**
- **Page**: `/admin/dashboard`
- **Authentication**: Super Admin required
- **Test Scenarios**:
  - Page loads with correct permissions
  - All widgets display data
  - Real-time updates work
  - Mobile responsive design
- **Pass Criteria**: 
  - Page loads < 3 seconds
  - All widgets show data (no empty states)
  - Real-time updates functional
  - Responsive design works

**Test Case AD-UI-002: Tenant Management Interface**
- **Page**: `/admin/tenants`
- **Components**:
  - Tenant list with search/filter
  - Create tenant modal
  - Edit tenant form
  - Delete confirmation dialog
- **Test Scenarios**:
  - Search tenant by name/domain
  - Filter by status (active/inactive)
  - Create new tenant with validation
  - Edit tenant settings
  - Delete tenant with confirmation
- **Pass Criteria**: All interactions work correctly

**Test Case AD-UI-003: Analytics Charts**
- **Components**: 
  - Revenue chart (Line/Bar)
  - Tenant performance (Pie chart)
  - Order trends (Time series)
  - Customer growth chart
- **Test Scenarios**:
  - Charts load with data
  - Date range selection works
  - Chart interactions (hover, zoom)
  - Export functionality
  - Responsive chart sizing
- **Pass Criteria**: Charts functional and accurate

#### 2.2 UI/UX Tests

**Test Case AD-UX-001: Navigation Testing**
- **Objective**: Verify intuitive navigation
- **Test Scenarios**:
  - Menu structure logical
  - Breadcrumb navigation
  - Back/forward browser buttons
  - Deep linking to sections
  - Mobile hamburger menu
- **Pass Criteria**: Intuitive navigation experience

**Test Case AD-UX-002: Form Usability**
- **Objective**: Forms are user-friendly
- **Test Scenarios**:
  - Clear form labels and help text
  - Real-time validation feedback
  - Proper error messaging
  - Save/Cancel/Reset buttons
  - Progress indicators
  - Keyboard navigation support
- **Pass Criteria**: Excellent form usability

#### 2.3 Performance Tests

**Test Case AD-UI-PERF-001: Page Load Performance**
- **Test Tool**: Lighthouse or WebPageTest
- **Metrics**:
  - First Contentful Paint < 2s
  - Largest Contentful Paint < 3s  
  - Time to Interactive < 4s
  - Cumulative Layout Shift < 0.1
- **Pass Criteria**: All performance metrics met

### 3. CI/CD Pipeline (DevOps)

#### 3.1 Functional Tests

**Test Case CD-001: Backend Tests Execution**
- **Workflow**: `.github/workflows/ci.yml` - `backend-test` job
- **Test Scenarios**:
  - Python environment setup
  - Dependencies installation
  - Database migrations
  - Pytest execution
  - Test coverage generation
- **Pass Criteria**:
  - All tests pass
  - Coverage > 80%
  - No security vulnerabilities

**Test Case CD-002: Frontend Tests and Build**
- **Workflow**: `.github/workflows/ci.yml` - `frontend-test` job  
- **Test Scenarios**:
  - Node.js environment setup
  - Dependencies installation (npm ci)
  - Linting execution
  - Unit tests (if available)
  - Production build
  - Artifact upload
- **Pass Criteria**:
  - No linting errors
  - Tests pass (if exist)
  - Build successful
  - Artifacts uploaded

**Test Case CD-003: Docker Integration**
- **Workflow**: `.github/workflows/ci.yml` - `docker-build` job
- **Test Scenarios**:
  - Docker images build
  - Container startup
  - Health checks pass
  - Logs show successful start
  - Cleanup successful
- **Pass Criteria**: 
  - Images build successfully
  - Containers start healthy
  - No errors in logs

#### 3.2 Integration Tests

**Test Case CD-INT-001: Workflow Dependencies**
- **Objective**: Verify workflow job dependencies
- **Test Scenarios**:
  - `docker-build` waits for `backend-test` and `frontend-test`
  - `deploy` only runs on main branch
  - Artifacts available for deployment
  - Conditional execution works
- **Pass Criteria**: Proper workflow orchestration

**Test Case CD-INT-002: Environment Configuration**
- **Test Scenarios**:
  - Database service health checks
  - Environment variables properly set
  - Secrets management
  - Cache configuration works
- **Pass Criteria**: Environment configured correctly

#### 3.3 Security Tests

**Test Case CD-SEC-001: Pipeline Security**
- **Objective**: Verify CI/CD pipeline security
- **Test Scenarios**:
  - Dependency scanning
  - Secret detection in code
  - Code signing verification
  - Access controls to deployments
  - Artifact integrity checks
- **Pass Criteria**: No security vulnerabilities

### 4. Unit Tests (Backend)

#### 4.1 Functional Tests

**Test Case UT-001: Model Tests**
- **Files**: `tests/test_models.py`
- **Models to Test**:
  - `Customer` model (customers/models.py)
  - `Membership` model (customers/models.py)  
  - `LoyaltyTransaction` model (customers/models.py)
  - `Order` model with customer link (orders/models.py)
- **Test Scenarios**:
  - Model creation and validation
  - Relationships and foreign keys
  - Model methods and properties
  - Database constraints
- **Pass Criteria**:
  - All model tests pass
  - Coverage > 90%
  - Edge cases handled

**Test Case UT-002: Service Tests**
- **Files**: `tests/test_services.py`
- **Services to Test**:
  - `PaymentService` (orders/services.py)
  - Loyalty points calculation
  - Tier progression logic
  - Transaction management
- **Test Scenarios**:
  - Payment processing (cash, card, promptpay)
  - Points calculation (1 point per 10 THB)
  - Tier progression logic
  - Transaction recording
  - Error handling
- **Pass Criteria**:
  - All service tests pass
  - Mock external dependencies
  - Exception handling tested

**Test Case UT-003: API Tests**
- **Files**: `tests/test_apis.py`
- **APIs to Test**:
  - Payment API (`/api/orders/{id}/pay/`)
  - Customer APIs
  - Admin Dashboard APIs
- **Test Scenarios**:
  - Authentication and authorization
  - Request validation
  - Response format and status codes
  - Error responses
  - API documentation (Swagger)
- **Pass Criteria**:
  - All API tests pass
  - Proper status codes
  - Valid response formats
  - Security enforced

#### 4.2 Integration Tests

**Test Case UT-INT-001: Service Integration**
- **Objective**: Test service interactions
- **Test Scenarios**:
  - Order → Payment → Loyalty Points flow
  - Customer → Membership → Tier progression
  - WebSocket integration
  - Database transaction integrity
- **Pass Criteria**: Complete flow works correctly

**Test Case UT-INT-002: Database Integration**
- **Test Scenarios**:
  - Multi-tenant data isolation
  - Database migrations
  - Connection pooling
  - Query optimization
- **Pass Criteria**: Data integrity maintained

#### 4.3 Performance Tests

**Test Case UT-PERF-001: Test Performance**
- **Objective**: Ensure tests run efficiently
- **Metrics**:
  - All tests execute < 30 seconds
  - No memory leaks
  - Database cleanup after each test
  - Parallel test execution
- **Pass Criteria**: Fast and reliable test suite

---

## 📊 Test Execution Plan

### Test Environment Setup
- **Staging Environment**: Mirror production setup
- **Test Data**: Seed with realistic data volumes
- **Test Accounts**: Super admin, tenant admin, regular user
- **Test Tools**: Postman, JMeter, Lighthouse, pytest

### Test Execution Timeline
```
Day 1: Environment Setup + Test Data Preparation
Day 2: API Testing + Security Testing  
Day 3: UI Testing + Performance Testing
Day 4: CI/CD Testing + Unit Tests
Day 5: Integration Testing + Final Review
```

### Entry Criteria
- Phase 5 features deployed to staging
- Test environment ready
- Test data prepared
- Test scripts and tools configured

### Exit Criteria
- All test cases executed
- Critical bugs resolved
- Performance benchmarks met
- Security issues addressed
- Documentation complete

---

## ✅ Test Checklist

### Pre-Testing Checklist
- [ ] Test environment provisioned
- [ ] Test data loaded
- [ ] Test accounts created
- [ ] Test tools configured
- [ ] Test cases reviewed

### Admin Dashboard APIs Checklist
- [ ] Authentication and authorization working
- [ ] System stats API functional
- [ ] Tenant management API working
- [ ] Revenue analytics API accurate
- [ ] Input validation in place
- [ ] Error handling robust
- [ ] Performance benchmarks met

### Admin Dashboard UI Checklist
- [ ] Dashboard loads correctly
- [ ] All widgets functional
- [ ] Tenant management interface working
- [ ] Analytics charts displaying
- [ ] Navigation intuitive
- [ ] Forms user-friendly
- [ ] Mobile responsive design
- [ ] Real-time updates working

### CI/CD Pipeline Checklist
- [ ] Backend tests passing
- [ ] Frontend build successful
- [ ] Docker images building
- [ ] Workflow dependencies correct
- [ ] Environment configuration working
- [ ] Security scans passing
- [ ] Deployment mechanism working

### Unit Tests Checklist
- [ ] Model tests complete
- [ ] Service tests comprehensive
- [ ] API tests thorough
- [ ] Integration tests covering flows
- [ ] Test coverage > 80%
- [ ] Performance tests passing
- [ ] Security tests included

### Final Checklist
- [ ] All test cases executed
- [ ] Critical bugs resolved
- [ ] Performance benchmarks achieved
- [ ] Security issues addressed
- [ ] Documentation updated
- [ ] Sign-off from Dev team
- [ ] Ready for production deployment

---

## 🐛 Bug Reporting Process

### Bug Severity Levels
1. **Critical**: System crash, data loss, security breach
2. **High**: Major feature broken, significant performance issue
3. **Medium**: Minor feature issue, usability problem
4. **Low**: Cosmetic issue, documentation error

### Bug Template
```
Title: [Component] Brief description

**Environment**: Staging/Production
**Browser/Version**: 
**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Result**: What should happen
**Actual Result**: What actually happened
**Screenshots**: [Attach if applicable]
**Severity**: Critical/High/Medium/Low
**Priority**: Immediate/High/Medium/Low
```

---

## 📈 Success Criteria

### Technical Metrics
- **Test Coverage**: > 80% for critical paths
- **Performance**: API response time < 1000ms
- **Security**: No critical vulnerabilities
- **Reliability**: < 1% error rate under load

### Business Metrics  
- **Admin Efficiency**: Complete tasks < 50% time
- **System Visibility**: Real-time monitoring < 2s delay
- **Deployment Success**: 100% automated deployments
- **Bug Prevention**: < 5% production bugs from new features

### Quality Gates
- ✅ All critical test cases pass
- ✅ No security vulnerabilities
- ✅ Performance benchmarks met  
- ✅ User acceptance testing complete
- ✅ Documentation complete
- ✅ Deployment rollback plan tested

---

## 🚀 Go/No-Go Decision

### Go Criteria
- All test cases pass with green status
- Performance benchmarks achieved
- Security issues resolved
- User acceptance testing successful
- Documentation complete

### No-Go Criteria  
- Critical bugs unresolved
- Performance degradation detected
- Security vulnerabilities present
- Missing essential features
- Incomplete documentation

---

**Prepared by**: Queue Team (QA)
**Reviewed by**: Dev Team (Technical Review)
**Approved by**: Project Owner
**Date**: 2026-02-06

*This test plan will be updated as testing progresses and new requirements emerge.*