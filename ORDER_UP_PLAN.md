# OrderUp Project Plan - 12 Hour Sprint

**Project:** OrderUp (Multi-tenant Restaurant System)
**Timeline:** 12 Hours
**Repository:** `kittinan/order-up`
**PM:** Pi (Senior PM)

## 🏗 Architecture Overview

- **Monorepo Structure**:
  - `/backend`: Django (django-tenants, Channels, DRF)
  - `/frontend`: Next.js (Tailwind, Dynamic Theme)
  - `/infra`: Docker, Nginx

## 🕒 Timeline Breakdown (Total: 12 Hours)

### Phase 1: Foundation (Hours 0-2)
**Goal:** Run "Hello World" on Multi-tenant setup.

- [ ] **Infrastructure**: `docker-compose.yml` (Postgres, Redis, Backend, Frontend).
- [ ] **Backend Core**: 
    - Initialize Django project.
    - Install `django-tenants`.
    - Setup `shared_schema` (Client, Domain) and `tenant_schema`.
- [ ] **Frontend Core**:
    - Initialize Next.js.
    - Setup Tailwind CSS.
    - Create TenantContext (middleware to read subdomain).

### Phase 2: Branding & Menu (Hours 2-5)
**Goal:** Tenant can see their own logo and menu.

- [ ] **Backend**:
    - Add Branding fields to Tenant model.
    - Create `Menu`, `Category`, `Item`, `Modifier` models (Tenant-specific).
    - API: Public Menu Endpoint (read-only for customers).
- [ ] **Frontend**:
    - Dynamic Theme Provider (fetch branding config).
    - Menu Page UI.

### Phase 3: QR & Real-time Ordering (Hours 5-8)
**Goal:** Scan QR -> Order -> Kitchen sees it.

- [ ] **Backend**:
    - Setup Django Channels (Redis).
    - WebSocket Consumer for `TableSession`.
    - Order Models (`Order`, `OrderItem`).
- [ ] **Frontend**:
    - QR Code Scanner/Entry (URL params).
    - WebSocket Hook (`useSharedBasket`).
    - Cart UI.

### Phase 4: Loyalty & Payments (Hours 8-10)
**Goal:** Calculate points and take money.

- [ ] **Backend**:
    - `Customer` & `Membership` models.
    - Point calculation logic signal.
    - Payment Gateway Mock/Integration.
- [ ] **Frontend**:
    - Profile Page (Points display).
    - Checkout Flow.

### Phase 5: Admin & Polish (Hours 10-12)
**Goal:** Platform owner view and deployment readiness.

- [ ] **Backend**:
    - Super Admin Dashboard APIs (Aggregated stats).
- [ ] **DevOps**:
    - CI/CD Pipeline (GitHub Actions).
    - Unit Tests (Critical paths).
    - Final Docker check.

## 👥 Team Assignments

- **Backend Team (Nong Back)**: Django Setup, Models, APIs, WebSocket.
- **Frontend Team (Nong Fron)**: Next.js, UI Components, State Management.
- **DevOps Team (P'Deploy)**: Docker, CI/CD, Deployment scripts.
- **QA Team (Nong Queue)**: Writing Tests concurrently.

---
**Status:** 🚀 KICKOFF
