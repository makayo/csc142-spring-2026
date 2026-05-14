import { Patient } from "./Patient";

export interface ListNode {
  patient: Patient;
  next: ListNode | null;
}
