class Order:
    def __init__(self, order_id, customer_name, order_details):
        self.order_id = order_id
        self.customer_name = customer_name
        self.order_details = order_details

    def __repr__(self):
        return f"Order({self.order_id}, {self.customer_name}, {self.order_details})"


class Node:
    def __init__(self, order):
        self.order = order
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, order):
        new_node = Node(order)
        if not self.head:
            self.head = new_node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = new_node

    def display(self):
        cur = self.head
        out = []
        while cur:
            out.append(str(cur.order))
            cur = cur.next
        print(" -> ".join(out))

    def reverse(self):
        prev = None
        cur = self.head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        self.head = prev

if __name__ == "__main__":
    ll = SinglyLinkedList()
    ll.append(Order(1, "John", "tshirt"))
    ll.append(Order(2, "Mary", "pants"))
    ll.append(Order(3, "Alex", "shoes"))

    print("Before reverse:")
    ll.display()

    ll.reverse()

    print("After reverse:")
    ll.display()
