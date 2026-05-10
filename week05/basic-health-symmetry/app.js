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
    result: null,
    steps: []   // ✅ tracks each real step
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

    // ✅ build the real step-by-step process log
    const stepLog = VisualState.steps.map((s, i) =>
        `Step ${i + 1}: slow → [${s.slowVal}]  fast → [${s.fastVal}]`
    ).join("<br>");

    el.innerHTML = `
        <div><strong>Input:</strong> [${values.join(", ")}]</div>
        <div><strong>Midpoint:</strong> ${midpointValue ?? "N/A"}</div>
        <div><strong>Result:</strong> ${result ? "SYMMETRIC ✔" : "NOT SYMMETRIC ✖"}</div>
        <div style="margin-top:8px"><strong>Process:</strong><br>${stepLog}<br>→ Midpoint detected: [${midpointValue}]<br>→ Full comparison: ${result ? "all pairs matched ✔" : "mismatch found ✖"}</div>
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

    // ✅ record this step with actual values
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

    // reset state
    VisualState.nodes = values.map(v => ({ value: v }));
    VisualState.slowIndex = 0;
    VisualState.fastIndex = 0;
    VisualState.midpoint = null;
    VisualState.phase = "moving";
    VisualState.result = null;
    VisualState.steps = [];   // ✅ reset steps on each run

    render();
    animatePointers();
}

/* =========================
   INITIAL RENDER
========================= */

render();