# Minimal E-Commerce Order Processing System

## Overview

A simple singly linked list that stores and reverses e-commerce orders.

## Order Examples

- Order(1, "John", "tshirt")
- Order(2, "Mary", "pants")
- Order(3, "Alex", "shoes")

## Features

- append(order)
- display()
- reverse()

## How to Run Tests

```code
python3 test_orders.py
```

## Diagram

Before:
1 → 2 → 3 → None

After reverse:
3 → 2 → 1 → None

✅ diagrams/reverse_flowchart.txt
Code
START
curr = head
prev = None

LOOP:
nxt = curr.next
curr.next = prev
prev = curr
curr = nxt

END LOOP

head = prev
