```
===============================
ORDER CLASS
===============================
Stores:

- order_id
- customer_name
- order_details

Purpose:
Represents a single e-commerce order.

           |
           v

===============================
NODE CLASS
===============================
Contains:

- order (Order object)
- next (pointer to next node)

Purpose:
Basic building block of the linked list.

           |
           v

===============================
SINGLY LINKED LIST
===============================
Contains:

- head (first node)

Supports:

- append(order)
- display()
- reverse()

           |
           v

===============================
APPEND FLOW
===============================
If list is empty:
head = new node
Else:
walk to end
attach new node

Result:
Order added to end of list.

           |
           v

===============================
REVERSAL FUNCTIONALITY
===============================
Uses three pointers:

- prev
- curr
- nxt

Loop:

1. Save next node (nxt)
2. Reverse pointer (curr.next = prev)
3. Move prev forward
4. Move curr forward

After loop:
head = prev

Result:
Linked list is reversed.
```
