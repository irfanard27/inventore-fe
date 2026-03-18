# Transaction Features Documentation

## Overview
The transaction management system provides comprehensive functionality for tracking inventory movements including IN, OUT, and TRANSFER operations.

## Features Implemented

### 1. Transaction Management
- **Create Transactions**: Add new inventory movements
- **View Transactions**: List all transactions with filtering and search
- **Edit Transactions**: Modify existing transactions (when editable)
- **Delete Transactions**: Remove transactions from the system
- **Complete Transactions**: Mark pending transactions as completed
- **Reject Transactions**: Reject transactions with reasons

### 2. Transaction Types
- **IN**: Stock entering the warehouse
- **OUT**: Stock leaving the warehouse  
- **TRANSFER**: Stock moving between warehouses

### 3. Transaction Statuses
- **PENDING**: Awaiting processing
- **COMPLETED**: Successfully processed
- **REJECTED**: Declined with reason
- **CANCELLED**: Cancelled by user

## File Structure

```
src/
├── interface/
│   └── transaction.ts                 # Transaction type definitions
├── redux/
│   ├── api-service/
│   │   └── transaction-service.ts     # RTK Query API service
│   └── slices/
│       └── transaction-slice.ts       # Redux state management
└── pages/transactions/
    ├── index.tsx                      # Main transaction page
    └── components/
        ├── transaction-table.tsx       # Transaction data table
        └── transaction-form.tsx        # Transaction create/edit form
```

## API Endpoints

The transaction service integrates with the following API endpoints:

- `GET /api/transactions/` - List transactions with filters
- `GET /api/transactions/{id}/` - Get single transaction
- `POST /api/transactions/create/` - Create new transaction
- `PUT /api/transactions/{id}/update/` - Update transaction
- `DELETE /api/transactions/{id}/delete/` - Delete transaction
- `POST /api/transactions/{id}/complete/` - Complete transaction
- `POST /api/transactions/{id}/reject/` - Reject transaction

## Component Usage

### Transaction Table
```tsx
import TransactionTable from '@/pages/transactions/components/transaction-table';

<TransactionTable onEdit={(id) => console.log('Edit transaction:', id)} />
```

### Transaction Form
```tsx
import TransactionForm, { type TransactionFormRef } from '@/pages/transactions/components/transaction-form';

const formRef = useRef<TransactionFormRef>(null);

// Open form for new transaction
formRef.current?.open();

// Open form for editing
formRef.current?.open('transaction-id');
```

## State Management

The transaction system uses Redux Toolkit with the following state structure:

```typescript
interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  filters: {
    search: string;
    transaction_type: string;
    status: string;
    inventory: string;
    warehouse: string;
    start_date: string;
    end_date: string;
    page: number;
  };
}
```

## Filtering and Search

The transaction table supports:
- **Search**: By inventory name, SKU, or notes
- **Transaction Type**: Filter by IN, OUT, TRANSFER
- **Status**: Filter by PENDING, COMPLETED, REJECTED, CANCELLED
- **Date Range**: Filter by transaction date (future enhancement)

## Permissions and Actions

Transaction actions are controlled by:
- `is_editable`: Determines if transaction can be edited/rejected
- `can_be_completed`: Determines if transaction can be completed

## Integration Notes

The transaction system integrates with:
- **Inventory Service**: For inventory selection and validation
- **Warehouse Service**: For warehouse selection
- **Authentication**: User permissions and audit trail

## Future Enhancements

Potential improvements:
1. Date range filtering
2. Bulk transaction operations
3. Transaction reporting and analytics
4. Transaction approval workflows
5. Inventory impact preview
6. Transaction history tracking
7. Export functionality (CSV, PDF)
8. Real-time transaction updates

## Error Handling

The system includes comprehensive error handling:
- API error messages are displayed to users
- Loading states prevent duplicate actions
- Form validation ensures data integrity
- Optimistic updates improve user experience

## Performance Considerations

- RTK Query provides intelligent caching
- Pagination prevents loading large datasets
- Debounced search reduces API calls
- Lazy loading of inventory/warehouse data
