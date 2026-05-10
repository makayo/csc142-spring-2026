/* =========================
   DATA STRUCTURES
========================= */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = node;
            return;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = node;
    }
}

/* =========================
   ALGORITHM MODE
   Tracks which function is active
========================= */

let activeAlgo = "original"; // "original" or "optimized"

function setAlgo(mode) {
    activeAlgo = mode;

    document.getElementById("btn-original").classList.toggle("active", mode === "original");
    document.getElementById("btn-optimized").classList.toggle("active", mode === "optimized");

    // clear previous result when switching
    document.getElementById("evaluation").innerHTML = "";
    document.getElementById("listView").innerHTML = "";

    VisualState.phase = "idle";
    VisualState.result = null;
    VisualState.steps = [];
}

/* =========================
   VISUAL STATE
========================= */

const VisualState = {
    nodes: [],
    slowIndex: 0,
    fastIndex: 0,
    midpoint: null,
    phase: "idle",
    result: null,
    steps: []
};

/* =========================
   ORIGINAL SOLUTION
   Time:  O(n)
   Space: O(n) — values copied into array
========================= */

function isSymmetricFromArray(arr) {
    let l = 0;
    let r = arr.length - 1;

    while (l < r) {
        if (arr[l] !== arr[r]) return false;
        l++;
        r--;
    }

    return true;
}

/* =========================
   OPTIMIZED SOLUTION
   Time:  O(n)
   Space: O(1) — no extra array, in-place reversal
========================= */

function isSymmetricOptimized(head) {
    if (!head || !head.next) return true;

    // Step 1: find midpoint with slow/fast pointer
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: reverse the second half in place
    let prev = null;
    let curr = slow;

    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: compare first half vs reversed second half
    let left = head;
    let right = prev;

    while (right) {
        if (left.value !== right.value) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}

/* =========================
   BUILD LINKED LIST
   Used by optimized mode
========================= */

function buildLinkedList(values) {
    const list = new LinkedList();
    values.forEach(v => list.append(v));
    return list.head;
}

/* =========================
   UI RENDER
========================= */

function render() {
    const listView = document.getElementById("listView");
    listView.innerHTML = "";

    VisualState.nodes.forEach((node, i) => {
        const div = document.createElement("div");
        div.className = "node";

        if (VisualState.phase !== "done" && VisualState.phase !== "midpoint") {
            if (i === VisualState.slowIndex) div.classList.add("slow");
            if (i === VisualState.fastIndex) div.classList.add("fast");
        }

        if (VisualState.phase === "midpoint" && i === VisualState.midpoint) {
            div.classList.add("midpoint");
        }

        if (VisualState.phase === "done" && i === VisualState.midpoint) {
            div.classList.add("midpoint");
        }

        div.textContent = node.value;
        listView.appendChild(div);
    });
}

/* =========================
   EVALUATION PANEL
========================= */

function renderEvaluation(values, result, midpointIndex) {
    const el = document.getElementById("evaluation");
    const midpointValue = values[midpointIndex];

    const isOptimized = activeAlgo === "optimized";

    const complexityLabel = isOptimized
        ? `<span class="badge optimized">O(n) time &nbsp;·&nbsp; O(1) space &nbsp;·&nbsp; in-place reversal — no extra array</span>`
        : `<span class="badge original">O(n) time &nbsp;·&nbsp; O(n) space &nbsp;·&nbsp; array copy used for comparison</span>`;

    const stepLog = VisualState.steps.map((s, i) =>
        `Step ${i + 1}: slow → [${s.slowVal}]  fast → [${s.fastVal}]`
    ).join("<br>");

    el.innerHTML = `
        <div><strong>Algorithm:</strong> ${isOptimized ? "Optimized — O(1) space" : "Original — O(n) space"}</div>
        <div><strong>Input:</strong> [${values.join(", ")}]</div>
        <div><strong>Midpoint:</strong> ${midpointValue ?? "N/A"}</div>
        <div><strong>Result:</strong> ${result ? "SYMMETRIC ✔" : "NOT SYMMETRIC ✖"}</div>
        <div style="margin-top:8px"><strong>Process:</strong><br>${stepLog}<br>
        → Midpoint detected: [${midpointValue}]<br>
        → Full comparison: ${result ? "all pairs matched ✔" : "mismatch found ✖"}</div>
        <div style="margin-top:10px">${complexityLabel}</div>
    `;
}

/* =========================
   ANIMATION ENGINE
========================= */

function animatePointers() {
    const n = VisualState.nodes.length;

    if (VisualState.fastIndex >= n - 1) {

        VisualState.midpoint = VisualState.slowIndex;
        VisualState.phase = "midpoint";
        render();

        const values = VisualState.nodes.map(n => n.value);

        // run whichever algorithm is active
        if (activeAlgo === "optimized") {
            const head = buildLinkedList(values);
            VisualState.result = isSymmetricOptimized(head);
        } else {
            VisualState.result = isSymmetricFromArray(values);
        }

        VisualState.phase = "done";
        render();
        renderEvaluation(values, VisualState.result, VisualState.midpoint);

        return;
    }

    VisualState.slowIndex += 1;
    VisualState.fastIndex += 2;

    VisualState.steps.push({
        slowVal: VisualState.nodes[VisualState.slowIndex].value,
        fastVal: VisualState.nodes[Math.min(VisualState.fastIndex, n - 1)].value
    });

    render();
    setTimeout(animatePointers, 600);
}

/* =========================
   ENTRY POINT
========================= */

function runCheck() {
    const input = document.getElementById("input").value;

    const values = input
        .split(",")
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v));

    if (!values.length) return;

    VisualState.nodes = values.map(v => ({ value: v }));
    VisualState.slowIndex = 0;
    VisualState.fastIndex = 0;
    VisualState.midpoint = null;
    VisualState.phase = "moving";
    VisualState.result = null;
    VisualState.steps = [];

    render();
    animatePointers();
}

/* =========================
   INITIAL RENDER
========================= */

render();