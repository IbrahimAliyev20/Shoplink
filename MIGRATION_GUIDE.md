# 🔄 Migration Guide - Using New Components & Patterns

This guide shows you how to migrate existing code to use the new reusable components and patterns.

---

## 1. Replace Loading States

### ❌ Old Pattern
```typescript
if (isLoading) {
  return <div>Yüklənir...</div>;
}
```

### ✅ New Pattern
```typescript
import { LoadingState } from '@/components/shared/LoadingState';

if (isLoading) {
  return <LoadingState message="Məlumatlar yüklənir..." />;
}

// For table loading
<SkeletonTable rows={5} columns={4} />

// For card loading
<SkeletonCard count={3} />
```

---

## 2. Replace Error States

### ❌ Old Pattern
```typescript
if (isError) {
  return <div>Xəta baş verdi</div>;
}
```

### ✅ New Pattern
```typescript
import { ErrorState } from '@/components/shared/ErrorState';

if (isError) {
  return (
    <ErrorState 
      title="Xəta baş verdi"
      message={error?.message || "Məlumatları yükləyərkən xəta baş verdi"}
      onRetry={() => queryClient.invalidateQueries({ queryKey: ['your-key'] })}
    />
  );
}
```

---

## 3. Replace Inline SVG Icons

### ❌ Old Pattern
```typescript
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
```

### ✅ New Pattern
```typescript
import { UserIcon } from '@/components/ui/icons';

<UserIcon className="w-5 h-5" />
```

**Available Icons:**
- `UserIcon` - User profile
- `PackageIcon` - Orders/packages
- `LocationIcon` - Addresses
- `ShieldIcon` - Security
- `InfoIcon` - Information
- `LogoutIconSvg` - Logout
- `WarningIcon` - Warnings/alerts
- `ArrowRightIcon` - Navigation

---

## 4. Use Floating Field for Forms

### ❌ Old Pattern
```typescript
<div className="relative">
  <Input id="email" placeholder=" " {...register('email')} />
  <Label htmlFor="email" className="absolute left-3 -top-2.5 bg-white px-2 text-xs">
    Email
  </Label>
  {errors.email && <p className="text-red-600">{errors.email.message}</p>}
</div>
```

### ✅ New Pattern
```typescript
import { FloatingField } from '@/components/ui/floating-field';

<FloatingField 
  id="email" 
  label="Email" 
  error={errors.email?.message}
  required
>
  <Input id="email" placeholder=" " {...register('email')} className="peer" />
</FloatingField>
```

---

## 5. Use Image Constants

### ❌ Old Pattern
```typescript
<Image src="/images/Logo.svg" alt="Logo" width={100} height={40} />
<Image src="/images/team1.png" alt="Team member" width={32} height={32} />
```

### ✅ New Pattern
```typescript
import { STATIC_IMAGES } from '@/lib/constants/images';

<Image 
  src={STATIC_IMAGES.logo} 
  alt="Shoplink Logo" 
  width={100} 
  height={40} 
/>

<Image 
  src={STATIC_IMAGES.team.team1} 
  alt="Team member 1" 
  width={32} 
  height={32} 
/>
```

---

## 6. Standardize Query Keys

### ❌ Old Pattern
```typescript
// Inconsistent naming
queryKey: ['category']  // singular
queryKey: ['product']   // singular
queryKey: ['user']      // flat

// Direct invalidation
queryClient.invalidateQueries({ queryKey: ['category'] });
```

### ✅ New Pattern
```typescript
// In queries file
export const categoryQueries = {
  all: () => queryOptions({
    queryKey: ['categories'],  // plural
    queryFn: getCategories,
  }),
  show: (id: number) => queryOptions({
    queryKey: ['categories', id],  // hierarchical
    queryFn: () => getCategory(id),
  }),
};

// Usage in components
const { data } = useQuery(categoryQueries.all());
const { data: category } = useQuery(categoryQueries.show(id));

// Invalidation
queryClient.invalidateQueries({ queryKey: ['categories'] });
```

---

## 7. Add Optimistic Updates to Mutations

