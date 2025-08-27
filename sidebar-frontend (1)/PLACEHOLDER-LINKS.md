# Placeholder Links - Development Notes

This document tracks all placeholder/non-functional external links in the application that need to be replaced with real functionality.

## 🚨 Important: Non-Functional Links

### Document Upload Categories
**Location:** `components/sections/DocumentsContent.tsx`

All document category links are placeholders:
- `https://example.com/rechnungen-upload`
- `https://example.com/belege-upload`
- `https://example.com/vertraege-upload`
- `https://example.com/personal-upload`
- `https://example.com/steuer-upload`
- `https://example.com/bank-upload`

**Status:** ❌ Non-functional
**Action Required:** Replace with actual document upload service URLs

### DATEV Application Links
**Location:** `lib/constants.ts`

All DATEV URLs are placeholders:
- `https://www.datev.de/einkommensteuer`
- `https://www.datev.de/koerperschaftsteuer`
- `https://www.datev.de/gewerbesteuer`
- `https://www.datev.de/kapitalertragsteuer`
- `https://www.datev.de/abgeltungsteuer`
- `https://www.datev.de/umsatzsteuer-q1`
- `https://www.datev.de/umsatzsteuer-jahr`
- `https://www.datev.de/lohnsteuer-jan`
- `https://www.datev.de/lohnsteuer-bescheinigung`

**Status:** ❌ Non-functional
**Action Required:** Replace with actual DATEV application URLs or implement proper integration

### Google Drive Link
**Location:** `lib/constants.ts`

Current link: `https://drive.google.com/`

**Status:** ⚠️ Partially functional (opens Google Drive but not specific folder)
**Action Required:** Implement direct folder upload integration without login requirement

## Development Recommendations

### Short-term Solutions
1. **Disable links** - Make them non-clickable with visual indicators they're coming soon
2. **Add tooltips** - Show "Coming soon" messages on hover
3. **Mock functionality** - Create local mock uploads for development testing

### Long-term Solutions
1. **Document Upload Service** - Integrate with actual file storage service (AWS S3, Google Cloud Storage)
2. **DATEV Integration** - Implement proper DATEV API integration
3. **Google Drive API** - Set up proper Google Drive folder integration with service account

## Code Changes Needed

### Make Links Visually Disabled
```typescript
// Example for DocumentsContent.tsx
<a
  href={category.url}
  onClick={(e) => {
    e.preventDefault()
    toast({
      title: "Feature kommt bald",
      description: "Diese Funktion wird in einer zukünftigen Version verfügbar sein."
    })
  }}
  className="opacity-50 cursor-not-allowed"
>
```

### Environment-Based Link Management
```typescript
// lib/config.ts
export const LINKS = {
  DOCUMENT_UPLOAD_BASE: process.env.NEXT_PUBLIC_DOCUMENT_UPLOAD_URL || 'https://example.com',
  DATEV_BASE: process.env.NEXT_PUBLIC_DATEV_URL || 'https://datev.de',
  GOOGLE_DRIVE_FOLDER: process.env.NEXT_PUBLIC_GDRIVE_FOLDER || 'https://drive.google.com'
}
```

## Testing Notes
- All external links should be tested in a staging environment before production
- Consider implementing link validation tests
- Add user feedback for broken/unavailable services

Last updated: 2025-01-08