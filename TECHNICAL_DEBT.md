# Technical Debt

This document tracks known technical debt items that should be addressed in future development.

## High Priority

### 1. Migrate from deprecated ipfs-http-client to Helia

**Status**: Not started  
**Severity**: High (security vulnerabilities)  
**Effort**: Medium-Large (breaking change)

**Description**:
The `ipfs-http-client` package is deprecated and has known security vulnerabilities:
- nanoid: CVE-2024-XXXXX (Predictable results with non-integer values) - Moderate severity
- parse-duration: CVE-2024-XXXXX (ReDoS vulnerability) - High severity

**Recommended Action**:
Migrate to [Helia](https://github.com/ipfs/helia), the official replacement for js-IPFS.

**Affected Files**:
- `src/services/ipfsService.ts`
- `ipfs-backend/backend.js`
- `ipfs-backend/server.js`
- `package.json`

**Dependencies to Replace**:
- `ipfs-http-client@60.0.1` → `helia@latest` + related packages

**References**:
- Migration guide: https://github.com/ipfs/js-ipfs/issues/4336
- Helia documentation: https://helia.io/

---

## Medium Priority

### 2. Consider removing unused shadcn/ui components

**Status**: Not started  
**Severity**: Low (bundle size optimization)  
**Effort**: Small

**Description**:
Many shadcn/ui components are imported but may not all be used. A detailed audit could reduce bundle size.

**Current bundle size**: 2,620 kB (656 kB gzipped)

---

## Low Priority

### 3. React Fast Refresh warnings in UI components

**Status**: Known issue  
**Severity**: Low (development experience)  
**Effort**: Small

**Description**:
Several shadcn/ui components export utility functions alongside components, triggering fast-refresh warnings:
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/sidebar.tsx`
- `src/components/ui/toggle.tsx`

These are safe to ignore but could be addressed by extracting utilities to separate files.

---

## Completed

### ✅ Remove experimental Python directories from repository
- Removed 13,652+ Python venv files from git tracking
- Added proper .gitignore rules to prevent future issues

### ✅ Fix TypeScript any types
- Fixed 30+ instances of `any` type usage
- Replaced with proper types (unknown, EvidenceItem, UserData, etc.)

### ✅ Fix React hooks violations
- Fixed setState in useEffect warnings
- Fixed Math.random in render warnings

### ✅ Remove debug console.log statements
- Removed development console.log statements
- Kept console.error/warn for proper error handling