### ❌ Old Pattern
```typescript
const { mutate: deleteItem } = useMutation({
  mutationFn: (id) => deleteItem(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
    toast.success('Item deleted');
  },
});
```

### ✅ New Pattern
```typescript
const { mutate: deleteItem } = useMutation({
  mutationFn: (id) => deleteItem(id),
  
  onMutate: async (id) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['items'] });
    
    // Snapshot previous value
    const previousItems = queryClient.getQueryData(['items']);
    
    // Optimistically update
    queryClient.setQueryData(['items'], (old) =>
      old.filter((item) => item.id !== id)
    );
    
    return { previousItems };
  },
  
  onError: (err, id, context) => {
    // Rollback on error
    queryClient.setQueryData(['items'], context.previousItems);
    toast.error('Failed to delete item');
  },
  
  onSuccess: () => {
    toast.success('Item deleted successfully');
  },
  
  onSettled: () => {
    // Always refetch to ensure sync
    queryClient.invalidateQueries({ queryKey: ['items'] });
  },
});
```

---

## 8. Improve Image Alt Text

### ❌ Old Pattern
```typescript
<Image src={product.image} alt={product.name} width={300} height={300} />
```

### ✅ New Pattern
```typescript
<Image 
  src={product.thumb_image}
  alt={`${product.name} - ${product.detail.sales_price} AZN məhsul şəkli`}
  width={400}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  loading="lazy"
  quality={85}
  priority={isAboveFold}
/>
```

**Alt Text Best Practices:**
- Be descriptive and specific
- Include price or important details
- Use Azerbaijani language
- Don't start with "image of" or "picture of"

---

## 9. Use Logger Instead of Console.log

### ❌ Old Pattern
```typescript
console.log('User data:', userData);
console.error('Error:', error);
```

### ✅ New Pattern
```typescript
import { logger } from '@/lib/logger';

logger.debug('User data loaded:', userData);
logger.error('Failed to fetch user:', error);
logger.warn('API deprecated:', { endpoint });
```

**Benefits:**
- Automatically disabled in production
- Structured logging with timestamps
- No sensitive data leaks

---

## 10. Proper Error Handling in useQuery

### ❌ Old Pattern
```typescript
const { data } = useQuery({ queryKey: ['items'], queryFn: getItems });

// No loading or error states!
return <div>{data?.map(...)}</div>
```

### ✅ New Pattern
```typescript
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['items'],
  queryFn: getItems,
});

if (isLoading) return <LoadingState message="Məhsullar yüklənir..." />;
if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
if (!data?.length) return <EmptyState title="Məhsul tapılmadı" />;

return <div>{data.map(...)}</div>
```

---

## Quick Reference

### Import Paths
```typescript
// Components
import { LoadingState, SkeletonTable, SkeletonCard } from '@/components/shared/LoadingState';
import { ErrorState, EmptyState } from '@/components/shared/ErrorState';
import { FloatingField } from '@/components/ui/floating-field';
import { UserIcon, PackageIcon, LocationIcon } from '@/components/ui/icons';

// Constants
import { STATIC_IMAGES } from '@/lib/constants/images';

// Utilities
import { logger } from '@/lib/logger';

// Queries (use factory pattern)
import { userQueries } from '@/services/auth/queries';
import { productQueries } from '@/services/Seller-services/product/queries';
import { categoryQueries } from '@/services/Seller-services/category/queries';
```

---

## Checklist for New Components

When creating a new component that fetches data:

- [ ] Import and use `LoadingState` for loading
- [ ] Import and use `ErrorState` for errors
- [ ] Use standardized query keys (plural, hierarchical)
- [ ] Add proper TypeScript types
- [ ] Use reusable UI components where possible
- [ ] Add descriptive alt text to images
- [ ] Use image constants for static images
- [ ] Implement optimistic updates for mutations
- [ ] Use logger instead of console.log
- [ ] Add proper error handling

---

## Need Help?

Refer to:
- `IMPROVEMENTS_SUMMARY.md` - Full list of improvements
- Component source files for implementation details
- Existing updated components for examples

Happy coding! 🚀

