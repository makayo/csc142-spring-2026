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
   VISUAL STATE
========================= */

const VisualState = {
    nodes: [],
    slowIndex: 0,
    fastIndex: 0,
    midpoint: null,
    phase: "idle",
    result: null
};

/* =========================
   SYMMETRY CHECK (LOGIC ONLY)
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
   UI RENDER
========================= */

function render() {
    const listView = document.getElementById("listView");
    listView.innerHTML = "";

    VisualState.nodes.forEach((node, i) => {
        const div = document.createElement("div");
        div.className = "node";

        // ✅ FIX 1: only show slow/fast pointers while animation is running
        if (VisualState.phase !== "done" && VisualState.phase !== "midpoint") {
            if (i === VisualState.slowIndex) div.classList.add("slow");
            if (i === VisualState.fastIndex) div.classList.add("fast");
        }

        if (VisualState.phase === "midpoint" && i === VisualState.midpoint) {
            div.classList.add("midpoint");
        }

        // ✅ FIX 1: on done, only highlight the midpoint node
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

    // ✅ FIX 2: show the actual value at the midpoint, not the index
    const midpointValue = values[midpointIndex];

    el.innerHTML = `
    <div><strong>Input:</strong> [${values.join(", ")}]</div>
    <div><strong>Midpoint:</strong> ${midpointValue ?? "N/A"}</div>
    <div><strong>Result:</strong> ${result ? "SYMMETRIC ✔" : "NOT SYMMETRIC ✖"}</div>
    <div><strong>Process:</strong> Slow/fast pointer traversal → midpoint detection → full comparison</div>
  `;
}

/* =========================
   ANIMATION ENGINE
========================= */

function animatePointers() {
    const n = VisualState.nodes.length;

    if (VisualState.fastIndex >= n - 1) {

        // midpoint detected
        VisualState.midpoint = VisualState.slowIndex;
        VisualState.phase = "midpoint";
        render();

        const values = VisualState.nodes.map(n => n.value);

        VisualState.result = isSymmetricFromArray(values);

        VisualState.phase = "done";
        render();
        renderEvaluation(values, VisualState.result, VisualState.midpoint);

        return;
    }

    VisualState.slowIndex += 1;
    VisualState.fastIndex += 2;

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

    // reset state
    VisualState.nodes = values.map(v => ({ value: v }));
    VisualState.slowIndex = 0;
    VisualState.fastIndex = 0;
    VisualState.midpoint = null;
    VisualState.phase = "moving";
    VisualState.result = null;

    render();
    animatePointers();
}

/* =========================
   INITIAL RENDER
========================= */

render();