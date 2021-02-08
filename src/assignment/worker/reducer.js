const initialState = [
    
];

function add(state, action) {
    state.push({
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        nohp: action.payload.nohp,
        address: action.payload.address,
        bio: action.payload.bio,
        photo: action.payload.photo})
    return state;
};

function loadWorkers(state, action) {
    state = action.payload;
    return state;
};
  
module.exports = {
    initialState,
    add,
    loadWorkers,
};