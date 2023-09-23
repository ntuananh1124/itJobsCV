export default function CheckChangeField(state = false, action) {
    switch (action.type) {
        case "CHECK_CHANGED_FIELD":
            return action.status
        default:
            return state
    }
}