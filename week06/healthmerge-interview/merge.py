# HealthMerge Inc. — Patient Record Merger
# Author: Mark Yosinao

class Patient:
    def __init__(self, ssn, name, age):
        self.ssn = ssn
        self.name = name
        self.age = age
        self.next = None

def print_list(head):
    while head:
        print(f"  SSN: {head.ssn} | {head.name} | Age: {head.age}")
        head = head.next

def build_lists():
    # HealthMerge patients
    a = Patient(101, "Alice Johnson", 34)
    a.next = Patient(203, "Bob Smith", 45)
    a.next.next = Patient(305, "Carol White", 29)

    # CarePlus patients
    b = Patient(102, "Eve Davis", 38)
    b.next = Patient(203, "Bob Smith", 45)  # duplicate
    b.next.next = Patient(410, "Frank Miller", 61)

    return a, b


# ============================================================
# SOLUTION 1 — BASIC MERGE
# Creates NEW nodes for every record
# Time:  O(n+m)
# Space: O(n+m) — new node created for each record
# ============================================================
def merge_basic(l1, l2):
    dummy = Patient(0, "", 0)
    curr = dummy

    while l1 and l2:
        if l1.ssn <= l2.ssn:
            curr.next = Patient(l1.ssn, l1.name, l1.age)
            l1 = l1.next
        else:
            curr.next = Patient(l2.ssn, l2.name, l2.age)
            l2 = l2.next
        curr = curr.next

    remaining = l1 or l2
    while remaining:
        curr.next = Patient(remaining.ssn, remaining.name, remaining.age)
        curr = curr.next
        remaining = remaining.next

    return dummy.next


# ============================================================
# SOLUTION 2 — OPTIMIZED IN-PLACE MERGE
# Relinks EXISTING nodes — no new memory allocated
# Time:  O(n+m)
# Space: O(1)
# Trade-off: modifies the original lists
# ============================================================
def merge_optimized(l1, l2):
    dummy = Patient(0, "", 0)
    curr = dummy

    while l1 and l2:
        if l1.ssn <= l2.ssn:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next

    curr.next = l1 or l2
    return dummy.next


# ============================================================
# MAIN
# ============================================================
a, b = build_lists()

print("=" * 50)
print("  INPUT DATA")
print("=" * 50)
print("\nHealthMerge Records:")
print_list(a)
print("\nCarePlus Records:")
print_list(b)

# Solution 1
a, b = build_lists()
print("\n" + "=" * 50)
print("  SOLUTION 1 — BASIC MERGE")
print("  Time: O(n+m) | Space: O(n+m)")
print("=" * 50)
print_list(merge_basic(a, b))

# Solution 2
a, b = build_lists()
print("\n" + "=" * 50)
print("  SOLUTION 2 — OPTIMIZED IN-PLACE MERGE")
print("  Time: O(n+m) | Space: O(1)")
print("=" * 50)
print_list(merge_optimized(a, b))

print("\n" + "=" * 50)
print("  COMPLEXITY ANALYSIS & TRADE-OFF")
print("=" * 50)
print("  BASIC MERGE:")
print("    Time:  O(n+m) — visits every node once")
print("    Space: O(n+m) — creates new node for each record")
print("    Pro:   Original lists preserved")
print("    Con:   Doubles memory — bad for large datasets")
print()
print("  OPTIMIZED IN-PLACE MERGE:")
print("    Time:  O(n+m) — visits every node once")
print("    Space: O(1)   — relinks existing nodes, no new memory")
print("    Pro:   Memory efficient — ideal for hospital scale")
print("    Con:   Modifies original lists (destructive)")
print()
print("  CONCLUSION:")
print("    Both solutions have the same time complexity.")
print("    Optimized wins on space — O(1) vs O(n+m).")
print("    For HealthMerge with millions of records,")
print("    O(1) space is the better production choice.")
print("=" * 50)