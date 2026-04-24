import { Immer, produce } from "immer";
// import { produce } from "immer";

const baseState = { count: 0};
const nextState = produce(baseState, draftState => {
    draftState.count += 1;

});
    
console.log(baseState.count);
