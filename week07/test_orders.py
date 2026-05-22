import unittest
from orders import Order, SinglyLinkedList

class TestOrders(unittest.TestCase):

    # -------- NORMAL CASES --------
    def test_append_three_orders(self):
        ll = SinglyLinkedList()
        ll.append(Order(1,"John","tshirt"))
        ll.append(Order(2,"Mary","pants"))
        ll.append(Order(3,"Alex","shoes"))
        self.assertEqual(ll.head.order.order_id, 1)
        self.assertEqual(ll.head.next.order.order_id, 2)

    def test_reverse_three_orders(self):
        ll = SinglyLinkedList()
        ll.append(Order(1,"John","tshirt"))
        ll.append(Order(2,"Mary","pants"))
        ll.append(Order(3,"Alex","shoes"))
        ll.reverse()
        self.assertEqual(ll.head.order.order_id, 3)

    def test_reverse_twice_returns_original(self):
        ll = SinglyLinkedList()
        ll.append(Order(1,"John","tshirt"))
        ll.append(Order(2,"Mary","pants"))
        ll.reverse()
        ll.reverse()
        self.assertEqual(ll.head.order.order_id, 1)

    # -------- EDGE CASES --------
    def test_reverse_empty_list(self):
        ll = SinglyLinkedList()
        ll.reverse()
        self.assertIsNone(ll.head)

    def test_reverse_single_order(self):
        ll = SinglyLinkedList()
        ll.append(Order(1,"John","tshirt"))
        ll.reverse()
        self.assertEqual(ll.head.order.order_id, 1)

    def test_append_to_empty_list(self):
        ll = SinglyLinkedList()
        ll.append(Order(1,"John","tshirt"))
        self.assertEqual(ll.head.order.order_id, 1)


if __name__ == "__main__":
    unittest.main()
